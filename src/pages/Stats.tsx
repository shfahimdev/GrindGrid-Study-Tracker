import AnalyticsChart from "../components/AnalyticsChart";
import useSessionStore from "../store/sessionStore";
import { exportSessionsToCSV } from "../utils/exportUtils";

const Stats = () => {
    const sessions = useSessionStore((state) => state.sessions);

    const handleExport = () => {
        exportSessionsToCSV(sessions);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Statistics</h1>
                <button
                    onClick={handleExport}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Export Data
                </button>
            </div>
            <AnalyticsChart />
        </div>
    );
};

export default Stats;
