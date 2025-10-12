import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCurrentDate, formatDate } from "../utils/dateUtils";

// Define the goal type
export interface StudyGoal {
    dailyGoalMinutes: number; // Default 4 hours = 240 minutes
    streak: number;
    lastCompletedDate: string | null;
    goalHistory: {
        date: string;
        goalMinutes: number;
        actualMinutes: number;
        completed: boolean;
    }[];
}

// Define the store state
interface GoalState {
    goal: StudyGoal;
    setDailyGoal: (minutes: number) => void;
    updateStreak: () => void;
    addGoalHistory: (date: string, actualMinutes: number) => void;
    getTodayProgress: () => number; // Returns percentage
    isGoalCompleted: (date: string) => boolean;
    resetStreak: () => void;
}

// Create the store with persistence
const useGoalStore = create<GoalState>()(
    persist(
        (set, get) => ({
            goal: {
                dailyGoalMinutes: 240, // Default 4 hours
                streak: 0,
                lastCompletedDate: null,
                goalHistory: [],
            },

            setDailyGoal: (minutes) => {
                set((state) => ({
                    goal: {
                        ...state.goal,
                        dailyGoalMinutes: minutes,
                    },
                }));
            },

            updateStreak: () => {
                const today = getCurrentDate();
                const state = get();
                const todayProgress = state.getTodayProgress();
                const isCompleted = todayProgress >= 100;

                if (isCompleted) {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yesterdayDate = formatDate(yesterday);

                    // If last completed date was yesterday, increment streak
                    if (state.goal.lastCompletedDate === yesterdayDate) {
                        set((state) => ({
                            goal: {
                                ...state.goal,
                                streak: state.goal.streak + 1,
                                lastCompletedDate: today,
                            },
                        }));
                    }
                    // If last completed date is not today (first time completing today)
                    else if (state.goal.lastCompletedDate !== today) {
                        set((state) => ({
                            goal: {
                                ...state.goal,
                                streak: 1,
                                lastCompletedDate: today,
                            },
                        }));
                    }
                }
            },

            addGoalHistory: (date, actualMinutes) => {
                const state = get();
                const goalMinutes = state.goal.dailyGoalMinutes;
                const completed = actualMinutes >= goalMinutes;

                // Check if history for this date already exists
                const existingEntryIndex = state.goal.goalHistory.findIndex(
                    (entry) => entry.date === date
                );

                if (existingEntryIndex !== -1) {
                    // Update existing entry
                    set((state) => {
                        const updatedHistory = [...state.goal.goalHistory];
                        updatedHistory[existingEntryIndex] = {
                            date,
                            goalMinutes,
                            actualMinutes,
                            completed,
                        };

                        return {
                            goal: {
                                ...state.goal,
                                goalHistory: updatedHistory,
                            },
                        };
                    });
                } else {
                    // Add new entry
                    set((state) => ({
                        goal: {
                            ...state.goal,
                            goalHistory: [
                                ...state.goal.goalHistory,
                                {
                                    date,
                                    goalMinutes,
                                    actualMinutes,
                                    completed,
                                },
                            ],
                        },
                    }));
                }
            },

            getTodayProgress: () => {
                const today = getCurrentDate();
                const todayMinutes =
                    get().goal.goalHistory.find((entry) => entry.date === today)
                        ?.actualMinutes || 0;
                const goalMinutes = get().goal.dailyGoalMinutes;
                return Math.min(
                    Math.round((todayMinutes / goalMinutes) * 100),
                    100
                );
            },

            isGoalCompleted: (date) => {
                const entry = get().goal.goalHistory.find(
                    (entry) => entry.date === date
                );
                return entry ? entry.completed : false;
            },

            resetStreak: () => {
                set((state) => ({
                    goal: {
                        ...state.goal,
                        streak: 0,
                        lastCompletedDate: null,
                    },
                }));
            },
        }),
        {
            name: "study-goals-storage",
            partialize: (state) => ({
                goal: state.goal,
            }),
        }
    )
);

export default useGoalStore;
