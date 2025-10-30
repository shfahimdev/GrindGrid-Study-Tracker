import React from 'react';
import { useStudy } from '../../context/StudyContext';
import { useMetrics } from '../../hooks/useMetrics';
import { Line, Pie, Bar, Radar } from 'react-chartjs-2';
import { Loader } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = () => {
  const { getFilteredEntries, loading } = useStudy();
  const filteredEntries = getFilteredEntries();
  const metrics = useMetrics(filteredEntries);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!filteredEntries.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No data available for analytics.
        </p>
      </div>
    );
  }

  // Additional safety checks for metrics
  if (!metrics || !metrics.hoursByDate) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Unable to generate analytics metrics.
        </p>
      </div>
    );
  }

  // Chart data with safety checks
  const dailyStudyChartData = {
    labels: Object.keys(metrics.hoursByDate || {}).sort(),
    datasets: [
      {
        label: 'Study Hours',
        data: Object.keys(metrics.hoursByDate || {})
          .sort()
          .map(d => metrics.hoursByDate[d] || 0),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const subjectPieData = {
    labels: Object.keys(metrics.hoursBySubject || {}),
    datasets: [
      {
        data: Object.values(metrics.hoursBySubject || {}),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
      },
    ],
  };

  const chapterBarData = {
    labels: Object.keys(metrics.hoursByChapter || {}),
    datasets: [
      {
        label: 'Hours',
        data: Object.values(metrics.hoursByChapter || {}),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
      },
    ],
  };

  const focusTrendData = {
    labels: filteredEntries.map((e, i) => `Session ${i + 1}`),
    datasets: [
      {
        label: 'Focus Level',
        data: filteredEntries.map(e => e.focus || 0),
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const studyTypeData = {
    labels: Object.keys(metrics.hoursByStudyType || {}),
    datasets: [
      {
        data: Object.values(metrics.hoursByStudyType || {}),
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
      },
    ],
  };

  const dayOfWeekData = {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [
      {
        label: 'Hours',
        data: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
          day => (metrics.hoursByDayOfWeek && metrics.hoursByDayOfWeek[day]) || 0
        ),
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
      },
    ],
  };

  const timeOfDayData = {
    labels: ['Morning', 'Afternoon', 'Evening', 'Night'],
    datasets: [
      {
        label: 'Hours',
        data: [
          (metrics.hoursByTimeOfDay && metrics.hoursByTimeOfDay.morning) || 0,
          (metrics.hoursByTimeOfDay && metrics.hoursByTimeOfDay.afternoon) || 0,
          (metrics.hoursByTimeOfDay && metrics.hoursByTimeOfDay.evening) || 0,
          (metrics.hoursByTimeOfDay && metrics.hoursByTimeOfDay.night) || 0,
        ],
        backgroundColor: [
          'rgba(251, 191, 36, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(15, 23, 42, 0.8)',
        ],
      },
    ],
  };

  const performanceRadarData = {
    labels: Object.keys(metrics.avgFocusBySubject || {}).slice(0, 6),
    datasets: [
      {
        label: 'Average Focus',
        data: Object.values(metrics.avgFocusBySubject || {}).slice(0, 6),
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: 'rgb(107, 114, 128)',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: 'rgb(107, 114, 128)' },
        grid: { color: 'rgba(107, 114, 128, 0.1)' },
      },
      y: {
        ticks: { color: 'rgb(107, 114, 128)' },
        grid: { color: 'rgba(107, 114, 128, 0.1)' },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: 'rgb(107, 114, 128)',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: 'rgb(107, 114, 128)' },
        grid: { color: 'rgba(107, 114, 128, 0.1)' },
      },
      y: {
        ticks: { color: 'rgb(107, 114, 128)' },
        grid: { color: 'rgba(107, 114, 128, 0.1)' },
        beginAtZero: true,
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: 'rgb(107, 114, 128)',
        },
      },
    },
  };

  const radarChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: 'rgb(107, 114, 128)',
        },
      },
    },
    scales: {
      r: {
        ticks: { color: 'rgb(107, 114, 128)' },
        grid: { color: 'rgba(107, 114, 128, 0.1)' },
        pointLabels: { color: 'rgb(107, 114, 128)' },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Daily Study Time Trend
        </h2>
        <Line data={dailyStudyChartData} options={lineChartOptions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Study Time by Subject
          </h2>
          <Pie data={subjectPieData} options={pieChartOptions} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Time by Chapter
          </h2>
          <Bar data={chapterBarData} options={barChartOptions} />
        </div>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Study by Day of Week
          </h2>
          <Bar data={dayOfWeekData} options={barChartOptions} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Study by Time of Day
          </h2>
          <Bar data={timeOfDayData} options={barChartOptions} />
        </div>
      </div>
      
    </div>
  );
};

export default Analytics;
