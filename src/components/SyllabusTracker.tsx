import { useState } from "react";
import useSyllabusStore from "../store/syllabusStore";
import syllabusData from "../data/syllabusData";
import ProgressBar from "./ProgressBar";

const SyllabusTracker = () => {
    const [expandedSubjects, setExpandedSubjects] = useState<
        Record<string, boolean>
    >({});
    const [expandedSections, setExpandedSections] = useState<
        Record<string, boolean>
    >({});

    const {
        markTopicCompleted,
        markTopicIncomplete,
        getTopicProgress,
        getSubjectProgress,
        getOverallProgress,
    } = useSyllabusStore();

    const overallProgress = getOverallProgress();
    const subjects = Object.keys(syllabusData);

    const toggleSubject = (subject: string) => {
        setExpandedSubjects((prev) => ({
            ...prev,
            [subject]: !prev[subject],
        }));
    };

    const toggleSection = (subject: string, section: string) => {
        const key = `${subject}-${section}`;
        setExpandedSections((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleTopicToggle = (
        subject: string,
        section: string,
        topic: string,
        isCompleted: boolean
    ) => {
        if (isCompleted) {
            markTopicIncomplete(subject, section, topic);
        } else {
            markTopicCompleted(subject, section, topic);
        }
    };

    return (
        <div className="space-y-6">
            {/* Overall Progress */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Overall Syllabus Progress
                </h2>
                <div className="mb-2">
                    <ProgressBar
                        progress={overallProgress.percentage}
                        size="large"
                        label={`${overallProgress.completed}/${overallProgress.total} topics completed`}
                    />
                </div>
                <p className="text-sm text-gray-600">
                    {overallProgress.percentage === 100
                        ? "Congratulations! You've completed your entire syllabus!"
                        : overallProgress.percentage >= 75
                        ? "Great progress! You're almost there!"
                        : overallProgress.percentage >= 50
                        ? "Good progress! Keep it up!"
                        : overallProgress.percentage >= 25
                        ? "You're making progress. Keep studying!"
                        : "Just getting started. Every topic counts!"}
                </p>
            </div>

            {/* Subject List */}
            <div className="space-y-4">
                {subjects.map((subject) => {
                    const subjectProgress = getSubjectProgress(subject);
                    const isExpanded = expandedSubjects[subject] || false;
                    const sections = Object.keys(syllabusData[subject]);

                    return (
                        <div
                            key={subject}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            {/* Subject Header */}
                            <div
                                className="p-4 cursor-pointer flex justify-between items-center"
                                onClick={() => toggleSubject(subject)}
                            >
                                <div className="flex items-center space-x-3">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {subject}
                                    </h3>
                                    <span className="text-sm text-gray-600">
                                        ({subjectProgress.completed}/
                                        {subjectProgress.total})
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-24">
                                        <ProgressBar
                                            progress={
                                                subjectProgress.percentage
                                            }
                                            size="small"
                                            showPercentage={false}
                                        />
                                    </div>
                                    <svg
                                        className={`w-5 h-5 text-gray-500 transform transition-transform ${
                                            isExpanded ? "rotate-180" : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Subject Content */}
                            {isExpanded && (
                                <div className="border-t border-gray-200">
                                    {sections.map((section) => {
                                        const sectionKey = `${subject}-${section}`;
                                        const isSectionExpanded =
                                            expandedSections[sectionKey] ||
                                            false;
                                        const topics =
                                            syllabusData[subject][section];

                                        // Count completed topics in this section
                                        let completedInSection = 0;
                                        topics.forEach((topic) => {
                                            const progress = getTopicProgress(
                                                subject,
                                                section,
                                                topic
                                            );
                                            if (progress?.completed) {
                                                completedInSection++;
                                            }
                                        });

                                        return (
                                            <div
                                                key={sectionKey}
                                                className="border-b border-gray-100 last:border-b-0"
                                            >
                                                {/* Section Header */}
                                                <div
                                                    className="p-3 cursor-pointer flex justify-between items-center bg-gray-50"
                                                    onClick={() =>
                                                        toggleSection(
                                                            subject,
                                                            section
                                                        )
                                                    }
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <h4 className="font-medium text-gray-700">
                                                            {section}
                                                        </h4>
                                                        <span className="text-xs text-gray-500">
                                                            (
                                                            {completedInSection}
                                                            /{topics.length})
                                                        </span>
                                                    </div>
                                                    <svg
                                                        className={`w-4 h-4 text-gray-500 transform transition-transform ${
                                                            isSectionExpanded
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </div>

                                                {/* Section Topics */}
                                                {isSectionExpanded && (
                                                    <div className="p-3 space-y-2">
                                                        {topics.map((topic) => {
                                                            const progress =
                                                                getTopicProgress(
                                                                    subject,
                                                                    section,
                                                                    topic
                                                                );
                                                            const isCompleted =
                                                                progress?.completed ||
                                                                false;

                                                            return (
                                                                <div
                                                                    key={topic}
                                                                    className="flex items-center p-2 rounded-md hover:bg-gray-50"
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`${subject}-${section}-${topic}`}
                                                                        checked={
                                                                            isCompleted
                                                                        }
                                                                        onChange={() =>
                                                                            handleTopicToggle(
                                                                                subject,
                                                                                section,
                                                                                topic,
                                                                                isCompleted
                                                                            )
                                                                        }
                                                                        className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`${subject}-${section}-${topic}`}
                                                                        className={`ml-3 text-sm ${
                                                                            isCompleted
                                                                                ? "text-gray-500 line-through"
                                                                                : "text-gray-700"
                                                                        }`}
                                                                    >
                                                                        {topic}
                                                                    </label>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SyllabusTracker;
