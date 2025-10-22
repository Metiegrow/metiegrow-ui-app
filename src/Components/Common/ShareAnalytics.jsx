/**
 * Share Analytics Service
 * Tracks and analyzes sharing behavior and performance
 */

class ShareAnalytics {
  constructor() {
    this.storageKey = 'shareAnalytics';
    this.initializeData();
  }

  // Initialize analytics data structure
  initializeData() {
    if (!localStorage.getItem(this.storageKey)) {
      const initialData = {
        totalShares: 0,
        successfulShares: 0,
        failedShares: 0,
        platformStats: {},
        contentTypeStats: {},
        dailyStats: {},
        shareHistory: [],
        userEngagement: {
          averageSharesPerSession: 0,
          mostSharedContentType: null,
          preferredPlatform: null,
          peakSharingHours: [],
        },
      };
      localStorage.setItem(this.storageKey, JSON.stringify(initialData));
    }
  }

  // Get current analytics data
  getData() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey));
    } catch (error) {
      console.error('Error reading analytics data:', error);
      this.initializeData();
      return this.getData();
    }
  }

  // Save analytics data
  saveData(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving analytics data:', error);
    }
  }

  // Track a share event
  trackShare(platform, contentType, success = true, metadata = {}) {
    const data = this.getData();
    const timestamp = Date.now();
    const dateKey = new Date(timestamp).toISOString().split('T')[0];

    // Update totals
    data.totalShares += 1;
    if (success) {
      data.successfulShares += 1;
    } else {
      data.failedShares += 1;
    }

    // Update platform stats
    if (!data.platformStats[platform]) {
      data.platformStats[platform] = { count: 0, success: 0, fail: 0 };
    }
    data.platformStats[platform].count += 1;
    if (success) {
      data.platformStats[platform].success += 1;
    } else {
      data.platformStats[platform].fail += 1;
    }

    // Update content type stats
    if (!data.contentTypeStats[contentType]) {
      data.contentTypeStats[contentType] = { count: 0, platforms: {} };
    }
    data.contentTypeStats[contentType].count += 1;
    if (!data.contentTypeStats[contentType].platforms[platform]) {
      data.contentTypeStats[contentType].platforms[platform] = 0;
    }
    data.contentTypeStats[contentType].platforms[platform] += 1;

    // Update daily stats
    if (!data.dailyStats[dateKey]) {
      data.dailyStats[dateKey] = { total: 0, successful: 0, platforms: {} };
    }
    data.dailyStats[dateKey].total += 1;
    if (success) {
      data.dailyStats[dateKey].successful += 1;
    }
    if (!data.dailyStats[dateKey].platforms[platform]) {
      data.dailyStats[dateKey].platforms[platform] = 0;
    }
    data.dailyStats[dateKey].platforms[platform] += 1;

    // Add to history (keep last 100 entries)
    const shareEvent = {
      id: `share_${timestamp}_${Math.random().toString(36).substr(2, 9)}`,
      platform,
      contentType,
      success,
      timestamp,
      metadata,
    };
    data.shareHistory.unshift(shareEvent);
    data.shareHistory = data.shareHistory.slice(0, 100);

    // Update user engagement metrics
    this.updateEngagementMetrics(data);

    this.saveData(data);

    return shareEvent;
  }

  // Update user engagement metrics
  updateEngagementMetrics(data) {
    const { shareHistory, platformStats, contentTypeStats } = data;

    // Calculate average shares per session (simplified)
    const sessions = this.groupSharesBySession(shareHistory);
    data.userEngagement.averageSharesPerSession =
      sessions.length > 0 ? shareHistory.length / sessions.length : 0;

    // Find most shared content type
    let maxContentType = null;
    let maxCount = 0;
    Object.entries(contentTypeStats).forEach(([type, stats]) => {
      if (stats.count > maxCount) {
        maxCount = stats.count;
        maxContentType = type;
      }
    });
    data.userEngagement.mostSharedContentType = maxContentType;

    // Find preferred platform
    let preferredPlatform = null;
    let maxPlatformCount = 0;
    Object.entries(platformStats).forEach(([platform, stats]) => {
      if (stats.count > maxPlatformCount) {
        maxPlatformCount = stats.count;
        preferredPlatform = platform;
      }
    });
    data.userEngagement.preferredPlatform = preferredPlatform;

    // Calculate peak sharing hours
    const hourCounts = {};
    shareHistory.forEach((share) => {
      const hour = new Date(share.timestamp).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    const peakHours = Object.entries(hourCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([hour]) => parseInt(hour));

    data.userEngagement.peakSharingHours = peakHours;
  }

  // Group shares by session (simplified: shares within 30 minutes)
  groupSharesBySession(history) {
    if (history.length === 0) return [];

    const sessions = [];
    let currentSession = [history[0]];

    for (let i = 1; i < history.length; i++) {
      const timeDiff = history[i - 1].timestamp - history[i].timestamp;
      if (timeDiff < 30 * 60 * 1000) {
        // 30 minutes
        currentSession.push(history[i]);
      } else {
        sessions.push(currentSession);
        currentSession = [history[i]];
      }
    }

    if (currentSession.length > 0) {
      sessions.push(currentSession);
    }

    return sessions;
  }

  // Get share statistics
  getStats(timeframe = 'all') {
    const data = this.getData();
    const now = Date.now();

    let filteredHistory = data.shareHistory;

    // Filter by timeframe
    if (timeframe !== 'all') {
      const timeframeMs = {
        '24h': 24 * 60 * 60 * 1000,
        '7d': 7 * 24 * 60 * 60 * 1000,
        '30d': 30 * 24 * 60 * 60 * 1000,
      }[timeframe];

      if (timeframeMs) {
        filteredHistory = data.shareHistory.filter((share) => now - share.timestamp <= timeframeMs);
      }
    }

    // Calculate stats from filtered history
    const stats = {
      totalShares: filteredHistory.length,
      successfulShares: filteredHistory.filter((s) => s.success).length,
      failedShares: filteredHistory.filter((s) => !s.success).length,
      successRate:
        filteredHistory.length > 0
          ? (filteredHistory.filter((s) => s.success).length / filteredHistory.length) * 100
          : 0,
      platformBreakdown: {},
      contentTypeBreakdown: {},
      hourlyDistribution: {},
      recentActivity: filteredHistory.slice(0, 10),
    };

    // Platform breakdown
    filteredHistory.forEach((share) => {
      stats.platformBreakdown[share.platform] = (stats.platformBreakdown[share.platform] || 0) + 1;
    });

    // Content type breakdown
    filteredHistory.forEach((share) => {
      stats.contentTypeBreakdown[share.contentType] =
        (stats.contentTypeBreakdown[share.contentType] || 0) + 1;
    });

    // Hourly distribution
    filteredHistory.forEach((share) => {
      const hour = new Date(share.timestamp).getHours();
      stats.hourlyDistribution[hour] = (stats.hourlyDistribution[hour] || 0) + 1;
    });

    return stats;
  }

  // Get performance insights
  getInsights() {
    const data = this.getData();
    const insights = [];

    // Success rate insight
    const successRate = data.totalShares > 0 ? (data.successfulShares / data.totalShares) * 100 : 0;

    if (successRate < 70) {
      insights.push({
        type: 'warning',
        title: 'Low Success Rate',
        message: `Your sharing success rate is ${successRate.toFixed(1)}%. Try using different platforms or check your connections.`,
        action: 'View Platform Stats',
      });
    } else if (successRate > 90) {
      insights.push({
        type: 'success',
        title: 'Excellent Performance!',
        message: `Your sharing success rate is ${successRate.toFixed(1)}%. Keep up the great work!`,
        action: null,
      });
    }

    // Platform preference insight
    const preferredPlatform = data.userEngagement.preferredPlatform;
    if (preferredPlatform) {
      const platformStats = data.platformStats[preferredPlatform];
      const successRate =
        platformStats.count > 0 ? (platformStats.success / platformStats.count) * 100 : 0;

      insights.push({
        type: 'info',
        title: 'Platform Preference',
        message: `${preferredPlatform} is your favorite platform with ${successRate.toFixed(1)}% success rate.`,
        action: 'Explore Other Platforms',
      });
    }

    // Peak hours insight
    const peakHours = data.userEngagement.peakSharingHours;
    if (peakHours.length > 0) {
      const hourLabels = peakHours.map((hour) => {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        return `${displayHour} ${period}`;
      });

      insights.push({
        type: 'info',
        title: 'Peak Sharing Times',
        message: `You share most actively at: ${hourLabels.join(', ')}`,
        action: 'Schedule Shares',
      });
    }

    // Content type insight
    const mostSharedType = data.userEngagement.mostSharedContentType;
    if (mostSharedType) {
      const typeStats = data.contentTypeStats[mostSharedType];
      insights.push({
        type: 'info',
        title: 'Content Preference',
        message: `You share ${mostSharedType} content most often (${typeStats.count} times).`,
        action: 'View Content Stats',
      });
    }

    return insights;
  }

  // Export analytics data
  exportData() {
    const data = this.getData();
    const exportData = {
      ...data,
      exportDate: new Date().toISOString(),
      version: '1.0',
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `share-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Clear all analytics data
  clearData() {
    localStorage.removeItem(this.storageKey);
    this.initializeData();
  }

  // Get formatted stats for UI display
  getFormattedStats(timeframe = 'all') {
    const stats = this.getStats(timeframe);
    const data = this.getData();

    return {
      overview: {
        totalShares: stats.totalShares || 0,
        successRate: stats.successRate ? `${stats.successRate.toFixed(1)}%` : '0%',
        mostUsedPlatform: data.userEngagement?.preferredPlatform || 'N/A',
        mostSharedContent: data.userEngagement?.mostSharedContentType || 'N/A',
        averagePerSession: data.userEngagement?.averageSharesPerSession?.toFixed(1) || '0',
      },
      platformStats: Object.entries(stats.platformBreakdown || {}).map(([platform, count]) => ({
        platform,
        count,
        percentage: stats.totalShares > 0 ? ((count / stats.totalShares) * 100).toFixed(1) : 0,
      })),
      contentStats: Object.entries(stats.contentTypeBreakdown || {}).map(([type, count]) => ({
        type,
        count,
        percentage: stats.totalShares > 0 ? ((count / stats.totalShares) * 100).toFixed(1) : 0,
      })),
      insights: this.getInsights(),
      recentShares: stats.recentActivity,
    };
  }
}

// Create singleton instance
const shareAnalytics = new ShareAnalytics();

export default shareAnalytics;
