// Utility functions for date handling
export const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
};

export const formatTime = (date: Date): string => {
    return date.toTimeString().split(" ")[0].substring(0, 5);
};

export const getCurrentDate = (): string => {
    return formatDate(new Date());
};

export const getWeekDates = (): string[] => {
    const today = new Date();
    const weekDates: string[] = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        weekDates.push(formatDate(date));
    }

    return weekDates;
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};
