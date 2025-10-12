import { useState, useEffect, useRef } from "react";
import SubjectSelector from "./SubjectSelector";
import useSessionStore from "../store/sessionStore";
import { getCurrentDate } from "../utils/dateUtils";
import type { StudySession } from "../store/sessionStore";

const Timer = () => {
    const [displayTime, setDisplayTime] = useState("00:00");
    const [isRunning, setIsRunning] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState("");
    const intervalRef = useRef<number | null>(null);
    const startTimeRef = useRef<Date | null>(null);
    const { currentSession, setCurrentSession, addSession } = useSessionStore();

    // Format time for display (MM:SS)
    const formatTimeDisplay = (elapsedMs: number): string => {
        const totalSeconds = Math.floor(elapsedMs / 1000);
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    // Calculate elapsed time based on timestamps
    const calculateElapsedTime = (): number => {
        if (!startTimeRef.current) return 0;
        return Date.now() - startTimeRef.current.getTime();
    };

    // Update timer display
    const updateTimerDisplay = () => {
        const elapsedMs = calculateElapsedTime();
        setDisplayTime(formatTimeDisplay(elapsedMs));
    };

    // Handle timer logic
    useEffect(() => {
        if (isRunning) {
            // Update immediately and then every second
            updateTimerDisplay();

            intervalRef.current = window.setInterval(() => {
                updateTimerDisplay();
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

        const now = new Date();
        startTimeRef.current = now;
        setIsRunning(true);
        setDisplayTime("00:00");

        const newSession: StudySession = {
            id: Math.random().toString(36).substring(2, 9),
            subject: selectedSubject,
            startTime: now.toISOString(),
            endTime: "",
            duration: 0,
            date: getCurrentDate(),
        };

        setCurrentSession(newSession);
    };

    // Stop the timer
    const stopTimer = () => {
        setIsRunning(false);

        if (currentSession && startTimeRef.current) {
            const endTime = new Date();

            // Calculate duration in minutes from timestamps
            const durationMs =
                endTime.getTime() - startTimeRef.current.getTime();
            const durationMinutes = Math.round(durationMs / (1000 * 60));

            const completedSession: StudySession = {
                ...currentSession,
                endTime: endTime.toISOString(),
                duration: durationMinutes,
            };

            addSession(completedSession);
            setCurrentSession(null);
            startTimeRef.current = null;
        }

        setDisplayTime("00:00");
    };

    // Reset the timer
    const resetTimer = () => {
        setIsRunning(false);
        setDisplayTime("00:00");
        startTimeRef.current = null;
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
                {displayTime}
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
