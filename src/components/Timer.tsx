import { useState, useEffect, useRef } from "react";
import SubjectSelector from "./SubjectSelector";
import useSessionStore from "../store/sessionStore";
import { getCurrentDate, formatTime } from "../utils/dateUtils";
import type { StudySession } from "../store/sessionStore";

const Timer = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState("");
    const intervalRef = useRef<number | null>(null);
    const { currentSession, setCurrentSession, addSession } = useSessionStore();

    // Format time for display (MM:SS)
    const formatTimeDisplay = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    // Handle timer logic
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = window.setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    // Start the timer
    const startTimer = () => {
        if (!selectedSubject) {
            alert("Please select a subject first");
            return;
        }

        setIsRunning(true);
        const startTime = new Date();

        const newSession: StudySession = {
            id: Math.random().toString(36).substring(2, 9),
            subject: selectedSubject,
            startTime: formatTime(startTime),
            endTime: "",
            duration: 0,
            date: getCurrentDate(),
        };

        setCurrentSession(newSession);
    };

    // Stop the timer
    const stopTimer = () => {
        setIsRunning(false);

        if (currentSession) {
            const endTime = new Date();
            const duration = Math.floor(time / 60); // Duration in minutes

            const completedSession: StudySession = {
                ...currentSession,
                endTime: formatTime(endTime),
                duration: duration,
            };

            addSession(completedSession);
            setCurrentSession(null);
        }

        setTime(0);
    };

    // Reset the timer
    const resetTimer = () => {
        setIsRunning(false);
        setTime(0);
        setCurrentSession(null);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Study Timer
            </h2>

            <div className="mb-4">
                <SubjectSelector
                    selectedSubject={selectedSubject}
                    onSubjectChange={setSelectedSubject}
                />
            </div>

            <div className="text-4xl font-mono font-bold text-center my-6">
                {formatTimeDisplay(time)}
            </div>

            <div className="flex justify-center space-x-4">
                {!isRunning ? (
                    <button
                        onClick={startTimer}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Start
                    </button>
                ) : (
                    <button
                        onClick={stopTimer}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Stop
                    </button>
                )}

                <button
                    onClick={resetTimer}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Timer;
