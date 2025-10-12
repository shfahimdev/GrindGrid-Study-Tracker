import { useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import useSessionStore from "../store/sessionStore";
import { getWeekDates } from "../utils/dateUtils";

const AnalyticsChart = () => {
    const { getWeeklySessions, getTotalStudyTime } = useSessionStore();

    // Prepare data for weekly study hours chart
    const weeklyData = useMemo(() => {
        const weekDates = getWeekDates();
        return weekDates.map((date) => {
            const dayName = new Date(date).toLocaleDateString("en-US", {
                weekday: "short",
            });
            const minutes = getTotalStudyTime(date);
            return {
                name: dayName,
                hours: Math.round((minutes / 60) * 10) / 10, // Round to 1 decimal place
                date,
            };
        });
    }, [getTotalStudyTime]);

    // Prepare data for subject distribution pie chart
    const subjectData = useMemo(() => {
        const sessions = getWeeklySessions();
        const subjectMap: Record<string, number> = {};

        sessions.forEach((session) => {
            if (subjectMap[session.subject]) {
                subjectMap[session.subject] += session.duration;
            } else {
                subjectMap[session.subject] = session.duration;
            }
        });

        return Object.entries(subjectMap)
            .map(([subject, minutes]) => ({
                name: subject,
                value: Math.round((minutes / 60) * 10) / 10, // Convert to hours
                minutes,
            }))
            .sort((a, b) => b.value - a.value);
    }, [getWeeklySessions]);

    // Calculate total hours and sessions for the week
    const totalWeeklyHours = weeklyData.reduce(
        (total, day) => total + day.hours,
        0
    );
    const totalSessions = getWeeklySessions().length;

    // Find most studied subject
    const mostStudiedSubject =
        subjectData.length > 0 ? subjectData[0].name : "None";

    // Colors for pie chart
    const COLORS = [
        "#4f46e5", // indigo-600
        "#818cf8", // indigo-400
        "#c7d2fe", // indigo-200
        "#a5b4fc", // indigo-300
        "#6366f1", // indigo-500
    ];

    return (
        <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                        Total Hours
                    </h3>
                    <p className="text-3xl font-bold text-indigo-600">
                        {totalWeeklyHours.toFixed(1)}h
                    </p>
                    <p className="text-sm text-gray-500">This week</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                        Study Sessions
                    </h3>
                    <p className="text-3xl font-bold text-indigo-600">
                        {totalSessions}
                    </p>
                    <p className="text-sm text-gray-500">This week</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                        Most Studied
                    </h3>
                    <p className="text-xl font-bold text-indigo-600 truncate">
                        {mostStudiedSubject}
                    </p>
                    <p className="text-sm text-gray-500">Subject</p>
                </div>
            </div>

            {/* Weekly Study Hours Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Weekly Study Hours
                </h2>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                                formatter={(value) => [
                                    `${value} hours`,
                                    "Study Time",
                                ]}
                                labelFormatter={(label) => `Day: ${label}`}
                            />
                            <Bar dataKey="hours" fill="#4f46e5" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Subject Distribution Chart */}
            {subjectData.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Subject Distribution
                    </h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={subjectData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={(props: any) => {
                                        const name = props.name || "";
                                        const percent = props.percent || 0;
                                        return `${name}: ${(
                                            percent * 100
                                        ).toFixed(0)}%`;
                                    }}
                                >
                                    {subjectData.map((_entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => [
                                        `${value} hours`,
                                        "Study Time",
                                    ]}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* Most Productive Hours */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Most Productive Hours
                </h2>
                <ProductiveHoursAnalysis />
            </div>
        </div>
    );
};

// Component to analyze most productive hours of the day
const ProductiveHoursAnalysis = () => {
    const { getWeeklySessions } = useSessionStore();

    const hourlyData = useMemo(() => {
        const sessions = getWeeklySessions();
        const hourCounts: Record<number, number> = {};

        // Initialize all hours with 0
        for (let i = 0; i < 24; i++) {
            hourCounts[i] = 0;
        }

        // Count sessions by hour
        sessions.forEach((session) => {
            if (session.startTime) {
                const [hour] = session.startTime.split(":").map(Number);
                if (hour >= 0 && hour < 24) {
                    hourCounts[hour] += session.duration;
                }
            }
        });

        // Convert to array and sort by study time
        return Object.entries(hourCounts)
            .map(([hour, minutes]) => ({
                hour: parseInt(hour),
                hourLabel: `${hour}:00`,
                minutes,
                hours: Math.round((minutes / 60) * 10) / 10,
            }))
            .sort((a, b) => b.minutes - a.minutes)
            .slice(0, 5); // Top 5 most productive hours
    }, [getWeeklySessions]);

    if (hourlyData.length === 0 || hourlyData[0].minutes === 0) {
        return (
            <p className="text-gray-600">
                Not enough data to determine productive hours yet. Keep
                studying!
            </p>
        );
    }

    return (
        <div>
            <p className="text-gray-700 mb-4">
                Based on your study sessions, these are your most productive
                hours:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                {hourlyData.map((data, index) => (
                    <div
                        key={data.hour}
                        className={`p-3 rounded-md text-center ${
                            index === 0
                                ? "bg-indigo-100 border-2 border-indigo-500"
                                : "bg-gray-100"
                        }`}
                    >
                        <div className="text-lg font-bold text-indigo-700">
                            {data.hourLabel}
                        </div>
                        <div className="text-sm text-gray-600">
                            {data.hours}h studied
                        </div>
                        {index === 0 && (
                            <div className="text-xs font-medium text-indigo-600 mt-1">
                                Most Productive
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnalyticsChart;
