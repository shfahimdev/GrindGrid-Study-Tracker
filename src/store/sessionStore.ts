import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCurrentDate } from "../utils/dateUtils";

// Define the session type
export interface StudySession {
    id: string;
    subject: string;
    startTime: string; // ISO string timestamp
    endTime: string; // ISO string timestamp
    duration: number; // in minutes
    date: string;
}

// Define the store state
interface SessionState {
    sessions: StudySession[];
    currentSession: StudySession | null;
    addSession: (session: StudySession) => void;
    setCurrentSession: (session: StudySession | null) => void;
    getTodaySessions: () => StudySession[];
    getWeeklySessions: () => StudySession[];
    getTotalStudyTime: (date: string) => number;
}

// Create the store with persistence
const useSessionStore = create<SessionState>()(
    persist(
        (set, get) => ({
            sessions: [],
            currentSession: null,

            addSession: (session) => {
                set((state) => ({
                    sessions: [...state.sessions, session],
                }));
            },

            setCurrentSession: (session) => {
                set({ currentSession: session });
            },

            getTodaySessions: () => {
                const sessions = get().sessions;
                const today = getCurrentDate();
                return sessions.filter((session) => session.date === today);
            },

            getWeeklySessions: () => {
                const sessions = get().sessions;
                const today = new Date();
                const weekAgo = new Date(today);
                weekAgo.setDate(today.getDate() - 7);

                return sessions.filter((session) => {
                    const sessionDate = new Date(session.date);
                    return sessionDate >= weekAgo && sessionDate <= today;
                });
            },

            getTotalStudyTime: (date) => {
                const sessions = get().sessions;
                return sessions
                    .filter((session) => session.date === date)
                    .reduce((total, session) => total + session.duration, 0);
            },
        }),
        {
            name: "study-sessions-storage",
            partialize: (state) => ({
                sessions: state.sessions,
                currentSession: state.currentSession,
            }),
        }
    )
);

export default useSessionStore;
