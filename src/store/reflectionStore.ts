import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the reflection type
export interface DailyReflection {
    id: string;
    date: string;
    whatWentWell: string;
    whatToImprove: string;
    createdAt: string;
}

// Define the store state
interface ReflectionState {
    reflections: DailyReflection[];
    addReflection: (
        reflection: Omit<DailyReflection, "id" | "createdAt">
    ) => void;
    getReflectionByDate: (date: string) => DailyReflection | undefined;
    getAllReflections: () => DailyReflection[];
    updateReflection: (
        id: string,
        reflection: Partial<DailyReflection>
    ) => void;
    deleteReflection: (id: string) => void;
}

// Create the store with persistence
const useReflectionStore = create<ReflectionState>()(
    persist(
        (set, get) => ({
            reflections: [],

            addReflection: (reflection) => {
                const newReflection: DailyReflection = {
                    ...reflection,
                    id: Math.random().toString(36).substring(2, 9),
                    createdAt: new Date().toISOString(),
                };

                set((state) => {
                    // Check if a reflection for this date already exists
                    const existingIndex = state.reflections.findIndex(
                        (r) => r.date === reflection.date
                    );

                    if (existingIndex !== -1) {
                        // Update existing reflection
                        const updatedReflections = [...state.reflections];
                        updatedReflections[existingIndex] = newReflection;
                        return { reflections: updatedReflections };
                    } else {
                        // Add new reflection
                        return {
                            reflections: [...state.reflections, newReflection],
                        };
                    }
                });
            },

            getReflectionByDate: (date) => {
                return get().reflections.find(
                    (reflection) => reflection.date === date
                );
            },

            getAllReflections: () => {
                return get().reflections;
            },

            updateReflection: (id, updatedReflection) => {
                set((state) => ({
                    reflections: state.reflections.map((reflection) =>
                        reflection.id === id
                            ? { ...reflection, ...updatedReflection }
                            : reflection
                    ),
                }));
            },

            deleteReflection: (id) => {
                set((state) => ({
                    reflections: state.reflections.filter(
                        (reflection) => reflection.id !== id
                    ),
                }));
            },
        }),
        {
            name: "study-reflections-storage",
        }
    )
);

export default useReflectionStore;
