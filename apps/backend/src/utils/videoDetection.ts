// Video type detection utilities
export type VideoPlatform = 
  | 'youtube'
  | 'youtube-shorts'
  | 'instagram-reel'
  | 'instagram-post'
  | 'tiktok'
  | 'vimeo'
  | 'twitter'
  | 'dailymotion'
  | 'direct-video'
  | 'unknown';

export type VideoType = 'reel' | 'short' | 'video' | 'post';

export interface VideoInfo {
  platform: VideoPlatform;
  type: VideoType;
  videoId?: string;
  embedUrl?: string;
  thumbnailUrl?: string;
  isExternal: boolean;
  isShortForm: boolean;
}

/**
 * Detects video platform and type from URL
 */
export function detectVideoInfo(url: string): VideoInfo {
  if (!url || typeof url !== 'string') {
    return {
      platform: 'unknown',
      type: 'video',
      isExternal: false,
      isShortForm: false
    };
  }

  const cleanUrl = url.trim().toLowerCase();

  // YouTube detection
  if (cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be')) {
    const videoId = extractYouTubeVideoId(url);
    const isShorts = cleanUrl.includes('/shorts/') || cleanUrl.includes('youtube.com/shorts/');
    
    return {
      platform: isShorts ? 'youtube-shorts' : 'youtube',
      type: isShorts ? 'short' : 'video',
      videoId,
      embedUrl: videoId ? `https://www.youtube.com/embed/${videoId}` : undefined,
      thumbnailUrl: videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : undefined,
      isExternal: true,
      isShortForm: isShorts
    };
  }

  // Instagram detection
  if (cleanUrl.includes('instagram.com')) {
    const isReel = cleanUrl.includes('/reel/') || cleanUrl.includes('/reels/');
    const isPost = cleanUrl.includes('/p/') || cleanUrl.includes('/tv/');
    
    return {
      platform: isReel ? 'instagram-reel' : 'instagram-post',
      type: isReel ? 'reel' : 'post',
      isExternal: true,
      isShortForm: isReel || isPost
    };
  }

  // TikTok detection
  if (cleanUrl.includes('tiktok.com')) {
    return {
      platform: 'tiktok',
      type: 'short',
      isExternal: true,
      isShortForm: true
    };
  }

  // Vimeo detection
  if (cleanUrl.includes('vimeo.com')) {
    const videoId = extractVimeoVideoId(url);
    return {
      platform: 'vimeo',
      type: 'video',
      videoId,
      embedUrl: videoId ? `https://player.vimeo.com/video/${videoId}` : undefined,
      thumbnailUrl: videoId ? `https://vumbnail.com/${videoId}.jpg` : undefined,
      isExternal: true,
      isShortForm: false
    };
  }

  // Twitter/X detection
  if (cleanUrl.includes('twitter.com') || cleanUrl.includes('x.com')) {
    return {
      platform: 'twitter',
      type: 'post',
      isExternal: true,
      isShortForm: true
    };
  }

  // Dailymotion detection
  if (cleanUrl.includes('dailymotion.com')) {
    return {
      platform: 'dailymotion',
      type: 'video',
      isExternal: true,
      isShortForm: false
    };
  }

  // Direct video file detection
  if (isDirectVideoFile(url)) {
    return {
      platform: 'direct-video',
      type: 'video',
      isExternal: false,
      isShortForm: false
    };
  }

  return {
    platform: 'unknown',
    type: 'video',
    isExternal: false,
    isShortForm: false
  };
}

/**
 * Extracts YouTube video ID from various YouTube URL formats
 */
function extractYouTubeVideoId(url: string): string | undefined {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return undefined;
}

/**
 * Extracts Vimeo video ID from Vimeo URL
 */
function extractVimeoVideoId(url: string): string | undefined {
  const pattern = /vimeo\.com\/(\d+)/;
  const match = url.match(pattern);
  return match ? match[1] : undefined;
}

/**
 * Checks if URL points to a direct video file
 */
function isDirectVideoFile(url: string): boolean {
  const videoExtensions = /\.(mp4|webm|ogg|mov|avi|mkv|m4v|3gp|flv|wmv)(\?.*)?$/i;
  return videoExtensions.test(url);
}

/**
 * Gets platform-specific icon and styling
 */
export function getPlatformInfo(platform: VideoPlatform) {
  const platformInfo = {
    'youtube': {
      name: 'YouTube',
      icon: '▶️',
      color: '#FF0000',
      bgColor: 'from-red-500 to-red-600'
    },
    'youtube-shorts': {
      name: 'YouTube Shorts',
      icon: '📱',
      color: '#FF0000',
      bgColor: 'from-red-500 to-red-600'
    },
    'instagram-reel': {
      name: 'Instagram Reel',
      icon: '🎬',
      color: '#E4405F',
      bgColor: 'from-purple-500 to-pink-500'
    },
    'instagram-post': {
      name: 'Instagram Post',
      icon: '📸',
      color: '#E4405F',
      bgColor: 'from-purple-500 to-pink-500'
    },
    'tiktok': {
      name: 'TikTok',
      icon: '🎵',
      color: '#000000',
      bgColor: 'from-black to-gray-800'
    },
    'vimeo': {
      name: 'Vimeo',
      icon: '🎥',
      color: '#1AB7EA',
      bgColor: 'from-blue-400 to-blue-600'
    },
    'twitter': {
      name: 'Twitter',
      icon: '🐦',
      color: '#1DA1F2',
      bgColor: 'from-blue-400 to-blue-600'
    },
    'dailymotion': {
      name: 'Dailymotion',
      icon: '🎞️',
      color: '#00A0DC',
      bgColor: 'from-blue-500 to-blue-700'
    },
    'direct-video': {
      name: 'Direct Video',
      icon: '🎬',
      color: '#6B7280',
      bgColor: 'from-gray-500 to-gray-700'
    },
    'unknown': {
      name: 'Unknown',
      icon: '❓',
      color: '#6B7280',
      bgColor: 'from-gray-500 to-gray-700'
    }
  };

  return platformInfo[platform] || platformInfo['unknown'];
}

/**
 * Validates if a video URL is supported
 */
export function isValidVideoUrl(url: string): boolean {
  const videoInfo = detectVideoInfo(url);
  return videoInfo.platform !== 'unknown';
}

/**
 * Gets a human-readable description of the video type
 */
export function getVideoTypeDescription(videoInfo: VideoInfo): string {
  const { platform } = videoInfo;
  
  if (platform === 'youtube-shorts') {
    return 'YouTube Shorts - Short-form vertical video';
  }
  
  if (platform === 'instagram-reel') {
    return 'Instagram Reel - Short-form video content';
  }
  
  if (platform === 'tiktok') {
    return 'TikTok - Short-form video content';
  }
  
  if (platform === 'youtube') {
    return 'YouTube Video - Regular video content';
  }
  
  if (platform === 'instagram-post') {
    return 'Instagram Post - Photo or video post';
  }
  
  if (platform === 'vimeo') {
    return 'Vimeo - Professional video platform';
  }
  
  if (platform === 'twitter') {
    return 'Twitter/X - Social media post';
  }
  
  if (platform === 'direct-video') {
    return 'Direct Video File - Uploaded video file';
  }
  
  return 'Video Content';
}
