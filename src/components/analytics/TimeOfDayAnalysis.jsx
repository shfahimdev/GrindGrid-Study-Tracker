import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const TimeOfDayAnalysis = ({ hoursByTimeOfDay }) => {
  const timeSlots = [
    { key: 'morning', label: 'Morning', icon: '🌅', color: '#FCD34D' },
    { key: 'afternoon', label: 'Afternoon', icon: '☀️', color: '#3B82F6' },
    { key: 'evening', label: 'Evening', icon: '🌆', color: '#A855F7' },
    { key: 'night', label: 'Night', icon: '🌙', color: '#1E293B' }
  ];

  const data = timeSlots.map(slot => ({
    time: slot.label,
    icon: slot.icon,
    hours: parseFloat(((hoursByTimeOfDay && hoursByTimeOfDay[slot.key]) || 0).toFixed(2)),
    color: slot.color
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {payload[0].payload.icon} {payload[0].payload.time}
          </p>
          <p className="text-sm font-semibold" style={{ color: payload[0].payload.color }}>
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

  const CustomXAxisTick = ({ x, y, payload }) => {
    const item = data.find(d => d.time === payload.value);
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="middle"
          fill="rgb(107, 114, 128)"
          className="text-sm"
        >
          {item?.icon}
        </text>
        <text
          x={0}
          y={0}
          dy={32}
          textAnchor="middle"
          fill="rgb(107, 114, 128)"
          className="text-xs"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  const totalHours = data.reduce((sum, d) => sum + d.hours, 0);

  if (totalHours === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Study by Time of Day
        </h2>
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Study by Time of Day
      </h2>
      <div className="w-full" style={{ height: '350px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 114, 128, 0.1)" />
            <XAxis
              dataKey="time"
              tick={<CustomXAxisTick />}
              height={60}
            />
            <YAxis
              tick={{ fill: 'rgb(107, 114, 128)' }}
              label={{ value: 'Hours', angle: -90, position: 'insideLeft', fill: 'rgb(107, 114, 128)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="hours"
              radius={[8, 8, 0, 0]}
              maxBarSize={80}
              label={<CustomLabel />}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimeOfDayAnalysis;
