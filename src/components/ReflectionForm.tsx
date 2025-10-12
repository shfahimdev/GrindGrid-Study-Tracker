import { useState, useEffect } from "react";
import useReflectionStore from "../store/reflectionStore";
import { getCurrentDate } from "../utils/dateUtils";

const ReflectionForm = () => {
    const [whatWentWell, setWhatWentWell] = useState("");
    const [whatToImprove, setWhatToImprove] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [hasSavedToday, setHasSavedToday] = useState(false);

    const { addReflection, getReflectionByDate, updateReflection } =
        useReflectionStore();

    const today = getCurrentDate();
    const todayReflection = getReflectionByDate(today);

    // Load today's reflection if it exists
    useEffect(() => {
        if (todayReflection) {
            setWhatWentWell(todayReflection.whatWentWell);
            setWhatToImprove(todayReflection.whatToImprove);
            setHasSavedToday(true);
            setIsEditing(false);
        } else {
            setWhatWentWell("");
            setWhatToImprove("");
            setHasSavedToday(false);
            setIsEditing(true);
        }
    }, [todayReflection]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (whatWentWell.trim() || whatToImprove.trim()) {
            if (hasSavedToday) {
                // Update existing reflection
                updateReflection(todayReflection!.id, {
                    whatWentWell,
                    whatToImprove,
                });
            } else {
                // Add new reflection
                addReflection({
                    date: today,
                    whatWentWell,
                    whatToImprove,
                });
                setHasSavedToday(true);
            }
            setIsEditing(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        if (todayReflection) {
            setWhatWentWell(todayReflection.whatWentWell);
            setWhatToImprove(todayReflection.whatToImprove);
        } else {
            setWhatWentWell("");
            setWhatToImprove("");
        }
        setIsEditing(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Daily Reflection
            </h2>

            <div className="mb-4 text-sm text-gray-600">
                {todayReflection && !isEditing ? (
                    <span className="text-green-600">
                        ✓ Reflection saved for today
                    </span>
                ) : (
                    <span>Reflect on your study session today</span>
                )}
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="whatWentWell"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            What went well today?
                        </label>
                        <textarea
                            id="whatWentWell"
                            rows={3}
                            value={whatWentWell}
                            onChange={(e) => setWhatWentWell(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="What did you accomplish? What are you proud of?"
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="whatToImprove"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            What to improve?
                        </label>
                        <textarea
                            id="whatToImprove"
                            rows={3}
                            value={whatToImprove}
                            onChange={(e) => setWhatToImprove(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="What could be better? What will you do differently tomorrow?"
                        />
                    </div>

                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            {hasSavedToday ? "Update" : "Save"}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-4">
                    {whatWentWell && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-1">
                                What went well today:
                            </h3>
                            <p className="text-gray-900 bg-green-50 p-3 rounded-md">
                                {whatWentWell}
                            </p>
                        </div>
                    )}

                    {whatToImprove && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-1">
                                What to improve:
                            </h3>
                            <p className="text-gray-900 bg-yellow-50 p-3 rounded-md">
                                {whatToImprove}
                            </p>
                        </div>
                    )}

                    <div className="pt-2">
                        <button
                            onClick={handleEdit}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Edit Reflection
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReflectionForm;
