import ReflectionForm from "../components/ReflectionForm";
import useReflectionStore from "../store/reflectionStore";
import { useState, useEffect } from "react";

const Reflection = () => {
    const { getAllReflections } = useReflectionStore();
    const [reflections, setReflections] = useState<any[]>([]);

    useEffect(() => {
        const allReflections = getAllReflections();
        // Sort by date, most recent first
        const sortedReflections = [...allReflections].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setReflections(sortedReflections);
    }, [getAllReflections]);

    const formatDateForDisplay = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Reflection
            </h1>

            <div className="mb-8">
                <ReflectionForm />
            </div>

            {reflections.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Past Reflections
                    </h2>
                    <div className="space-y-6">
                        {reflections.map((reflection) => (
                            <div
                                key={reflection.id}
                                className="border-l-4 border-indigo-500 pl-4 py-2"
                            >
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    {formatDateForDisplay(reflection.date)}
                                </h3>
                                {reflection.whatWentWell && (
                                    <div className="mb-3">
                                        <h4 className="text-sm font-medium text-green-700 mb-1">
                                            What went well:
                                        </h4>
                                        <p className="text-gray-700">
                                            {reflection.whatWentWell}
                                        </p>
                                    </div>
                                )}
                                {reflection.whatToImprove && (
                                    <div>
                                        <h4 className="text-sm font-medium text-yellow-700 mb-1">
                                            What to improve:
                                        </h4>
                                        <p className="text-gray-700">
                                            {reflection.whatToImprove}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reflection;
