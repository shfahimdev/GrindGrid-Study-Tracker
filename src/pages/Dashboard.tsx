import { useEffect, useState } from "react";
import Timer from "../components/Timer";
import GoalTracker from "../components/GoalTracker";
import StreakTracker from "../components/StreakTracker";
import ProgressBar from "../components/ProgressBar";
import useSessionStore from "../store/sessionStore";
import useGoalStore from "../store/goalStore";
import { getWeekDates } from "../utils/dateUtils";

const Dashboard = () => {
    const [todayStudyTime, setTodayStudyTime] = useState(0);
    const [weeklyProgress, setWeeklyProgress] = useState(0);
    const { getTodaySessions, getTotalStudyTime } = useSessionStore();
    const { goal } = useGoalStore();

    // Update today's study time when sessions change
    useEffect(() => {
        const updateTodayStudyTime = () => {
            const todaySessions = getTodaySessions();
            const totalMinutes = todaySessions.reduce(
                (total, session) => total + session.duration,
                0
            );
            setTodayStudyTime(totalMinutes);
        };

        updateTodayStudyTime();

        // Add event listener for storage changes to update in real-time
        const handleStorageChange = () => {
            updateTodayStudyTime();
            updateWeeklyProgress();
        };

        window.addEventListener("storage", handleStorageChange);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [getTodaySessions]);

    // Calculate weekly progress
    const updateWeeklyProgress = () => {
        const weekDates = getWeekDates();
        let totalWeeklyMinutes = 0;
        let completedDays = 0;

        weekDates.forEach((date) => {
            const dayMinutes = getTotalStudyTime(date);
            totalWeeklyMinutes += dayMinutes;
            if (dayMinutes >= goal.dailyGoalMinutes) {
                completedDays++;
            }
        });

        const weeklyGoal = goal.dailyGoalMinutes * 7;
        const progressPercentage = Math.min(
            Math.round((totalWeeklyMinutes / weeklyGoal) * 100),
            100
        );

        setWeeklyProgress(progressPercentage);
    };

    // Update weekly progress when goal changes
    useEffect(() => {
        updateWeeklyProgress();
    }, [goal, getTotalStudyTime]);

    // Format study time for display
    const formatStudyTime = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Timer />
                <GoalTracker />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StreakTracker />

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Weekly Progress
                    </h2>
                    <div className="mb-4">
                        <ProgressBar
                            progress={weeklyProgress}
                            size="large"
                            label="Weekly Goal"
                        />
                    </div>
                    <p className="text-sm text-gray-600">
                        {weeklyProgress >= 100
                            ? "Great job! You've completed your weekly goal!"
                            : "Keep going to reach your weekly goal."}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Today's Study Time
                    </h2>
                    <p className="text-3xl font-bold text-indigo-600 mb-4">
                        {formatStudyTime(todayStudyTime)}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-indigo-600 h-2.5 rounded-full"
                            style={{
                                width: `${Math.min(
                                    Math.round(
                                        (todayStudyTime /
                                            goal.dailyGoalMinutes) *
                                            100
                                    ),
                                    100
                                )}%`,
                            }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                        {todayStudyTime >= goal.dailyGoalMinutes
                            ? "Daily goal completed!"
                            : `${
                                  goal.dailyGoalMinutes - todayStudyTime
                              } minutes to go`}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
