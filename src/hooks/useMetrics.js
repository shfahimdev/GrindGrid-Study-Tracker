// src/hooks/useMetrics.js
import { useMemo } from 'react';

export const useMetrics = (entries) => {
  return useMemo(() => {
    if (!entries.length) return null;

    const totalHours = entries.reduce((sum, e) => sum + e.duration, 0);
    
    // Hours by categories
    const hoursBySubject = {};
    const hoursByChapter = {};
    const hoursByTopic = {};
    const hoursByDate = {};
    const hoursByStudyType = {};
    const hoursByEnvironment = {};
    const hoursByDayOfWeek = {};
    const hoursByTimeOfDay = { morning: 0, afternoon: 0, evening: 0, night: 0 };
    
    // Focus metrics
    const focusBySubject = {};
    const focusByChapter = {};
    const focusByTopic = {};
    const focusByTimeOfDay = { morning: [], afternoon: [], evening: [], night: [] };
    const focusByEnvironment = {};
    const focusCountBySubject = {};
    const focusCountByChapter = {};
    const focusCountByTopic = {};
    const focusCountByEnvironment = {};
    
    // Mood metrics
    const moodData = [];
    const moodByDate = {};
    
    // Difficulty metrics
    const difficultyBySubject = {};
    const difficultyCountBySubject = {};
    
    // Goals
    let goalsAchieved = 0;
    const goalsBySubject = {};
    const goalsCountBySubject = {};
    
    // Session lengths
    const sessionLengths = [];
    
    // Process each entry
    entries.forEach(e => {
      // Hours aggregation
      hoursBySubject[e.subject] = (hoursBySubject[e.subject] || 0) + e.duration;
      hoursByChapter[e.chapter] = (hoursByChapter[e.chapter] || 0) + e.duration;
      hoursByTopic[e.topic] = (hoursByTopic[e.topic] || 0) + e.duration;
      hoursByDate[e.date] = (hoursByDate[e.date] || 0) + e.duration;
      hoursByStudyType[e.studyType] = (hoursByStudyType[e.studyType] || 0) + e.duration;
      hoursByEnvironment[e.environment] = (hoursByEnvironment[e.environment] || 0) + e.duration;
      
      // Day of week
      const dayOfWeek = new Date(e.date).toLocaleDateString('en-US', { weekday: 'long' });
      hoursByDayOfWeek[dayOfWeek] = (hoursByDayOfWeek[dayOfWeek] || 0) + e.duration;
      
      // Time of day
      const hour = parseInt(e.startTime.split(':')[0]);
      let timeOfDay;
      if (hour >= 5 && hour < 12) timeOfDay = 'morning';
      else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
      else if (hour >= 17 && hour < 21) timeOfDay = 'evening';
      else timeOfDay = 'night';
      hoursByTimeOfDay[timeOfDay] += e.duration;
      focusByTimeOfDay[timeOfDay].push(e.focus);
      
      // Focus aggregation
      focusBySubject[e.subject] = (focusBySubject[e.subject] || 0) + e.focus;
      focusCountBySubject[e.subject] = (focusCountBySubject[e.subject] || 0) + 1;
      
      focusByChapter[e.chapter] = (focusByChapter[e.chapter] || 0) + e.focus;
      focusCountByChapter[e.chapter] = (focusCountByChapter[e.chapter] || 0) + 1;
      
      focusByTopic[e.topic] = (focusByTopic[e.topic] || 0) + e.focus;
      focusCountByTopic[e.topic] = (focusCountByTopic[e.topic] || 0) + 1;
      
      focusByEnvironment[e.environment] = (focusByEnvironment[e.environment] || 0) + e.focus;
      focusCountByEnvironment[e.environment] = (focusCountByEnvironment[e.environment] || 0) + 1;
      
      // Mood
      moodData.push(e.mood);
      moodByDate[e.date] = (moodByDate[e.date] || []);
      moodByDate[e.date].push(e.mood);
      
      // Difficulty
      difficultyBySubject[e.subject] = (difficultyBySubject[e.subject] || 0) + e.difficulty;
      difficultyCountBySubject[e.subject] = (difficultyCountBySubject[e.subject] || 0) + 1;
      
      // Goals
      if (e.goalAchieved) {
        goalsAchieved++;
        goalsBySubject[e.subject] = (goalsBySubject[e.subject] || 0) + 1;
      }
      goalsCountBySubject[e.subject] = (goalsCountBySubject[e.subject] || 0) + 1;
      
      // Session lengths
      sessionLengths.push(e.duration);
    });
    
    // Calculate averages
    const avgFocusBySubject = {};
    Object.keys(focusBySubject).forEach(s => {
      avgFocusBySubject[s] = (focusBySubject[s] / focusCountBySubject[s]).toFixed(2);
    });
    
    const avgFocusByChapter = {};
    Object.keys(focusByChapter).forEach(c => {
      avgFocusByChapter[c] = (focusByChapter[c] / focusCountByChapter[c]).toFixed(2);
    });
    
    const avgFocusByTopic = {};
    Object.keys(focusByTopic).forEach(t => {
      avgFocusByTopic[t] = (focusByTopic[t] / focusCountByTopic[t]).toFixed(2);
    });
    
    const avgFocusByEnvironment = {};
    Object.keys(focusByEnvironment).forEach(env => {
      avgFocusByEnvironment[env] = (focusByEnvironment[env] / focusCountByEnvironment[env]).toFixed(2);
    });
    
    const avgFocusByTimeOfDay = {};
    Object.keys(focusByTimeOfDay).forEach(time => {
      const arr = focusByTimeOfDay[time];
      avgFocusByTimeOfDay[time] = arr.length > 0 ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2) : 0;
    });
    
    const avgDifficultyBySubject = {};
    Object.keys(difficultyBySubject).forEach(s => {
      avgDifficultyBySubject[s] = (difficultyBySubject[s] / difficultyCountBySubject[s]).toFixed(2);
    });
    
    const avgMood = (moodData.reduce((a, b) => a + b, 0) / moodData.length).toFixed(2);
    const avgFocus = (entries.reduce((sum, e) => sum + e.focus, 0) / entries.length).toFixed(2);
    const avgDifficulty = (entries.reduce((sum, e) => sum + e.difficulty, 0) / entries.length).toFixed(2);
    const avgSessionLength = (sessionLengths.reduce((a, b) => a + b, 0) / sessionLengths.length).toFixed(2);
    const maxSessionLength = Math.max(...sessionLengths).toFixed(2);
    const minSessionLength = Math.min(...sessionLengths).toFixed(2);
    
    // Goal completion rate
    const goalCompletionRate = ((goalsAchieved / entries.length) * 100).toFixed(1);
    
    const goalRateBySubject = {};
    Object.keys(goalsBySubject).forEach(s => {
      goalRateBySubject[s] = ((goalsBySubject[s] / goalsCountBySubject[s]) * 100).toFixed(1);
    });
    
    // Best study day
    const bestStudyDay = Object.entries(hoursByDate).sort((a, b) => b[1] - a[1])[0];
    const bestStudyDayText = bestStudyDay ? `${bestStudyDay[0]} (${bestStudyDay[1].toFixed(2)}h)` : 'N/A';
    
    // Most productive time
    const mostProductiveTime = Object.entries(hoursByTimeOfDay).sort((a, b) => b[1] - a[1])[0];
    const mostProductiveTimeText = mostProductiveTime ? mostProductiveTime[0] : 'N/A';
    
    // Best environment
    const bestEnvironment = Object.entries(avgFocusByEnvironment).sort((a, b) => b[1] - a[1])[0];
    const bestEnvironmentText = bestEnvironment ? `${bestEnvironment[0]} (Focus: ${bestEnvironment[1]})` : 'N/A';
    
    // Streak calculation
    const sortedDates = [...new Set(entries.map(e => e.date))].sort();
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 1;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    if (sortedDates.includes(today) || sortedDates.includes(yesterday)) {
      for (let i = sortedDates.length - 1; i > 0; i--) {
        const current = new Date(sortedDates[i]);
        const prev = new Date(sortedDates[i - 1]);
        const diffDays = (current - prev) / (1000 * 60 * 60 * 24);
        
        if (diffDays === 1) {
          tempStreak++;
        } else {
          break;
        }
      }
      currentStreak = tempStreak;
    }
    
    // Calculate longest streak
    tempStreak = 1;
    for (let i = 1; i < sortedDates.length; i++) {
      const current = new Date(sortedDates[i]);
      const prev = new Date(sortedDates[i - 1]);
      const diffDays = (current - prev) / (1000 * 60 * 60 * 24);
      
      if (diffDays === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);
    
    // Level system
    const level = Math.floor(totalHours / 5) + 1;
    const nextLevelHours = (level * 5) - totalHours;
    
    // Weak areas (low focus)
    const weakAreas = Object.keys(avgFocusByTopic)
      .map(topic => ({
        topic,
        focus: parseFloat(avgFocusByTopic[topic]),
        hours: hoursByTopic[topic]
      }))
      .filter(item => item.focus < 3)
      .sort((a, b) => a.focus - b.focus)
      .slice(0, 5);
    
    // Strong areas (high focus)
    const strongAreas = Object.keys(avgFocusByTopic)
      .map(topic => ({
        topic,
        focus: parseFloat(avgFocusByTopic[topic]),
        hours: hoursByTopic[topic]
      }))
      .filter(item => item.focus >= 4)
      .sort((a, b) => b.focus - a.focus)
      .slice(0, 5);
    
    // Study balance (coefficient of variation)
    const subjectHours = Object.values(hoursBySubject);
    const meanHours = subjectHours.reduce((a, b) => a + b, 0) / subjectHours.length;
    const variance = subjectHours.reduce((sum, h) => sum + Math.pow(h - meanHours, 2), 0) / subjectHours.length;
    const stdDev = Math.sqrt(variance);
    const balanceScore = ((1 - (stdDev / meanHours)) * 100).toFixed(1);
    
    // Productivity score
    const productivityScore = entries.reduce((sum, e) => {
      return sum + (e.duration * e.focus * (e.goalAchieved ? 1.5 : 1));
    }, 0).toFixed(2);
    
    // Mood vs Focus correlation
    const moodFocusPairs = entries.map(e => ({ mood: e.mood, focus: e.focus }));
    const avgMoodVal = parseFloat(avgMood);
    const avgFocusVal = parseFloat(avgFocus);
    const correlation = moodFocusPairs.reduce((sum, pair) => {
      return sum + ((pair.mood - avgMoodVal) * (pair.focus - avgFocusVal));
    }, 0) / entries.length;
    const moodFocusCorrelation = (correlation / (Math.sqrt(variance) * Math.sqrt(variance))).toFixed(2);
    
    // Week patterns
    const thisWeekStart = new Date();
    thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
    const thisWeekStartStr = thisWeekStart.toISOString().split('T')[0];
    
    const lastWeekStart = new Date(thisWeekStart);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    const lastWeekStartStr = lastWeekStart.toISOString().split('T')[0];
    
    const thisWeekHours = entries.filter(e => e.date >= thisWeekStartStr).reduce((sum, e) => sum + e.duration, 0);
    const lastWeekHours = entries.filter(e => e.date >= lastWeekStartStr && e.date < thisWeekStartStr).reduce((sum, e) => sum + e.duration, 0);
    const weekOverWeekChange = lastWeekHours > 0 ? (((thisWeekHours - lastWeekHours) / lastWeekHours) * 100).toFixed(1) : 0;
    
    // Burnout risk
    const recentEntries = entries.slice(-7);
    const recentAvgFocus = recentEntries.length > 0 ? (recentEntries.reduce((sum, e) => sum + e.focus, 0) / recentEntries.length) : 5;
    const recentHours = recentEntries.reduce((sum, e) => sum + e.duration, 0);
    const burnoutRisk = recentHours > 40 && recentAvgFocus < 3 ? 'High' : recentAvgFocus < 2.5 ? 'Medium' : 'Low';
    
    return {
      totalHours: totalHours.toFixed(2),
      hoursBySubject,
      hoursByChapter,
      hoursByTopic,
      hoursByDate,
      hoursByStudyType,
      hoursByEnvironment,
      hoursByDayOfWeek,
      hoursByTimeOfDay,
      avgFocusBySubject,
      avgFocusByChapter,
      avgFocusByTopic,
      avgFocusByEnvironment,
      avgFocusByTimeOfDay,
      avgDifficultyBySubject,
      avgMood,
      avgFocus,
      avgDifficulty,
      avgSessionLength,
      maxSessionLength,
      minSessionLength,
      goalCompletionRate,
      goalRateBySubject,
      bestStudyDay: bestStudyDayText,
      mostProductiveTime: mostProductiveTimeText,
      bestEnvironment: bestEnvironmentText,
      currentStreak,
      longestStreak,
      level,
      nextLevelHours: nextLevelHours.toFixed(2),
      weakAreas,
      strongAreas,
      balanceScore,
      productivityScore,
      moodFocusCorrelation,
      thisWeekHours: thisWeekHours.toFixed(2),
      lastWeekHours: lastWeekHours.toFixed(2),
      weekOverWeekChange,
      burnoutRisk,
      totalSessions: entries.length,
      uniqueSubjects: Object.keys(hoursBySubject).length,
      uniqueChapters: Object.keys(hoursByChapter).length,
      uniqueTopics: Object.keys(hoursByTopic).length,
      studyDays: sortedDates.length
    };
  }, [entries]);
};

