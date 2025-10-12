import type { StudySession } from "../store/sessionStore";

// Convert study sessions to CSV format
export const sessionsToCSV = (sessions: StudySession[]): string => {
    if (sessions.length === 0) return "No data to export";

    // Define CSV headers
    const headers = [
        "Date",
        "Subject",
        "Start Time",
        "End Time",
        "Duration (minutes)",
    ];

    // Convert each session to a CSV row
    const rows = sessions.map((session) => [
        session.date,
        session.subject,
        session.startTime,
        session.endTime,
        session.duration.toString(),
    ]);

    // Combine headers and rows
    const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.join(",")),
    ].join("\n");

    return csvContent;
};

// Download CSV file
export const downloadCSV = (csvContent: string, filename: string): void => {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Export sessions to CSV file
export const exportSessionsToCSV = (sessions: StudySession[]): void => {
    const csvContent = sessionsToCSV(sessions);
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const filename = `study-sessions-${formattedDate}.csv`;

    downloadCSV(csvContent, filename);
};
