import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const DailyStudyTrend = ({ hoursByDate, hasFilters }) => {
  const chartData = useMemo(() => {
    const dates = Object.keys(hoursByDate || {}).sort();
    if (dates.length === 0) return [];

    const dateObjs = dates.map(d => new Date(d));
    const minDate = new Date(Math.min(...dateObjs));
    const maxDate = new Date(Math.max(...dateObjs));

    // If no filters, default to last 30 days
    let startDate = minDate;
    if (!hasFilters) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      startDate = new Date(Math.max(minDate, thirtyDaysAgo));
    }

    // Fill all dates in range
    const data = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= maxDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      data.push({
        date: dateStr,
        hours: hoursByDate[dateStr] || 0
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return data;
  }, [hoursByDate, hasFilters]);

  // Generate gradient colors based on index
  const getGradientColor = (index, total) => {
    const ratio = index / Math.max(total - 1, 1);
    if (ratio < 0.33) {
      const t = ratio / 0.33;
      const r = Math.round(139 + (99 - 139) * t);
      const g = Math.round(92 + (102 - 92) * t);
      const b = Math.round(246 + (241 - 246) * t);
      return `rgb(${r}, ${g}, ${b})`;
    } else if (ratio < 0.66) {
      const t = (ratio - 0.33) / 0.33;
      const r = Math.round(99 + (59 - 99) * t);
      const g = Math.round(102 + (130 - 102) * t);
      const b = Math.round(241 + (246 - 241) * t);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      const t = (ratio - 0.66) / 0.34;
      const r = Math.round(59 + (168 - 59) * t);
      const g = Math.round(130 + (85 - 130) * t);
      const b = Math.round(246 + (247 - 246) * t);
      return `rgb(${r}, ${g}, ${b})`;
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const date = new Date(payload[0].payload.date);
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
          <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">
            {payload[0].value.toFixed(2)} hours
          </p>
        </div>
      );
    }
    return null;
  };

  const formatXAxis = (dateStr) => {
    const date = new Date(dateStr);
    const totalDays = chartData.length;
    
    if (totalDays > 365) {
      return date.getDate() === 1 ? date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) : '';
    } else if (totalDays > 90) {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else if (totalDays > 30) {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Determine bar size based on data points
  const getBarSize = () => {
    const totalDays = chartData.length;
    if (totalDays <= 7) return 50;
    if (totalDays <= 15) return 35;
    if (totalDays <= 30) return 20;
    if (totalDays <= 90) return 12;
    if (totalDays <= 180) return 8;
    return 4;
  };

  if (!chartData.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Daily Study Time Trend
        </h2>
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Daily Study Time Trend
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {chartData.length} {chartData.length === 1 ? 'day' : 'days'}
        </span>
      </div>
      <div className="w-full" style={{ height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 114, 128, 0.1)" />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fill: 'rgb(107, 114, 128)', fontSize: 12 }}
              interval={chartData.length > 90 ? Math.floor(chartData.length / 20) : chartData.length > 30 ? 2 : 0}
            />
            <YAxis
              tick={{ fill: 'rgb(107, 114, 128)' }}
              label={{ value: 'Hours', angle: -90, position: 'insideLeft', fill: 'rgb(107, 114, 128)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="hours"
              radius={[8, 8, 0, 0]}
              maxBarSize={getBarSize()}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getGradientColor(index, chartData.length)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyStudyTrend;

