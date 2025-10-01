import React, { useState, useEffect } from 'react';
import { Input } from './input';
import { Label } from './label';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { VideoCard } from './VideoCard';
import { detectVideoInfo, getPlatformInfo, isValidVideoUrl, getVideoTypeDescription } from '@/lib/videoDetection';
import { Video, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

interface VideoSelectorProps {
  value: string;
  onChange: (url: string) => void;
  onTypeDetected?: (type: 'PHOTO' | 'VIDEO') => void;
  className?: string;
  placeholder?: string;
}

export function VideoSelector({
  value,
  onChange,
  onTypeDetected,
  className = '',
  placeholder = "Paste YouTube, Instagram, TikTok, or direct video URL..."
}: VideoSelectorProps) {
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [isValid, setIsValid] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    if (!value.trim()) {
      setVideoInfo(null);
      setIsValid(false);
      return;
    }

    setIsDetecting(true);
    
    // Simulate detection delay for better UX
    const timer = setTimeout(() => {
      const info = detectVideoInfo(value);
      setVideoInfo(info);
      setIsValid(isValidVideoUrl(value));
      
      // Auto-detect type for parent component
      if (onTypeDetected) {
        const detectedType = info.platform !== 'unknown' ? 'VIDEO' : 'PHOTO';
        onTypeDetected(detectedType);
      }
      
      setIsDetecting(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [value, onTypeDetected]);

  const platformInfo = videoInfo ? getPlatformInfo(videoInfo.platform) : null;

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
    setVideoInfo(null);
    setIsValid(false);
  };

  const handleOpenExternal = () => {
    if (value && videoInfo?.isExternal) {
      window.open(value, '_blank');
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        <Label>Video URL</Label>
        <div className="relative">
          <Input
            value={value}
            onChange={handleUrlChange}
            placeholder={placeholder}
            className="pr-20"
          />
          {value && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              {isDetecting ? (
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              ) : isValid ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-500" />
              )}
              {value && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  className="h-6 w-6 p-0"
                >
                  ×
                </Button>
              )}
            </div>
          )}
        </div>
        
        {/* URL validation feedback */}
        {value && !isDetecting && (
          <div className="text-xs">
            {isValid ? (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="w-3 h-3" />
                <span>Valid video URL detected</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-600">
                <AlertCircle className="w-3 h-3" />
                <span>Invalid or unsupported video URL</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Video preview and info */}
      {videoInfo && isValid && (
        <Card className="border-primary/20">
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Video preview */}
              <div className="aspect-video rounded-lg overflow-hidden">
                <VideoCard
                  videoUrl={value}
                  showPlatformInfo={false}
                  className="w-full h-full"
                />
              </div>

              {/* Video information */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <span className="text-xs">{platformInfo?.icon}</span>
                      <span>{platformInfo?.name}</span>
                    </Badge>
                    {videoInfo.isShortForm && (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                        SHORT FORM
                      </Badge>
                    )}
                  </div>
                  
                  {videoInfo.isExternal && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleOpenExternal}
                      className="flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Open
                    </Button>
                  )}
                </div>

                <div className="text-sm text-muted-foreground">
                  {getVideoTypeDescription(videoInfo)}
                </div>

                {/* Additional video details */}
                {videoInfo.videoId && (
                  <div className="text-xs text-muted-foreground">
                    Video ID: {videoInfo.videoId}
                  </div>
                )}

                {/* Platform-specific features */}
                {videoInfo.platform === 'youtube' && (
                  <div className="text-xs text-muted-foreground">
                    • Auto-generated thumbnail available
                    • Embeddable player
                    • YouTube Shorts support
                  </div>
                )}

                {videoInfo.platform === 'instagram-reel' && (
                  <div className="text-xs text-muted-foreground">
                    • Instagram Reel format
                    • Vertical video optimized
                    • Social media integration
                  </div>
                )}

                {videoInfo.platform === 'tiktok' && (
                  <div className="text-xs text-muted-foreground">
                    • TikTok short-form content
                    • Vertical video format
                    • Mobile-optimized
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Supported platforms info */}
      <div className="text-xs text-muted-foreground">
        <p className="font-medium mb-1">Supported platforms:</p>
        <div className="flex flex-wrap gap-1">
          {['YouTube', 'YouTube Shorts', 'Instagram Reels', 'Instagram Posts', 'TikTok', 'Vimeo', 'Twitter/X', 'Direct video files'].map((platform) => (
            <Badge key={platform} variant="outline" className="text-xs">
              {platform}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
