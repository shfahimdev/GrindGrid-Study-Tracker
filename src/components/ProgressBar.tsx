import { useEffect, useState } from "react";

interface ProgressBarProps {
    progress: number; // 0-100
    size?: "small" | "medium" | "large";
    color?: "indigo" | "green" | "yellow" | "red";
    showPercentage?: boolean;
    label?: string;
    animated?: boolean;
}

const ProgressBar = ({
    progress,
    size = "medium",
    color = "indigo",
    showPercentage = true,
    label,
    animated = true,
}: ProgressBarProps) => {
    const [displayProgress, setDisplayProgress] = useState(0);

    // Animate progress on mount and when progress changes
    useEffect(() => {
        if (animated) {
            const timer = setTimeout(() => {
                setDisplayProgress(progress);
            }, 100);
            return () => clearTimeout(timer);
        } else {
            setDisplayProgress(progress);
        }
    }, [progress, animated]);

    // Size classes
    const sizeClasses = {
        small: "h-2",
        medium: "h-3",
        large: "h-4",
    };

    // Color classes
    const colorClasses = {
        indigo: "bg-indigo-600",
        green: "bg-green-600",
        yellow: "bg-yellow-600",
        red: "bg-red-600",
    };

    // Get color based on progress percentage
    const getProgressColor = () => {
        if (progress < 25) return "red";
        if (progress < 50) return "yellow";
        if (progress < 75) return "indigo";
        return "green";
    };

    const progressColor = color === "indigo" ? getProgressColor() : color;

    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                        {label}
                    </span>
                    {showPercentage && (
                        <span className="text-sm text-gray-500">
                            {Math.round(displayProgress)}%
                        </span>
                    )}
                </div>
            )}
            <div
                className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}
            >
                <div
                    className={`${colorClasses[progressColor]} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${displayProgress}%` }}
                ></div>
            </div>
            {!label && showPercentage && (
                <div className="mt-1 text-center">
                    <span className="text-sm text-gray-500">
                        {Math.round(displayProgress)}%
                    </span>
                </div>
            )}
        </div>
    );
};

export default ProgressBar;
