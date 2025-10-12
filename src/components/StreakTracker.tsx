import { useState, useEffect } from "react";
import useGoalStore from "../store/goalStore";
import useSessionStore from "../store/sessionStore";
import { getCurrentDate, formatDate } from "../utils/dateUtils";

const StreakTracker = () => {
    const { goal, updateStreak, resetStreak } = useGoalStore();
    const { getTotalStudyTime } = useSessionStore();
    const [showResetConfirm, setShowResetConfirm] = useState(false);

    // Update streak when component mounts or when goal changes
    useEffect(() => {
        updateStreak();
    }, [updateStreak]);

    // Get today's study time
    const today = getCurrentDate();
    const todayMinutes = getTotalStudyTime(today);
    const isGoalCompletedToday = todayMinutes >= goal.dailyGoalMinutes;

    // Get last 7 days for streak visualization
    const getLast7Days = () => {
        const days = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateString = formatDate(date);
            const dayName = date.toLocaleDateString("en-US", {
                weekday: "short",
            });
            const isToday = dateString === getCurrentDate();
            const minutes = getTotalStudyTime(dateString);
            const completed = minutes >= goal.dailyGoalMinutes;

            days.push({
                date: dateString,
                dayName,
                isToday,
                completed,
                minutes,
            });
        }

        return days;
    };

    const last7Days = getLast7Days();

    const handleResetStreak = () => {
        resetStreak();
        setShowResetConfirm(false);
    };

    const getStreakMessage = () => {
        if (goal.streak === 0) {
            return "Start studying to build your streak!";
        } else if (goal.streak === 1) {
            return "Great job! Keep it going!";
        } else if (goal.streak < 7) {
            return `${goal.streak} days in a row! You're building momentum!`;
        } else if (goal.streak < 30) {
            return `${goal.streak} days! That's impressive consistency!`;
        } else {
            return `${goal.streak} days! You're a study machine!`;
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    Study Streak
                </h2>
                {goal.streak > 0 && (
                    <button
                        onClick={() => setShowResetConfirm(true)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                        Reset
                    </button>
                )}
            </div>

            <div className="mb-4">
                <p className="text-3xl font-bold text-indigo-600">
                    {goal.streak} {goal.streak === 1 ? "day" : "days"}
                </p>
                <p className="text-sm text-gray-500">Current streak</p>
            </div>

            <p className="text-gray-700 mb-4">{getStreakMessage()}</p>

            <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Last 7 Days
                </h3>
                <div className="flex justify-between">
                    {last7Days.map((day) => (
                        <div
                            key={day.date}
                            className="flex flex-col items-center"
                        >
                            <span className="text-xs text-gray-500 mb-1">
                                {day.dayName}
                            </span>
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    day.completed
                                        ? "bg-green-500 text-white"
                                        : day.isToday && todayMinutes > 0
                                        ? "bg-yellow-500 text-white"
                                        : day.isToday
                                        ? "bg-gray-300 text-gray-700"
                                        : "bg-gray-200 text-gray-500"
                                }`}
                            >
                                {day.completed ? "✓" : day.isToday ? "!" : ""}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-sm text-gray-600">
                <p>
                    {isGoalCompletedToday
                        ? "Daily goal completed today! Your streak is safe."
                        : todayMinutes > 0
                        ? "Keep studying to complete your daily goal and maintain your streak."
                        : "Start studying today to maintain your streak!"}
                </p>
            </div>

            {showResetConfirm && (
                <div className="mt-4 p-3 bg-red-50 rounded-md">
                    <p className="text-sm text-red-800 mb-2">
                        Are you sure you want to reset your streak? This action
                        cannot be undone.
                    </p>
                    <div className="flex space-x-2">
                        <button
                            onClick={handleResetStreak}
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Yes, Reset
                        </button>
                        <button
                            onClick={() => setShowResetConfirm(false)}
                            className="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StreakTracker;
