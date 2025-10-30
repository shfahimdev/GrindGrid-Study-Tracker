// src/utils/indexedDB.js
// IndexedDB utility for GrindGrid Study Tracker

const DB_NAME = "GrindGridStudyTracker";
const DB_VERSION = 1;

// Object store names
const STORES = {
    ENTRIES: "entries",
    GOALS: "goals",
    TEMPLATES: "templates",
};

// Fallback in-memory storage for when IndexedDB is not available
class InMemoryStorage {
    constructor() {
        this.data = {
            entries: [],
            goals: { weekly: 0, monthly: 0 },
            templates: [],
        };
    }

    async getEntries() {
        return this.data.entries;
    }
    async addEntry(entry) {
        const newEntry = { ...entry, id: entry.id || Date.now() };
        this.data.entries.push(newEntry);
        return newEntry.id;
    }
    async updateEntry(entry) {
        const index = this.data.entries.findIndex((e) => e.id === entry.id);
        if (index !== -1) {
            this.data.entries[index] = entry;
        }
        return entry.id;
    }
    async deleteEntry(id) {
        this.data.entries = this.data.entries.filter((e) => e.id !== id);
        return id;
    }
    async bulkDeleteEntries(ids) {
        this.data.entries = this.data.entries.filter(
            (e) => !ids.includes(e.id)
        );
        return ids;
    }
    async getGoals() {
        return this.data.goals;
    }
    async saveGoals(goals) {
        this.data.goals = goals;
        return 1;
    }
    async getTemplates() {
        return this.data.templates;
    }
    async addTemplate(template) {
        const newTemplate = { ...template, id: template.id || Date.now() };
        this.data.templates.push(newTemplate);
        return newTemplate.id;
    }
    async updateTemplate(template) {
        const index = this.data.templates.findIndex(
            (t) => t.id === template.id
        );
        if (index !== -1) {
            this.data.templates[index] = template;
        }
        return template.id;
    }
    async deleteTemplate(id) {
        this.data.templates = this.data.templates.filter((t) => t.id !== id);
        return id;
    }
    async clear(storeName) {
        if (storeName === "entries") this.data.entries = [];
        if (storeName === "goals") this.data.goals = { weekly: 0, monthly: 0 };
        if (storeName === "templates") this.data.templates = [];
    }
    async needsMigration() {
        return false;
    }
    async migrateFromLocalStorage() {
        return 0;
    }
    async cleanupLocalStorage() {
        return;
    }
}

class IndexedDBManager {
    constructor() {
        this.db = null;
        this.isInitialized = false;
        this.isIndexedDBAvailable = this.checkIndexedDBSupport();
        this.fallbackStorage = new InMemoryStorage();
    }

    checkIndexedDBSupport() {
        return "indexedDB" in window && indexedDB !== null;
    }

    // Initialize the database
    async init() {
        if (this.isInitialized) return this.db;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => {
                console.error("IndexedDB error:", request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                this.isInitialized = true;
                console.log("IndexedDB initialized successfully");
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Create entries store with indexes
                if (!db.objectStoreNames.contains(STORES.ENTRIES)) {
                    const entriesStore = db.createObjectStore(STORES.ENTRIES, {
                        keyPath: "id",
                        autoIncrement: true,
                    });
                    entriesStore.createIndex("date", "date", { unique: false });
                    entriesStore.createIndex("subject", "subject", {
                        unique: false,
                    });
                    entriesStore.createIndex("studyType", "studyType", {
                        unique: false,
                    });
                }

                // Create goals store
                if (!db.objectStoreNames.contains(STORES.GOALS)) {
                    const goalsStore = db.createObjectStore(STORES.GOALS, {
                        keyPath: "id",
                    });
                    // We'll use id=1 for the single goals object
                }

                // Create templates store with indexes
                if (!db.objectStoreNames.contains(STORES.TEMPLATES)) {
                    const templatesStore = db.createObjectStore(
                        STORES.TEMPLATES,
                        { keyPath: "id", autoIncrement: true }
                    );
                    templatesStore.createIndex("subject", "subject", {
                        unique: false,
                    });
                }
            };
        });
    }

    // Generic method to get all items from a store
    async getAll(storeName) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], "readonly");
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Generic method to get a single item by ID
    async get(storeName, id) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], "readonly");
            const store = transaction.objectStore(storeName);
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Generic method to add an item
    async add(storeName, item) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.add(item);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Generic method to update an item
    async update(storeName, item) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.put(item);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Generic method to delete an item by ID
    async delete(storeName, id) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.delete(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Generic method to clear all items in a store
    async clear(storeName) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.clear();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Specific methods for entries
    async getEntries() {
        if (!this.isIndexedDBAvailable) {
            console.warn("Using fallback storage for getEntries");
            return await this.fallbackStorage.getEntries();
        }

        try {
            await this.init();
            return await this.getAll(STORES.ENTRIES);
        } catch (error) {
            console.error("IndexedDB getEntries failed, falling back:", error);
            this.isIndexedDBAvailable = false;
            return await this.fallbackStorage.getEntries();
        }
    }

    async addEntry(entry) {
        // Ensure the entry has an ID
        const entryWithId = { ...entry, id: entry.id || Date.now() };

        if (!this.isIndexedDBAvailable) {
            console.warn("Using fallback storage for addEntry");
            return await this.fallbackStorage.addEntry(entryWithId);
        }

        try {
            await this.init();
            return await this.add(STORES.ENTRIES, entryWithId);
        } catch (error) {
            console.error("IndexedDB addEntry failed, falling back:", error);
            this.isIndexedDBAvailable = false;
            return await this.fallbackStorage.addEntry(entryWithId);
        }
    }

    async updateEntry(entry) {
        if (!this.isIndexedDBAvailable) {
            console.warn("Using fallback storage for updateEntry");
            return await this.fallbackStorage.updateEntry(entry);
        }

        try {
            await this.init();
            return await this.update(STORES.ENTRIES, entry);
        } catch (error) {
            console.error("IndexedDB updateEntry failed, falling back:", error);
            this.isIndexedDBAvailable = false;
            return await this.fallbackStorage.updateEntry(entry);
        }
    }

    async deleteEntry(id) {
        if (!this.isIndexedDBAvailable) {
            console.warn("Using fallback storage for deleteEntry");
            return await this.fallbackStorage.deleteEntry(id);
        }

        try {
            await this.init();
            return await this.delete(STORES.ENTRIES, id);
        } catch (error) {
            console.error("IndexedDB deleteEntry failed, falling back:", error);
            this.isIndexedDBAvailable = false;
            return await this.fallbackStorage.deleteEntry(id);
        }
    }

    async bulkDeleteEntries(ids) {
        if (!this.isIndexedDBAvailable) {
            console.warn("Using fallback storage for bulkDeleteEntries");
            return await this.fallbackStorage.bulkDeleteEntries(ids);
        }

        try {
            await this.init();
            const transaction = this.db.transaction(
                [STORES.ENTRIES],
                "readwrite"
            );
            const store = transaction.objectStore(STORES.ENTRIES);

            const promises = ids.map(
                (id) =>
                    new Promise((resolve, reject) => {
                        const request = store.delete(id);
                        request.onsuccess = resolve;
                        request.onerror = reject;
                    })
            );

            return Promise.all(promises);
        } catch (error) {
            console.error(
                "IndexedDB bulkDeleteEntries failed, falling back:",
                error
            );
            this.isIndexedDBAvailable = false;
            return await this.fallbackStorage.bulkDeleteEntries(ids);
        }
    }

    // Specific methods for goals
    async getGoals() {
        if (!this.isIndexedDBAvailable) {
            console.warn("Using fallback storage for getGoals");
            return await this.fallbackStorage.getGoals();
        }

        try {
            await this.init();
            const goals = await this.getAll(STORES.GOALS);
            // Return the first goals object or default
            return goals.length > 0 ? goals[0] : { weekly: 0, monthly: 0 };
        } catch (error) {
            console.error("IndexedDB getGoals failed, falling back:", error);
            this.isIndexedDBAvailable = false;
            return await this.fallbackStorage.getGoals();
        }
    }

    async saveGoals(goals) {
        const goalsWithId = { ...goals, id: 1 };

        if (!this.isIndexedDBAvailable) {
            console.warn("Using fallback storage for saveGoals");
            return await this.fallbackStorage.saveGoals(goals);
        }

        try {
            await this.init();
            const existingGoals = await this.getAll(STORES.GOALS);

            if (existingGoals.length > 0) {
                return await this.update(STORES.GOALS, goalsWithId);
            } else {
                return await this.add(STORES.GOALS, goalsWithId);
            }
        } catch (error) {
            console.error("IndexedDB saveGoals failed, falling back:", error);
            this.isIndexedDBAvailable = false;
            return await this.fallbackStorage.saveGoals(goals);
        }
    }

    // Specific methods for templates
    async getTemplates() {
        if (!this.isIndexedDBAvailable) {
            console.warn("Using fallback storage for getTemplates");
            return await this.fallbackStorage.getTemplates();
        }

        try {
            await this.init();
            return await this.getAll(STORES.TEMPLATES);
        } catch (error) {
            console.error(
                "IndexedDB getTemplates failed, falling back:",
                error
            );
            this.isIndexedDBAvailable = false;
            return await this.fallbackStorage.getTemplates();
        }
    }

    async addTemplate(template) {
        const templateWithId = { ...template, id: template.id || Date.now() };

        if (!this.isIndexedDBAvailable) {
            console.warn("Using fallback storage for addTemplate");
            return await this.fallbackStorage.addTemplate(templateWithId);
        }

        try {
            await this.init();
            return await this.add(STORES.TEMPLATES, templateWithId);
        } catch (error) {
            console.error("IndexedDB addTemplate failed, falling back:", error);
            this.isIndexedDBAvailable = false;
            return await this.fallbackStorage.addTemplate(templateWithId);
        }
    }

    async updateTemplate(template) {
        if (!this.isIndexedDBAvailable) {
            console.warn("Using fallback storage for updateTemplate");
            return await this.fallbackStorage.updateTemplate(template);
        }

        try {
            await this.init();
            return await this.update(STORES.TEMPLATES, template);
        } catch (error) {
            console.error(
                "IndexedDB updateTemplate failed, falling back:",
                error
            );
            this.isIndexedDBAvailable = false;
            return await this.fallbackStorage.updateTemplate(template);
        }
    }

    async deleteTemplate(id) {
        if (!this.isIndexedDBAvailable) {
            console.warn("Using fallback storage for deleteTemplate");
            return await this.fallbackStorage.deleteTemplate(id);
        }

        try {
            await this.init();
            return await this.delete(STORES.TEMPLATES, id);
        } catch (error) {
            console.error(
                "IndexedDB deleteTemplate failed, falling back:",
                error
            );
            this.isIndexedDBAvailable = false;
            return await this.fallbackStorage.deleteTemplate(id);
        }
    }

    // Migration methods
    async migrateFromLocalStorage() {
        if (!this.isIndexedDBAvailable) {
            console.warn(
                "IndexedDB not available, migrating to fallback storage"
            );
            return await this.fallbackStorage.migrateFromLocalStorage();
        }

        try {
            console.log("Starting migration from localStorage...");

            // Check for localStorage data
            const localStorageEntries = localStorage.getItem("studyEntries");
            const localStorageGoals = localStorage.getItem("study-goals");
            const localStorageTemplates =
                localStorage.getItem("study-templates");

            let migratedCount = 0;
            let failedCount = 0;

            // Migrate entries
            if (localStorageEntries) {
                try {
                    const entries = JSON.parse(localStorageEntries);
                    if (Array.isArray(entries) && entries.length > 0) {
                        console.log(`Found ${entries.length} entries to migrate`);
                        // Clear existing entries
                        await this.clear(STORES.ENTRIES);
                        
                        // Use update (put) instead of add to handle existing IDs
                        for (let i = 0; i < entries.length; i++) {
                            try {
                                await this.update(STORES.ENTRIES, entries[i]);
                                migratedCount++;
                            } catch (error) {
                                console.error(`Failed to migrate entry ${i + 1}:`, entries[i], error);
                                failedCount++;
                            }
                        }
                        console.log(
                            `Migrated ${migratedCount} entries from localStorage (${failedCount} failed)`
                        );
                    }
                } catch (error) {
                    console.error(
                        "Error migrating entries from localStorage:",
                        error
                    );
                }
            }

            // Migrate goals
            if (localStorageGoals) {
                try {
                    const goals = JSON.parse(localStorageGoals);
                    if (goals && typeof goals === "object") {
                        await this.saveGoals(goals);
                        migratedCount++;
                        console.log("Migrated goals from localStorage");
                    }
                } catch (error) {
                    console.error(
                        "Error migrating goals from localStorage:",
                        error
                    );
                }
            }

            // Migrate templates
            if (localStorageTemplates) {
                try {
                    const templates = JSON.parse(localStorageTemplates);
                    if (Array.isArray(templates) && templates.length > 0) {
                        console.log(`Found ${templates.length} templates to migrate`);
                        // Clear existing templates
                        await this.clear(STORES.TEMPLATES);
                        
                        // Use update (put) instead of add
                        for (let i = 0; i < templates.length; i++) {
                            try {
                                await this.update(STORES.TEMPLATES, templates[i]);
                                migratedCount++;
                            } catch (error) {
                                console.error(`Failed to migrate template ${i + 1}:`, templates[i], error);
                                failedCount++;
                            }
                        }
                        console.log(
                            `Migrated ${templates.length} templates from localStorage (${failedCount} failed)`
                        );
                    }
                } catch (error) {
                    console.error(
                        "Error migrating templates from localStorage:",
                        error
                    );
                }
            }

            console.log(
                `Migration completed. ${migratedCount} items migrated, ${failedCount} failed.`
            );
            return migratedCount;
        } catch (error) {
            console.error("Migration failed:", error);
            throw error;
        }
    }

    // Check if migration is needed
    async needsMigration() {
        try {
            // Check if IndexedDB has data
            const entries = await this.getEntries();
            const goals = await this.getGoals();
            const templates = await this.getTemplates();

            const hasIndexedDBData =
                entries.length > 0 ||
                goals.weekly > 0 ||
                goals.monthly > 0 ||
                templates.length > 0;

            // Check if localStorage has data
            const hasLocalStorageData =
                localStorage.getItem("studyEntries") ||
                localStorage.getItem("study-goals") ||
                localStorage.getItem("study-templates");

            // Migration is needed if localStorage has data but IndexedDB doesn't
            return hasLocalStorageData && !hasIndexedDBData;
        } catch (error) {
            console.error("Error checking migration status:", error);
            return false;
        }
    }

    // Optional: Clean up localStorage after successful migration
    async cleanupLocalStorage() {
        try {
            localStorage.removeItem("studyEntries");
            localStorage.removeItem("study-goals");
            localStorage.removeItem("study-templates");
            console.log("localStorage cleaned up after migration");
        } catch (error) {
            console.error("Error cleaning up localStorage:", error);
        }
    }

    // Get storage status for debugging
    getStorageStatus() {
        return {
            isIndexedDBAvailable: this.isIndexedDBAvailable,
            isInitialized: this.isInitialized,
            hasDatabase: !!this.db,
        };
    }
}

// Create and export a singleton instance
const dbManager = new IndexedDBManager();

export default dbManager;

// Export individual methods for easier usage
export const {
    getEntries,
    addEntry,
    updateEntry,
    deleteEntry,
    bulkDeleteEntries,
    getGoals,
    saveGoals,
    getTemplates,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    migrateFromLocalStorage,
    needsMigration,
    cleanupLocalStorage,
} = {
    getEntries: () => dbManager.getEntries(),
    addEntry: (entry) => dbManager.addEntry(entry),
    updateEntry: (entry) => dbManager.updateEntry(entry),
    deleteEntry: (id) => dbManager.deleteEntry(id),
    bulkDeleteEntries: (ids) => dbManager.bulkDeleteEntries(ids),
    getGoals: () => dbManager.getGoals(),
    saveGoals: (goals) => dbManager.saveGoals(goals),
    getTemplates: () => dbManager.getTemplates(),
    addTemplate: (template) => dbManager.addTemplate(template),
    updateTemplate: (template) => dbManager.updateTemplate(template),
    deleteTemplate: (id) => dbManager.deleteTemplate(id),
    migrateFromLocalStorage: () => dbManager.migrateFromLocalStorage(),
    needsMigration: () => dbManager.needsMigration(),
    cleanupLocalStorage: () => dbManager.cleanupLocalStorage(),
};
