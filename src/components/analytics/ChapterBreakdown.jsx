import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ChapterBreakdown = ({ hoursByChapter }) => {
  const data = Object.entries(hoursByChapter || {})
    .map(([chapter, hours]) => ({
      name: chapter,
      hours: parseFloat(hours.toFixed(2))
    }))
    .sort((a, b) => b.hours - a.hours);

  const getBarColor = (index, total) => {
    const colors = [
      '#10B981',
      '#14B8A6',
      '#06B6D4',
      '#0EA5E9',
      '#3B82F6',
      '#6366F1',
      '#8B5CF6',
      '#A855F7',
      '#D946EF',
      '#EC4899'
    ];
    return colors[index % colors.length];
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {payload[0].payload.name}
          </p>
          <p className="text-sm font-semibold" style={{ color: payload[0].fill }}>
            {payload[0].value} hours
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ x, y, width, value }) => {
    if (value < 0.5) return null;
    return (
      <text
        x={x + width / 2}
        y={y - 5}
        fill="rgb(107, 114, 128)"
        textAnchor="middle"
        className="text-xs font-semibold"
      >
        {value}h
      </text>
    );
  };

  if (!data.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Time by Chapter
        </h2>
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No data available</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Time by Chapter
      </h2>
      <div className="w-full" style={{ height: '350px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 114, 128, 0.1)" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fill: 'rgb(107, 114, 128)', fontSize: 12 }}
              interval={0}
            />
            <YAxis
              tick={{ fill: 'rgb(107, 114, 128)' }}
              label={{ value: 'Hours', angle: -90, position: 'insideLeft', fill: 'rgb(107, 114, 128)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="hours"
              radius={[8, 8, 0, 0]}
              label={<CustomLabel />}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(index, data.length)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChapterBreakdown;
