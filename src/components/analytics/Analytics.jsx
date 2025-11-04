import React, { useMemo } from 'react';
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

  // Fill missing dates and prepare histogram data
  const dailyStudyChartData = useMemo(() => {
    const dates = Object.keys(metrics.hoursByDate || {}).sort();
    if (dates.length === 0) return { labels: [], datasets: [] };

    // Parse dates and find min/max
    const dateObjs = dates.map(d => new Date(d));
    const minDate = new Date(Math.min(...dateObjs));
    const maxDate = new Date(Math.max(...dateObjs));

    // Fill all dates in range
    const allDates = [];
    const allHours = [];
    const currentDate = new Date(minDate);
    
    while (currentDate <= maxDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      allDates.push(dateStr);
      allHours.push(metrics.hoursByDate[dateStr] || 0);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Create gradient colors (indigo → blue → purple → pink)
    const colors = allHours.map((_, idx) => {
      const ratio = idx / Math.max(allHours.length - 1, 1);
      if (ratio < 0.33) {
        // Indigo to Blue
        const t = ratio / 0.33;
        return `rgba(${99 + (59 - 99) * t}, ${102 + (130 - 102) * t}, ${241 + (246 - 241) * t}, 0.85)`;
      } else if (ratio < 0.66) {
        // Blue to Purple
        const t = (ratio - 0.33) / 0.33;
        return `rgba(${59 + (168 - 59) * t}, ${130 + (85 - 130) * t}, ${246 + (247 - 246) * t}, 0.85)`;
      } else {
        // Purple to Pink
        const t = (ratio - 0.66) / 0.34;
        return `rgba(${168 + (236 - 168) * t}, ${85 + (72 - 85) * t}, ${247 + (153 - 247) * t}, 0.85)`;
      }
    });

    return {
      labels: allDates,
      datasets: [
        {
          label: 'Study Hours',
          data: allHours,
          backgroundColor: colors,
          borderRadius: 6,
          borderSkipped: false,
          hoverBackgroundColor: colors.map(c => c.replace('0.85', '1')),
        },
      ],
    };
  }, [metrics.hoursByDate]);

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

  const histogramOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: 'rgb(107, 114, 128)',
        },
      },
      tooltip: {
        callbacks: {
          title: (items) => {
            const date = items[0].label;
            return new Date(date).toLocaleDateString('en-US', { 
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            });
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { 
          color: 'rgb(107, 114, 128)',
          maxRotation: 45,
          minRotation: 45,
          autoSkip: true,
          maxTicksLimit: dailyStudyChartData.labels.length > 100 ? 20 : 30,
          callback: function(value, index) {
            const date = this.getLabelForValue(value);
            const totalLabels = dailyStudyChartData.labels.length;
            
            // For very large datasets, show only select dates
            if (totalLabels > 365) {
              // Show first of each month
              const d = new Date(date);
              return d.getDate() === 1 ? d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) : '';
            } else if (totalLabels > 90) {
              // Show every week
              return index % 7 === 0 ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
            } else if (totalLabels > 30) {
              // Show every 3 days
              return index % 3 === 0 ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
            }
            // Show all for small datasets
            return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          }
        },
        grid: { color: 'rgba(107, 114, 128, 0.1)' },
      },
      y: {
        ticks: { color: 'rgb(107, 114, 128)' },
        grid: { color: 'rgba(107, 114, 128, 0.1)' },
        beginAtZero: true,
      },
    },
    animation: {
      duration: 750,
      easing: 'easeInOutQuart',
    },
    interaction: {
      mode: 'index',
      intersect: false,
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
        <div className="relative" style={{ overflowX: dailyStudyChartData.labels.length > 90 ? 'auto' : 'hidden', overflowY: 'hidden' }}>
          <div style={{ minWidth: dailyStudyChartData.labels.length > 90 ? `${dailyStudyChartData.labels.length * 12}px` : '100%', height: '400px' }}>
            <Bar data={dailyStudyChartData} options={histogramOptions} />
          </div>
        </div>
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
