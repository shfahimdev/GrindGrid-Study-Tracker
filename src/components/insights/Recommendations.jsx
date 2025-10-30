import React from 'react';
import { Lightbulb, TrendingUp, AlertCircle, Clock, Heart } from 'lucide-react';

const Recommendations = ({ metrics, entries }) => {
  const recommendations = [];

  // Burnout warning
  if (metrics.burnoutRisk === 'High') {
    recommendations.push({
      type: 'warning',
      icon: AlertCircle,
      title: 'Burnout Risk Detected',
      message:
        'Your recent focus levels are declining despite long hours. Consider taking regular breaks and ensuring proper rest.',
      priority: 'high',
    });
  }

  // Study balance
  if (parseFloat(metrics.balanceScore) < 60) {
    recommendations.push({
      type: 'info',
      icon: TrendingUp,
      title: 'Improve Study Balance',
      message: `Your study balance score is ${metrics.balanceScore}%. Try distributing time more evenly across subjects to avoid neglecting any area.`,
      priority: 'medium',
    });
  }

  // Best time recommendation
  if (metrics.mostProductiveTime) {
    recommendations.push({
      type: 'success',
      icon: Clock,
      title: 'Optimal Study Time',
      message: `You're most productive during ${metrics.mostProductiveTime}. Schedule your most challenging topics during this time.`,
      priority: 'low',
    });
  }

  // Environment recommendation
  if (metrics.bestEnvironment) {
    recommendations.push({
      type: 'success',
      icon: Heart,
      title: 'Best Study Environment',
      message: `${metrics.bestEnvironment.split('(')[0].trim()} yields your best focus. Try to study there more often for difficult topics.`,
      priority: 'low',
    });
  }

  // Session length recommendation
  const avgSession = parseFloat(metrics.avgSessionLength);
  if (avgSession < 1) {
    recommendations.push({
      type: 'info',
      icon: Clock,
      title: 'Increase Session Length',
      message: `Your average session is ${metrics.avgSessionLength}h. Consider longer sessions (1.5-2h) with breaks for deeper focus.`,
      priority: 'medium',
    });
  } else if (avgSession > 4) {
    recommendations.push({
      type: 'warning',
      icon: Clock,
      title: 'Session Length Too Long',
      message: `Your average session is ${metrics.avgSessionLength}h. Very long sessions may reduce focus. Consider breaking them into smaller chunks.`,
      priority: 'medium',
    });
  }

  // Weak subject recommendation
  if (metrics.weakAreas.length > 0) {
    const weakest = metrics.weakAreas[0];
    recommendations.push({
      type: 'warning',
      icon: AlertCircle,
      title: 'Focus on Weak Topics',
      message: `"${weakest.topic}" needs attention (Focus: ${weakest.focus}/5). Try active recall, teaching others, or practice problems.`,
      priority: 'high',
    });
  }

  // Streak encouragement
  if (metrics.currentStreak === 0 && entries.length > 5) {
    recommendations.push({
      type: 'info',
      icon: TrendingUp,
      title: 'Build a Streak',
      message:
        "You don't have an active streak. Consistent daily study, even for 30 minutes, builds momentum and improves retention.",
      priority: 'medium',
    });
  }

  // Goal completion
  if (parseFloat(metrics.goalCompletionRate) < 50) {
    recommendations.push({
      type: 'info',
      icon: Lightbulb,
      title: 'Improve Goal Achievement',
      message: `Goal completion is at ${metrics.goalCompletionRate}%. Set realistic, specific goals or increase accountability.`,
      priority: 'medium',
    });
  }

  // Sort recommendations by priority
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  const colors = {
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Smart Recommendations
        </h2>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, idx) => {
          const Icon = rec.icon;
          return (
            <div key={idx} className={`p-4 rounded-lg border ${colors[rec.type]}`}>
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-semibold mb-1">{rec.title}</div>
                  <div className="text-sm">{rec.message}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recommendations;

