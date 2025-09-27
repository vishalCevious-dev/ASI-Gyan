/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "@/components/ui/header";
import GalleryBanner from "@/components/sections/GalleryBanner";
import FeaturedContent from "@/components/sections/FeaturedContent";
import ShareJourney from "@/components/sections/ShareJourney";
import { usePublicGalleryList } from "@/hooks/usePublicQuery";
import Footer from "@/components/ui/footer";
import { Video, Play } from "lucide-react";
import { useState } from "react";

// Utility function to generate video thumbnails for external URLs
const getVideoThumbnail = (videoUrl: string): string | null => {
  if (!videoUrl) return null;
  
  // YouTube thumbnails
  if (videoUrl.includes('youtube.com/watch') || videoUrl.includes('youtu.be/')) {
    const videoId = videoUrl.includes('youtu.be/') 
      ? videoUrl.split('youtu.be/')[1]?.split('?')[0]
      : videoUrl.split('v=')[1]?.split('&')[0];
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
  }
  
  // Vimeo thumbnails (requires API call, but we can use a placeholder)
  if (videoUrl.includes('vimeo.com/')) {
    const videoId = videoUrl.split('vimeo.com/')[1]?.split('?')[0];
    if (videoId) {
      return `https://vumbnail.com/${videoId}.jpg`;
    }
  }
  
  return null;
};

// Utility function to check if video URL is from external platform
const isExternalVideo = (videoUrl: string): boolean => {
  return videoUrl.includes('youtube.com') || 
         videoUrl.includes('youtu.be') || 
         videoUrl.includes('vimeo.com') || 
         videoUrl.includes('dailymotion.com');
};

// Component for embedded video players
const EmbeddedVideoPlayer = ({ videoUrl, className }: { videoUrl: string; className?: string }) => {
  if (videoUrl.includes('youtube.com/watch') || videoUrl.includes('youtu.be/')) {
    const videoId = videoUrl.includes('youtu.be/') 
      ? videoUrl.split('youtu.be/')[1]?.split('?')[0]
      : videoUrl.split('v=')[1]?.split('&')[0];
    
    if (videoId) {
      return (
        <iframe
          className={className}
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
  }
  
  if (videoUrl.includes('vimeo.com/')) {
    const videoId = videoUrl.split('vimeo.com/')[1]?.split('?')[0];
    if (videoId) {
      return (
        <iframe
          className={className}
          src={`https://player.vimeo.com/video/${videoId}`}
          title="Vimeo video player"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      );
    }
  }
  
  // Fallback to regular video element
  return (
    <video
      src={videoUrl}
      className={className}
      controls
      preload="metadata"
      crossOrigin="anonymous"
      playsInline
      muted
    />
  );
};

// Video Modal Component
const VideoModal = ({ 
  isOpen, 
  onClose, 
  videoUrl, 
  title 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  videoUrl: string; 
  title: string; 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4">
        <div className="bg-black rounded-lg overflow-hidden relative">
          {/* Single close button - always visible */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-20 bg-black/70 rounded-full p-2 hover:bg-black/90"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="aspect-video">
            {isExternalVideo(videoUrl) ? (
              <EmbeddedVideoPlayer 
                videoUrl={videoUrl}
                className="w-full h-full"
              />
            ) : (
              <video
                src={videoUrl}
                className="w-full h-full"
                controls
                autoPlay
                preload="metadata"
                crossOrigin="anonymous"
                playsInline
              />
            )}
          </div>
          <div className="p-4 text-white">
            <h3 className="text-lg font-medium">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PublicGallery() {
  const { data, isLoading, isError } = usePublicGalleryList(1, 12);
  const items = data?.data?.data || [];
  
  // State for video modal
  const [selectedVideo, setSelectedVideo] = useState<{
    url: string;
    title: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="relative pt-20 sm:pt-24">
        {/* Banner Section */}
        <GalleryBanner />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">Gallery</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Explore our collection of photos and videos
            </p>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground">Loading gallery…</div>
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <div className="text-destructive">Failed to load gallery.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
              {items?.map((g: any) => (
                <div
                  key={g.id}
                  className="group rounded-xl overflow-hidden border border-primary/20 bg-accent/10 hover:border-primary/40 transition-all duration-300 hover:shadow-lg"
                >
                  {g.type === "PHOTO" ? (
                    <img
                      src={g.imageUrl}
                      alt={g.title}
                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    g.videoUrl ? (
                      isExternalVideo(g.videoUrl) ? (
                        <div 
                          className="relative w-full h-48 sm:h-56 cursor-pointer"
                          onClick={() => setSelectedVideo({ url: g.videoUrl, title: g.title })}
                        >
                          <EmbeddedVideoPlayer 
                            videoUrl={g.videoUrl}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {/* Video overlay with play button */}
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                              <Play className="w-6 h-6 text-gray-800 ml-0.5" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="relative w-full h-48 sm:h-56 cursor-pointer"
                          onClick={() => setSelectedVideo({ url: g.videoUrl, title: g.title })}
                        >
                          <video
                            src={g.videoUrl}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            preload="metadata"
                            crossOrigin="anonymous"
                            playsInline
                            muted
                            poster={g.imageUrl || getVideoThumbnail(g.videoUrl) || undefined}
                            onError={(e) => {
                              console.error('Video load error in public gallery:', e);
                              console.error('Video URL:', g.videoUrl);
                            }}
                            onLoadStart={() => {
                              console.log('Video loading started in public gallery:', g.videoUrl);
                            }}
                            onCanPlay={() => {
                              console.log('Video can play in public gallery:', g.videoUrl);
                            }}
                          />
                          {/* Video overlay with play button */}
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                              <Play className="w-6 h-6 text-gray-800 ml-0.5" />
                            </div>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="w-full h-48 sm:h-56 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white">
                        <div className="text-center">
                          <Video className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <span className="text-sm">Video</span>
                        </div>
                      </div>
                    )
                  )}
                  <div className="p-3 sm:p-4">
                    <div className="font-medium text-sm sm:text-base mb-1">{g.title}</div>
                    {g.description && (
                      <div className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                        {g.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Featured Content Section */}
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <FeaturedContent />
          </div>
          
          {/* Share Journey Section */}
          <div className="mb-8 sm:mb-12">
            <ShareJourney />
          </div>
          
          <Footer />
        </main>
      </div>
      
      {/* Video Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.url || ''}
        title={selectedVideo?.title || ''}
      />
    </div>
  );
}
