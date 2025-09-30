import { Video, Play, ExternalLink } from 'lucide-react';
import { detectVideoInfo, getPlatformInfo } from '@/lib/videoDetection';

interface VideoCardProps {
  videoUrl: string;
  title?: string;
  className?: string;
  onClick?: () => void;
  showPlatformInfo?: boolean;
  isShortForm?: boolean;
  videoPlatform?: string;
  videoType?: string;
}

export function VideoCard({
  videoUrl,
  className = '',
  onClick,
  showPlatformInfo = true,
  isShortForm,
  videoPlatform
}: VideoCardProps) {
  const videoInfo = videoUrl ? detectVideoInfo(videoUrl) : null;
  const platform = videoPlatform || videoInfo?.platform || 'unknown';
  const isShort = isShortForm ?? videoInfo?.isShortForm ?? false;
  
  const platformInfo = getPlatformInfo(platform as any);

  const renderVideoContent = () => {
    if (!videoUrl) {
      return (
        <div className={`w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white ${className}`}>
          <div className="text-center">
            <Video className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <span className="text-sm">No Video</span>
          </div>
        </div>
      );
    }

    // YouTube videos
    if (videoInfo?.platform === 'youtube' || videoInfo?.platform === 'youtube-shorts') {
      return (
        <div className={`relative w-full h-full ${className}`}>
          {videoInfo.embedUrl ? (
            <iframe
              src={videoInfo.embedUrl}
              className="w-full h-full"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${platformInfo.bgColor} flex items-center justify-center text-white`}>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium">{platformInfo.name}</p>
                <p className="text-xs opacity-75">Click to view</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Vimeo videos
    if (videoInfo?.platform === 'vimeo') {
      return (
        <div className={`relative w-full h-full ${className}`}>
          {videoInfo.embedUrl ? (
            <iframe
              src={videoInfo.embedUrl}
              className="w-full h-full"
              title="Vimeo video player"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${platformInfo.bgColor} flex items-center justify-center text-white`}>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium">{platformInfo.name}</p>
                <p className="text-xs opacity-75">Click to view</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Instagram Reels and Posts
    if (videoInfo?.platform === 'instagram-reel' || videoInfo?.platform === 'instagram-post') {
      return (
        <div className={`relative w-full h-full ${className}`}>
          {/* Background with Instagram gradient */}
          <div className={`w-full h-full bg-gradient-to-br ${platformInfo.bgColor} flex items-center justify-center text-white relative overflow-hidden`}>
            {/* Instagram-style background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
              <div className="absolute top-8 right-6 w-6 h-6 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-6 left-6 w-4 h-4 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-white rounded-full"></div>
            </div>
            
            {/* Main content */}
            <div className="text-center relative z-10">
              <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <p className="text-lg font-bold mb-1">{platformInfo.name}</p>
              <p className="text-sm opacity-90">Click to view</p>
            </div>
          </div>
        </div>
      );
    }

    // TikTok videos
    if (videoInfo?.platform === 'tiktok') {
      return (
        <div className={`w-full h-full bg-gradient-to-br ${platformInfo.bgColor} flex items-center justify-center text-white ${className}`}>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </div>
            <p className="text-sm font-medium">{platformInfo.name}</p>
            <p className="text-xs opacity-75">Click to view</p>
          </div>
        </div>
      );
    }

    // Twitter/X videos
    if (videoInfo?.platform === 'twitter') {
      return (
        <div className={`w-full h-full bg-gradient-to-br ${platformInfo.bgColor} flex items-center justify-center text-white ${className}`}>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>
            <p className="text-sm font-medium">{platformInfo.name}</p>
            <p className="text-xs opacity-75">Click to view</p>
          </div>
        </div>
      );
    }

    // Direct video files
    if (videoInfo?.platform === 'direct-video' || !videoInfo?.isExternal) {
      return (
        <div className={`relative w-full h-full ${className}`}>
          <video
            src={videoUrl}
            className="w-full h-full object-cover"
            preload="metadata"
            crossOrigin="anonymous"
            playsInline
            muted
            poster={videoInfo?.thumbnailUrl}
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
              <Play className="w-6 h-6 text-gray-800 ml-0.5" />
            </div>
          </div>
        </div>
      );
    }

    // Fallback for unknown platforms
    return (
      <div className={`w-full h-full bg-gradient-to-br ${platformInfo.bgColor} flex items-center justify-center text-white ${className}`}>
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
            <Play className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium">{platformInfo.name}</p>
          <p className="text-xs opacity-75">Click to view</p>
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`relative group cursor-pointer ${className}`}
      onClick={onClick}
    >
      {renderVideoContent()}
      
      {/* Platform indicator */}
      {showPlatformInfo && (
        <div className="absolute top-2 left-2 flex items-center gap-1">
          <div className={`px-2 py-1 rounded-full text-xs font-medium bg-black/70 text-white flex items-center gap-1`}>
            <span className="text-xs">{platformInfo.icon}</span>
            <span>{platformInfo.name}</span>
            {isShort && (
              <span className="ml-1 px-1 py-0.5 bg-yellow-500 text-black text-xs font-bold rounded">
                SHORT
              </span>
            )}
          </div>
        </div>
      )}

      {/* Play button overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
          <Play className="w-6 h-6 text-gray-800 ml-0.5" />
        </div>
      </div>

      {/* External link indicator for external videos */}
      {videoInfo?.isExternal && (
        <div className="absolute top-2 right-2">
          <div className="w-6 h-6 bg-black/70 rounded-full flex items-center justify-center">
            <ExternalLink className="w-3 h-3 text-white" />
          </div>
        </div>
      )}
    </div>
  );
}
