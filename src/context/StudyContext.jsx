// src/context/StudyContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { showToast } from "../components/ui/Toast";
import dbManager from "../utils/indexedDB";

const StudyContext = createContext();

export const useStudy = () => {
    const context = useContext(StudyContext);
    if (!context) throw new Error("useStudy must be used within StudyProvider");
    return context;
};

export const StudyProvider = ({ children }) => {
    const [entries, setEntries] = useState([]);
    const [goals, setGoals] = useState({ weekly: 0, monthly: 0 });
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        subject: "",
        chapter: "",
        dateFrom: "",
        dateTo: "",
        studyType: "",
        environment: "",
    });

    // Load data on mount
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            // Check if migration is needed from localStorage
            if (await dbManager.needsMigration()) {
                console.log(
                    "Migration needed, starting migration from localStorage..."
                );
                try {
                    await dbManager.migrateFromLocalStorage();
                    showToast(
                        "Data migrated successfully from localStorage!",
                        "success"
                    );
                } catch (migrationError) {
                    console.error("Migration failed:", migrationError);
                    showToast(
                        "Failed to migrate data from localStorage",
                        "error"
                    );
                }
            }

            // Load data from IndexedDB
            const [entriesData, goalsData, templatesData] = await Promise.all([
                dbManager.getEntries(),
                dbManager.getGoals(),
                dbManager.getTemplates(),
            ]);

            setEntries(entriesData || []);
            setGoals(goalsData || { weekly: 0, monthly: 0 });
            setTemplates(templatesData || []);

            console.log("Data loaded successfully from IndexedDB");
        } catch (error) {
            console.error("Error loading data from IndexedDB:", error);
            showToast("Failed to load data", "error");
            // Set default values on error
            setEntries([]);
            setGoals({ weekly: 0, monthly: 0 });
            setTemplates([]);
        } finally {
            setLoading(false);
        }
    };

    const saveEntries = async (newEntries) => {
        try {
            // For IndexedDB, we don't need to save all entries at once
            // Individual operations are handled by add/update/delete methods
            setEntries(newEntries);
        } catch (error) {
            showToast("Failed to update entries", "error");
        }
    };

    const addEntry = async (entry) => {
        try {
            // Ensure unique ID by checking existing entries
            let uniqueId = entry.id || Date.now();
            while (entries.some((e) => e.id === uniqueId)) {
                uniqueId = Date.now() + Math.random();
            }

            const newEntry = { ...entry, id: uniqueId };
            await dbManager.addEntry(newEntry);
            const updated = [...entries, newEntry];
            setEntries(updated);
            showToast("Study session added successfully!", "success");
            return newEntry;
        } catch (error) {
            console.error("Error adding entry:", error);
            showToast("Failed to add study session", "error");
            throw error;
        }
    };

    const updateEntry = async (id, updatedEntry) => {
        try {
            const entryToUpdate = { ...updatedEntry, id };
            await dbManager.updateEntry(entryToUpdate);
            const updated = entries.map((e) =>
                e.id === id ? entryToUpdate : e
            );
            setEntries(updated);
            showToast("Study session updated!", "success");
        } catch (error) {
            console.error("Error updating entry:", error);
            showToast("Failed to update study session", "error");
            throw error;
        }
    };

    const deleteEntry = async (id) => {
        try {
            await dbManager.deleteEntry(id);
            const updated = entries.filter((e) => e.id !== id);
            setEntries(updated);
            showToast("Study session deleted", "success");
        } catch (error) {
            console.error("Error deleting entry:", error);
            showToast("Failed to delete study session", "error");
            throw error;
        }
    };

    const bulkDelete = async (ids) => {
        try {
            await dbManager.bulkDeleteEntries(ids);
            const updated = entries.filter((e) => !ids.includes(e.id));
            setEntries(updated);
            showToast(`${ids.length} sessions deleted`, "success");
        } catch (error) {
            console.error("Error bulk deleting entries:", error);
            showToast("Failed to delete study sessions", "error");
            throw error;
        }
    };

    const saveGoals = async (newGoals) => {
        try {
            await dbManager.saveGoals(newGoals);
            setGoals(newGoals);
            showToast("Goals updated!", "success");
        } catch (error) {
            console.error("Error saving goals:", error);
            showToast("Failed to save goals", "error");
            throw error;
        }
    };

    const saveTemplate = async (template) => {
        try {
            // Ensure unique ID by checking existing templates
            let uniqueId = template.id || Date.now();
            while (templates.some((t) => t.id === uniqueId)) {
                uniqueId = Date.now() + Math.random();
            }

            const newTemplate = { ...template, id: uniqueId };
            await dbManager.addTemplate(newTemplate);
            const updated = [...templates, newTemplate];
            setTemplates(updated);
            showToast("Template saved!", "success");
            return newTemplate;
        } catch (error) {
            console.error("Error saving template:", error);
            showToast("Failed to save template", "error");
            throw error;
        }
    };

    const deleteTemplate = async (id) => {
        try {
            await dbManager.deleteTemplate(id);
            const updated = templates.filter((t) => t.id !== id);
            setTemplates(updated);
            showToast("Template deleted", "success");
        } catch (error) {
            console.error("Error deleting template:", error);
            showToast("Failed to delete template", "error");
            throw error;
        }
    };

    const exportData = () => {
        const data = { entries, goals, templates };
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `study-tracker-backup-${
            new Date().toISOString().split("T")[0]
        }.json`;
        a.click();
        showToast("Data exported successfully!", "success");
    };

    const exportCSV = () => {
        const headers = [
            "Date",
            "Subject",
            "Chapter",
            "Topic",
            "Source",
            "Start Time",
            "End Time",
            "Duration",
            "Focus",
            "Mood",
            "Study Type",
            "Environment",
            "Difficulty",
            "Goal Achieved",
            "Notes",
        ];
        const rows = entries.map((e) => [
            e.date,
            e.subject,
            e.chapter,
            e.topic,
            e.source,
            e.startTime,
            e.endTime,
            e.duration,
            e.focus,
            e.mood,
            e.studyType,
            e.environment,
            e.difficulty,
            e.goalAchieved,
            e.notes,
        ]);
        const csv = [headers, ...rows]
            .map((row) => row.map((cell) => `"${cell}"`).join(","))
            .join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `study-tracker-${
            new Date().toISOString().split("T")[0]
        }.csv`;
        a.click();
        showToast("CSV exported successfully!", "success");
    };

    const clearAllData = async () => {
        try {
            await dbManager.clear("entries");
            await dbManager.clear("goals");
            await dbManager.clear("templates");
            setEntries([]);
            setGoals({ weekly: 0, monthly: 0 });
            setTemplates([]);
            showToast("All data cleared", "success");
        } catch (error) {
            console.error("Error clearing data:", error);
            showToast("Failed to clear data", "error");
            throw error;
        }
    };

    const getFilteredEntries = () => {
        return entries.filter((entry) => {
            if (filters.subject && entry.subject !== filters.subject)
                return false;
            if (filters.chapter && entry.chapter !== filters.chapter)
                return false;
            if (filters.dateFrom && entry.date < filters.dateFrom) return false;
            if (filters.dateTo && entry.date > filters.dateTo) return false;
            if (filters.studyType && entry.studyType !== filters.studyType)
                return false;
            if (
                filters.environment &&
                entry.environment !== filters.environment
            )
                return false;
            return true;
        });
    };

    const value = {
        entries,
        goals,
        templates,
        loading,
        filters,
        setFilters,
        addEntry,
        updateEntry,
        deleteEntry,
        bulkDelete,
        saveGoals,
        saveTemplate,
        deleteTemplate,
        exportData,
        exportCSV,
        clearAllData,
        getFilteredEntries,
    };

    return (
        <StudyContext.Provider value={value}>{children}</StudyContext.Provider>
    );
};
