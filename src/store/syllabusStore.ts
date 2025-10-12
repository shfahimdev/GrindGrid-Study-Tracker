import { create } from "zustand";
import { persist } from "zustand/middleware";
import syllabusData from "../data/syllabusData";

// Define the syllabus progress type
export interface TopicProgress {
    id: string;
    subject: string;
    section: string;
    topic: string;
    completed: boolean;
    completedAt: string | null;
}

// Define the store state
interface SyllabusState {
    topicProgress: TopicProgress[];
    markTopicCompleted: (
        subject: string,
        section: string,
        topic: string
    ) => void;
    markTopicIncomplete: (
        subject: string,
        section: string,
        topic: string
    ) => void;
    getTopicProgress: (
        subject: string,
        section: string,
        topic: string
    ) => TopicProgress | undefined;
    getSubjectProgress: (subject: string) => {
        completed: number;
        total: number;
        percentage: number;
    };
    getOverallProgress: () => {
        completed: number;
        total: number;
        percentage: number;
    };
    resetProgress: () => void;
}

// Create the store with persistence
const useSyllabusStore = create<SyllabusState>()(
    persist(
        (set, get) => ({
            topicProgress: [],

            markTopicCompleted: (subject, section, topic) => {
                const state = get();
                const existingProgress = state.getTopicProgress(
                    subject,
                    section,
                    topic
                );

                if (existingProgress) {
                    // Update existing progress
                    set((state) => ({
                        topicProgress: state.topicProgress.map((progress) =>
                            progress.id === existingProgress.id
                                ? {
                                      ...progress,
                                      completed: true,
                                      completedAt: new Date().toISOString(),
                                  }
                                : progress
                        ),
                    }));
                } else {
                    // Add new progress
                    const newProgress: TopicProgress = {
                        id: Math.random().toString(36).substring(2, 9),
                        subject,
                        section,
                        topic,
                        completed: true,
                        completedAt: new Date().toISOString(),
                    };

                    set((state) => ({
                        topicProgress: [...state.topicProgress, newProgress],
                    }));
                }
            },

            markTopicIncomplete: (subject, section, topic) => {
                const state = get();
                const existingProgress = state.getTopicProgress(
                    subject,
                    section,
                    topic
                );

                if (existingProgress) {
                    set((state) => ({
                        topicProgress: state.topicProgress.map((progress) =>
                            progress.id === existingProgress.id
                                ? {
                                      ...progress,
                                      completed: false,
                                      completedAt: null,
                                  }
                                : progress
                        ),
                    }));
                }
            },

            getTopicProgress: (subject, section, topic) => {
                return get().topicProgress.find(
                    (progress) =>
                        progress.subject === subject &&
                        progress.section === section &&
                        progress.topic === topic
                );
            },

            getSubjectProgress: (subject) => {
                const state = get();
                const subjectData = syllabusData[subject];

                if (!subjectData) {
                    return { completed: 0, total: 0, percentage: 0 };
                }

                let totalTopics = 0;
                let completedTopics = 0;

                Object.entries(subjectData).forEach(([section, topics]) => {
                    totalTopics += topics.length;

                    topics.forEach((topic) => {
                        const progress = state.getTopicProgress(
                            subject,
                            section,
                            topic
                        );
                        if (progress?.completed) {
                            completedTopics++;
                        }
                    });
                });

                const percentage =
                    totalTopics > 0
                        ? Math.round((completedTopics / totalTopics) * 100)
                        : 0;

                return {
                    completed: completedTopics,
                    total: totalTopics,
                    percentage,
                };
            },

            getOverallProgress: () => {
                const state = get();
                let totalTopics = 0;
                let completedTopics = 0;

                Object.entries(syllabusData).forEach(([subject, sections]) => {
                    Object.entries(sections).forEach(([section, topics]) => {
                        totalTopics += topics.length;

                        topics.forEach((topic) => {
                            const progress = state.getTopicProgress(
                                subject,
                                section,
                                topic
                            );
                            if (progress?.completed) {
                                completedTopics++;
                            }
                        });
                    });
                });

                const percentage =
                    totalTopics > 0
                        ? Math.round((completedTopics / totalTopics) * 100)
                        : 0;

                return {
                    completed: completedTopics,
                    total: totalTopics,
                    percentage,
                };
            },

            resetProgress: () => {
                set({ topicProgress: [] });
            },
        }),
        {
            name: "syllabus-progress-storage",
        }
    )
);

export default useSyllabusStore;
