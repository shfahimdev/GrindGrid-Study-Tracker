import { useState, useEffect } from "react";
import useGoalStore from "../store/goalStore";
import useSessionStore from "../store/sessionStore";
import { getCurrentDate } from "../utils/dateUtils";

const GoalTracker = () => {
    const { goal, setDailyGoal, addGoalHistory } = useGoalStore();
    const { getTotalStudyTime } = useSessionStore();
    const [isEditing, setIsEditing] = useState(false);
    const [tempGoal, setTempGoal] = useState(goal.dailyGoalMinutes);
    const [progress, setProgress] = useState(0);

    // Update progress when sessions change
    useEffect(() => {
        const today = getCurrentDate();
        const todayMinutes = getTotalStudyTime(today);
        const progressPercentage = Math.min(
            Math.round((todayMinutes / goal.dailyGoalMinutes) * 100),
            100
        );

        setProgress(progressPercentage);

        // Update goal history with today's progress
        addGoalHistory(today, todayMinutes);
    }, [getTotalStudyTime, goal.dailyGoalMinutes, addGoalHistory]);

    const handleSaveGoal = () => {
        setDailyGoal(tempGoal);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setTempGoal(goal.dailyGoalMinutes);
        setIsEditing(false);
    };

    // Format minutes to hours and minutes
    const formatTime = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    // Get today's study time
    const today = getCurrentDate();
    const todayMinutes = getTotalStudyTime(today);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    Daily Goal
                </h2>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                        Edit
                    </button>
                ) : null}
            </div>

            {isEditing ? (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Daily Goal (minutes)
                    </label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            min="1"
                            value={tempGoal}
                            onChange={(e) =>
                                setTempGoal(Number(e.target.value))
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <button
                            onClick={handleSaveGoal}
                            className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancelEdit}
                            className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mb-4">
                    <p className="text-3xl font-bold text-indigo-600">
                        {formatTime(goal.dailyGoalMinutes)}
                    </p>
                    <p className="text-sm text-gray-500">Daily target</p>
                </div>
            )}

            <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-indigo-600 h-2.5 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="flex justify-between text-sm">
                <span className="text-gray-600">Studied today:</span>
                <span className="font-medium">{formatTime(todayMinutes)}</span>
            </div>

            {progress < 100 && progress > 0 && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-md">
                    <p className="text-sm text-yellow-800">
                        You're on track! Keep going to reach your daily goal.
                    </p>
                </div>
            )}

            {progress === 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-800">
                        Start a study session to work towards your daily goal.
                    </p>
                </div>
            )}
        </div>
    );
};

export default GoalTracker;
