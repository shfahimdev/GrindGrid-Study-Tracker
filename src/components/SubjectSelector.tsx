import { useState } from "react";
import { getSubjects } from "../data/syllabusData";

interface SubjectSelectorProps {
    selectedSubject: string;
    onSubjectChange: (subject: string) => void;
}

const SubjectSelector = ({
    selectedSubject,
    onSubjectChange,
}: SubjectSelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const subjects = getSubjects();

    const handleSubjectSelect = (subject: string) => {
        onSubjectChange(subject);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full max-w-md">
            <button
                type="button"
                className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedSubject || "Select a subject"}
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1">
                    {subjects.map((subject) => (
                        <button
                            key={subject}
                            type="button"
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                            onClick={() => handleSubjectSelect(subject)}
                        >
                            {subject}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SubjectSelector;
