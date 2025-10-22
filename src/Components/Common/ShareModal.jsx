import React, { useState, useEffect } from 'react';
import {
  X,
  Copy,
  QrCode,
  BarChart3,
  MessageSquare,
  Users,
  Calendar,
  TrendingUp,
  Sparkles,
  Plus,
  Download,
  Trash2,
} from 'lucide-react';
import {
  shareToPlatform,
  shareNative,
  SHARE_PLATFORMS,
  SHARE_CONFIG,
  getAvailablePlatforms,
  generateShareContent,
} from './shareHandler';
import {
  SHARE_TEMPLATES,
  getRecommendedTemplates,
  getSmartSuggestions,
  getTrendingHashtags,
  generatePersonalizedMessage,
} from './ShareTemplates';
import shareAnalytics from './ShareAnalytics';

/**
 * Advanced Share Modal Component
 * Features:
 * - Content preview
 * - Custom message editing
 * - QR code generation
 * - Share statistics
 * - Bulk sharing
 * - Share templates
 * - Analytics tracking
 */
const ShareModal = ({
  isOpen,
  onClose,
  type = 'general',
  data = {},
  onShare = null,
  userStats = null,
}) => {
  const [customMessage, setCustomMessage] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [activeTab, setActiveTab] = useState('share');
  const [shareHistory, setShareHistory] = useState([]);
  const [isBulkSharing, setIsBulkSharing] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [hashtags, setHashtags] = useState([]);

  // Generate share content
  const shareData = generateShareContent(type, data);
  const availablePlatforms = getAvailablePlatforms();

  // Initialize custom message
  useEffect(() => {
    if (shareData.title) {
      setCustomMessage(`${shareData.title}\n\nCheck this out!`);
    }
  }, [shareData]);

  // Load share history (mock data for now)
  useEffect(() => {
    if (isOpen) {
      // In real app, this would come from API
      setShareHistory([
        { platform: 'whatsapp', timestamp: Date.now() - 3600000, success: true },
        { platform: 'facebook', timestamp: Date.now() - 7200000, success: true },
        { platform: 'twitter', timestamp: Date.now() - 86400000, success: false },
      ]);
    }
  }, [isOpen]);

  const handlePlatformSelect = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const handleShare = async (platform) => {
    const messageToShare = customMessage || shareData.title;
    const dataToShare = {
      ...shareData,
      title: messageToShare,
    };

    try {
      let result;
      if (platform === 'native' && navigator.share) {
        result = await shareNative(dataToShare);
      } else {
        result = shareToPlatform(platform, dataToShare);
      }

      // Track analytics
      shareAnalytics.trackShare(platform, type, result.success, {
        message: messageToShare,
        customMessage: !!customMessage,
        templateUsed: selectedTemplate?.id,
      });

      if (result.success && onShare) {
        onShare(platform, result, dataToShare);
      }

      // Add to history
      setShareHistory((prev) => [
        {
          platform,
          timestamp: Date.now(),
          success: result.success,
          message: messageToShare,
        },
        ...prev.slice(0, 9),
      ]); // Keep last 10

      return result;
    } catch (error) {
      console.error('Share error:', error);
      // Track failed share
      shareAnalytics.trackShare(platform, type, false, {
        error: error.message,
        message: messageToShare,
      });
      return { success: false, message: 'Failed to share' };
    }
  };

  const handleBulkShare = async () => {
    if (selectedPlatforms.length === 0) return;

    setIsBulkSharing(true);
    const results = [];

    for (const platform of selectedPlatforms) {
      const result = await handleShare(platform);
      results.push({ platform, ...result });

      // Small delay between shares
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setIsBulkSharing(false);
    setSelectedPlatforms([]);

    // Show summary
    const successCount = results.filter((r) => r.success).length;
    alert(`Shared to ${successCount}/${results.length} platforms successfully!`);
  };

  const generateQRCode = async () => {
    setIsGeneratingQR(true);
    try {
      // In real app, this would call a QR code generation service
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareData.url)}`;
      setQrCodeUrl(qrUrl);
    } catch (error) {
      console.error('QR generation error:', error);
    } finally {
      setIsGeneratingQR(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      alert('Link copied to clipboard!');
    } catch (error) {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = shareData.url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Link copied to clipboard!');
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4'>
      <div className='bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-700'>
          <h2 className='text-xl font-bold text-white'>Share Content</h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-800 rounded-full transition-colors'
          >
            <X className='w-5 h-5 text-gray-400' />
          </button>
        </div>

        {/* Tabs */}
        <div className='flex border-b border-gray-700'>
          {[
            { id: 'share', label: 'Share', icon: MessageSquare },
            { id: 'templates', label: 'Templates', icon: Sparkles },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'history', label: 'History', icon: Calendar },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors text-sm ${
                activeTab === id
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className='w-4 h-4' />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className='p-6 overflow-y-auto max-h-96'>
          {activeTab === 'share' && (
            <div className='space-y-6'>
              {/* Content Preview */}
              <div className='bg-gray-800 rounded-lg p-4'>
                <h3 className='font-semibold text-white mb-2'>Content Preview</h3>
                <div className='text-sm text-gray-300'>
                  <p className='font-medium'>{shareData.title}</p>
                  <p className='text-gray-400 mt-1'>{shareData.description}</p>
                  <p className='text-purple-400 mt-2 text-xs'>{shareData.url}</p>
                </div>
              </div>

              {/* Template Selection */}
              <div>
                <label className='block text-sm font-medium text-white mb-2'>Quick Templates</label>
                <div className='flex gap-2 overflow-x-auto pb-2'>
                  {getRecommendedTemplates(type, data).map((template) => (
                    <button
                      key={template.id}
                      onClick={() => {
                        setSelectedTemplate(template);
                        setCustomMessage(template.text);
                      }}
                      className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                        selectedTemplate?.id === template.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <span className='mr-1'>{template.emoji}</span>
                      {template.category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Message */}
              <div>
                <label className='block text-sm font-medium text-white mb-2'>Custom Message</label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder='Add a personal message...'
                  className='w-full h-24 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none'
                />
                <div className='flex justify-between items-center mt-2'>
                  <span className='text-xs text-gray-400'>
                    {customMessage.length}/280 characters
                  </span>
                  <button
                    onClick={() => setCustomMessage('')}
                    className='text-xs text-purple-400 hover:text-purple-300'
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Hashtags */}
              <div>
                <label className='block text-sm font-medium text-white mb-2'>
                  Suggested Hashtags
                </label>
                <div className='flex flex-wrap gap-2'>
                  {getTrendingHashtags(type, data).map((hashtag) => (
                    <button
                      key={hashtag}
                      onClick={() => {
                        const newMessage = customMessage
                          ? `${customMessage} ${hashtag}`
                          : `${hashtag}`;
                        setCustomMessage(newMessage);
                      }}
                      className='px-3 py-1 bg-gray-700 text-purple-300 rounded-full text-sm hover:bg-gray-600 transition-colors'
                    >
                      {hashtag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform Selection */}
              <div>
                <h3 className='font-semibold text-white mb-3'>Choose Platforms</h3>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                  {availablePlatforms
                    .map((platform) => {
                      if (platform === SHARE_PLATFORMS.COPY_LINK) return null;

                      const config = SHARE_CONFIG[platform];
                      if (!config) return null; // Skip platforms not in config

                      const isSelected = selectedPlatforms.includes(platform);

                      return (
                        <button
                          key={platform}
                          onClick={() => handlePlatformSelect(platform)}
                          className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                            isSelected
                              ? 'border-purple-500 bg-purple-500/10'
                              : 'border-gray-600 hover:border-gray-500'
                          }`}
                        >
                          <span className='text-lg'>{config.icon}</span>
                          <span className='text-sm font-medium text-white'>{config.name}</span>
                          {isSelected && (
                            <div className='ml-auto w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center'>
                              <span className='text-xs text-white'>✓</span>
                            </div>
                          )}
                        </button>
                      );
                    })
                    .filter(Boolean)}
                </div>
              </div>

              {/* Quick Actions */}
              <div className='flex gap-3'>
                <button
                  onClick={copyToClipboard}
                  className='flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors'
                >
                  <Copy className='w-4 h-4' />
                  <span className='text-sm'>Copy Link</span>
                </button>

                <button
                  onClick={generateQRCode}
                  disabled={isGeneratingQR}
                  className='flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50'
                >
                  <QrCode className='w-4 h-4' />
                  <span className='text-sm'>{isGeneratingQR ? 'Generating...' : 'QR Code'}</span>
                </button>
              </div>

              {/* QR Code Display */}
              {qrCodeUrl && (
                <div className='bg-gray-800 rounded-lg p-4 text-center'>
                  <img src={qrCodeUrl} alt='QR Code' className='mx-auto' />
                  <p className='text-sm text-gray-400 mt-2'>Scan to share</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'templates' && (
            <div className='space-y-6'>
              {/* Smart Suggestions */}
              <div>
                <h3 className='font-semibold text-white mb-3 flex items-center gap-2'>
                  <Sparkles className='w-4 h-4' />
                  Smart Suggestions
                </h3>
                <div className='space-y-2'>
                  {getSmartSuggestions(type, data).map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => setCustomMessage(suggestion.text)}
                      className='w-full text-left p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors'
                    >
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='text-lg'>{suggestion.emoji}</span>
                        <span className='text-white font-medium capitalize'>
                          {suggestion.category.replace('_', ' ')}
                        </span>
                      </div>
                      <p className='text-gray-300 text-sm'>{suggestion.text}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Template Categories */}
              <div>
                <h3 className='font-semibold text-white mb-3'>Template Categories</h3>
                <div className='grid grid-cols-2 gap-3'>
                  {Object.entries(SHARE_TEMPLATES).map(([category, templates]) => (
                    <div key={category} className='bg-gray-800 rounded-lg p-3'>
                      <h4 className='text-purple-400 font-medium capitalize mb-2'>
                        {category.replace('_', ' ')}
                      </h4>
                      <div className='space-y-1'>
                        {Object.entries(templates)
                          .slice(0, 2)
                          .map(([key, template]) => (
                            <button
                              key={key}
                              onClick={() => setCustomMessage(template)}
                              className='w-full text-left text-sm text-gray-300 hover:text-white transition-colors p-1 rounded'
                            >
                              {template}
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Create Custom Template */}
              <div>
                <h3 className='font-semibold text-white mb-3 flex items-center gap-2'>
                  <Plus className='w-4 h-4' />
                  Create Custom Template
                </h3>
                <div className='bg-gray-800 rounded-lg p-4'>
                  <textarea
                    placeholder='Create your own share template...'
                    className='w-full h-20 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none mb-3'
                  />
                  <button className='px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors'>
                    Save Template
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className='space-y-6'>
              {/* Analytics Actions */}
              <div className='flex gap-3'>
                <button
                  onClick={() => shareAnalytics.exportData()}
                  className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors'
                >
                  <Download className='w-4 h-4' />
                  Export Data
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear all analytics data?')) {
                      shareAnalytics.clearData();
                      alert('Analytics data cleared!');
                      window.location.reload();
                    }
                  }}
                  className='flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors'
                >
                  <Trash2 className='w-4 h-4' />
                  Clear Data
                </button>
              </div>

              {/* Share Statistics */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {(() => {
                  const stats = shareAnalytics.getFormattedStats('30d');
                  return (
                    <>
                      <div className='bg-gray-800 rounded-lg p-4 text-center'>
                        <div className='text-2xl font-bold text-purple-400'>
                          {stats.overview.totalShares}
                        </div>
                        <div className='text-sm text-gray-400'>Total Shares</div>
                      </div>
                      <div className='bg-gray-800 rounded-lg p-4 text-center'>
                        <div className='text-2xl font-bold text-green-400'>
                          {stats.overview.successRate}
                        </div>
                        <div className='text-sm text-gray-400'>Success Rate</div>
                      </div>
                      <div className='bg-gray-800 rounded-lg p-4 text-center'>
                        <div className='text-2xl font-bold text-blue-400'>
                          {stats.overview.averagePerSession}
                        </div>
                        <div className='text-sm text-gray-400'>Avg/Session</div>
                      </div>
                      <div className='bg-gray-800 rounded-lg p-4 text-center'>
                        <div className='text-2xl font-bold text-yellow-400'>
                          {stats.overview.mostUsedPlatform || 'N/A'}
                        </div>
                        <div className='text-sm text-gray-400'>Top Platform</div>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Platform Performance */}
              <div>
                <h3 className='font-semibold text-white mb-3'>
                  Platform Performance (Last 30 Days)
                </h3>
                <div className='space-y-3'>
                  {(() => {
                    const stats = shareAnalytics.getFormattedStats('30d');
                    return stats.platformStats
                      .map(({ platform, count, percentage }) => {
                        const config = SHARE_CONFIG[platform];
                        if (!config) return null; // Skip platforms not in config
                        return (
                          <div
                            key={platform}
                            className='flex items-center justify-between bg-gray-800 rounded-lg p-3'
                          >
                            <div className='flex items-center gap-3'>
                              <span className='text-lg'>{config.icon}</span>
                              <span className='text-white font-medium'>{config.name}</span>
                            </div>
                            <div className='text-right'>
                              <div className='text-purple-400 font-semibold'>{count}</div>
                              <div className='text-xs text-gray-400'>{percentage}% of total</div>
                            </div>
                          </div>
                        );
                      })
                      .filter(Boolean); // Remove null entries
                  })()}
                </div>
              </div>

              {/* Insights */}
              <div>
                <h3 className='font-semibold text-white mb-3'>Insights & Recommendations</h3>
                <div className='space-y-3'>
                  {(() => {
                    const insights = shareAnalytics.getInsights();
                    return insights.map((insight, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border-l-4 ${
                          insight.type === 'success'
                            ? 'border-green-500 bg-green-500/10'
                            : insight.type === 'warning'
                              ? 'border-yellow-500 bg-yellow-500/10'
                              : 'border-blue-500 bg-blue-500/10'
                        }`}
                      >
                        <h4 className='font-medium text-white'>{insight.title}</h4>
                        <p className='text-sm text-gray-300 mt-1'>{insight.message}</p>
                        {insight.action && (
                          <button className='text-xs text-purple-400 hover:text-purple-300 mt-2'>
                            {insight.action} →
                          </button>
                        )}
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className='space-y-4'>
              <h3 className='font-semibold text-white'>Recent Shares</h3>
              {shareHistory.length === 0 ? (
                <p className='text-gray-400 text-center py-8'>No share history yet</p>
              ) : (
                <div className='space-y-3'>
                  {shareHistory
                    .map((share, index) => {
                      const config = SHARE_CONFIG[share.platform];
                      if (!config) return null; // Skip platforms not in config
                      return (
                        <div
                          key={index}
                          className='flex items-center justify-between bg-gray-800 rounded-lg p-3'
                        >
                          <div className='flex items-center gap-3'>
                            <span className='text-lg'>{config.icon}</span>
                            <div>
                              <div className='text-white font-medium'>{config.name}</div>
                              <div className='text-xs text-gray-400'>
                                {new Date(share.timestamp).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              share.success ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                            }`}
                          >
                            {share.success ? 'Success' : 'Failed'}
                          </div>
                        </div>
                      );
                    })
                    .filter(Boolean)}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='flex items-center justify-between p-6 border-t border-gray-700'>
          <div className='text-sm text-gray-400'>
            {selectedPlatforms.length > 0 && (
              <span>
                {selectedPlatforms.length} platform{selectedPlatforms.length > 1 ? 's' : ''}{' '}
                selected
              </span>
            )}
          </div>

          <div className='flex gap-3'>
            <button
              onClick={onClose}
              className='px-4 py-2 text-gray-400 hover:text-white transition-colors'
            >
              Cancel
            </button>

            {selectedPlatforms.length > 1 && (
              <button
                onClick={handleBulkShare}
                disabled={isBulkSharing}
                className='px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors'
              >
                {isBulkSharing ? 'Sharing...' : `Share to ${selectedPlatforms.length} Platforms`}
              </button>
            )}

            {selectedPlatforms.length === 1 && (
              <button
                onClick={() => handleShare(selectedPlatforms[0])}
                className='px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors'
              >
                Share to {SHARE_CONFIG[selectedPlatforms[0]]?.name}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
