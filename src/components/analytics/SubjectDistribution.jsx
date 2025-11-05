import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const SubjectDistribution = ({ hoursBySubject }) => {
  // 1. Calculate total ONCE
  const totalHours = Object.values(hoursBySubject || {}).reduce((sum, hours) => sum + hours, 0);

  // 2. Map data and store percent as a 0-1 fraction (e.g., 0.25)
  // This is more efficient and what recharts expects.
  const data = Object.entries(hoursBySubject || {}).map(([subject, hours]) => {
    const value = parseFloat(hours.toFixed(2));
    return {
      name: subject,
      value: value,
      percent: totalHours > 0 ? (value / totalHours) : 0 // Store as fraction
    };
  });

  const COLORS = [
    '#FF6B9D', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#FF6384', '#4BC0D9', '#FFCD56', '#36A2E5'
  ];

  // 3. Updated Tooltip to format the 'percent' fraction
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {data.name}
          </p>
          <p className="text-sm font-semibold" style={{ color: payload[0].fill }}>
            {data.value} hours
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {/* Format the fraction to a percentage string here */}
            ({(data.percent * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  // 4. Fixed CustomLabel to properly center text
  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    // Hide label if the slice is too small (e.g., less than 5%)
    if (percent < 0.05) return null;

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle" // Changed this from conditional to "middle"
        dominantBaseline="central"
        className="text-sm font-semibold pointer-events-none"
      >
        {/* 'percent' is already a 0-1 fraction from <Pie> */}
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (!data.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Study Time by Subject
        </h2>
        {/* 5. Increased empty state height to match new chart height */}
        <div className="flex items-center justify-center py-12" style={{ height: '400px' }}>
          <p className="text-gray-500 dark:text-gray-400">No data available</p>
        </div>
      </div>
    );
  }

  // NOTE: We don't need 'dataWithPercent' anymore, we just use 'data'
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Study Time by Subject
      </h2>
      {/* 5. Increased container height for a "bigger" chart */}
      <div className="w-full" style={{ height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data} // Use the new 'data' array
              cx="50%"
              cy="50%"
              labelLine={false}
              label={<CustomLabel />}
              dataKey="value"
              // 6. "Bigger" & "Cooler" UI changes:
              innerRadius="50%"  // This makes it a "donut" chart
              outerRadius="85%"  // Use percentage for responsive size
              paddingAngle={5}   // Adds spacing between slices
              cornerRadius={8}   // Rounds the corners of slices
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{ fontSize: '14px' }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubjectDistribution;
