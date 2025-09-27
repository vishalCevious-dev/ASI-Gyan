/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "@/components/ui/header";
import GalleryBanner from "@/components/sections/GalleryBanner";
import FeaturedContent from "@/components/sections/FeaturedContent";
import ShareJourney from "@/components/sections/ShareJourney";
import { usePublicGalleryList } from "@/hooks/usePublicQuery";
import Footer from "@/components/ui/footer";
import { Video, Play, Grid3X3, List, ChevronDown, Filter } from "lucide-react";
import { useState, useMemo } from "react";

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

  // Filter and view state
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Newest First");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const total = items.length;
    const photos = items.filter((item: any) => item.type === "PHOTO").length;
    const videos = items.filter((item: any) => item.type === "VIDEO").length;
    const events = items.filter((item: any) => item.category === "Events").length;
    const community = items.filter((item: any) => item.category === "Community").length;
    const featured = items.filter((item: any) => item.category === "Featured").length;
    
    return { total, photos, videos, events, community, featured };
  }, [items]);

  // Filter items based on selected category
  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return items;
    
    switch (selectedCategory) {
      case "Photos":
        return items.filter((item: any) => item.type === "PHOTO");
      case "Videos":
        return items.filter((item: any) => item.type === "VIDEO");
      case "Events":
        return items.filter((item: any) => item.category === "Events");
      case "Community":
        return items.filter((item: any) => item.category === "Community");
      case "Featured":
        return items.filter((item: any) => item.category === "Featured");
      default:
        return items;
    }
  }, [items, selectedCategory]);

  // Sort items based on selected sort option
  const sortedItems = useMemo(() => {
    const sorted = [...filteredItems];
    
    switch (sortBy) {
      case "Newest First":
        return sorted.sort((a: any, b: any) => 
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
      case "Oldest First":
        return sorted.sort((a: any, b: any) => 
          new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
        );
      case "A-Z":
        return sorted.sort((a: any, b: any) => a.title.localeCompare(b.title));
      case "Z-A":
        return sorted.sort((a: any, b: any) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  }, [filteredItems, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="relative pt-20 sm:pt-24">
        {/* Banner Section */}
        <GalleryBanner />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Filter Bar */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-card/50 border border-border rounded-xl py-4 sm:py-6 px-4 sm:px-6">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* All button - highlighted */}
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`flex items-center rounded-[10px] px-3 py-2 transition-all duration-200 ${
                    selectedCategory === "All"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      : "bg-card text-foreground hover:bg-accent"
                  }`}
                >
                  <span className="text-sm font-bold mr-2">All</span>
                  <span className="text-xs font-bold bg-white/10 rounded-full px-3 py-1">
                    {categoryCounts.total}
                  </span>
                </button>

                {/* Category buttons */}
                {[
                  { name: "Photos", count: categoryCounts.photos },
                  { name: "Videos", count: categoryCounts.videos },
                  { name: "Events", count: categoryCounts.events },
                  { name: "Community", count: categoryCounts.community },
                  { name: "Featured", count: categoryCounts.featured },
                ].map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex items-center rounded-[10px] px-3 py-2 transition-all duration-200 ${
                      selectedCategory === category.name
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "bg-card text-foreground hover:bg-accent border border-border"
                    }`}
                  >
                    <span className="text-sm font-bold mr-2">{category.name}</span>
                    <span className="text-xs font-bold bg-secondary/40 rounded-full px-3 py-1">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Right side controls */}
              <div className="flex items-center gap-3">
                {/* Sort dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-card border border-border rounded-[10px] px-3 py-2 pr-8 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="Newest First">Newest First</option>
                    <option value="Oldest First">Oldest First</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground pointer-events-none" />
                </div>

                {/* View toggle buttons */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-[10px] transition-all duration-200 ${
                      viewMode === "grid"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "bg-card text-foreground hover:bg-accent border border-border"
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-[10px] transition-all duration-200 ${
                      viewMode === "list"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "bg-card text-foreground hover:bg-accent border border-border"
                    }`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Filters button */}
                <button className="flex items-center gap-2 bg-card text-foreground hover:bg-accent border border-border rounded-[10px] px-3 py-2 transition-all duration-200">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-bold">Filters</span>
                </button>
              </div>
            </div>
          </div>
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
            <div className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20"
                : "space-y-4 mb-12 sm:mb-16 lg:mb-20"
            }>
              {sortedItems?.map((g: any) => (
                <div
                  key={g.id}
                  className={`group rounded-xl overflow-hidden border border-primary/20 bg-accent/10 hover:border-primary/40 transition-all duration-300 hover:shadow-lg ${
                    viewMode === "list" ? "flex items-center gap-4" : ""
                  }`}
                >
                  {g.type === "PHOTO" ? (
                    <img
                      src={g.imageUrl}
                      alt={g.title}
                      className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                        viewMode === "list" 
                          ? "w-24 h-24 rounded-lg" 
                          : "w-full h-48 sm:h-56"
                      }`}
                    />
                  ) : (
                    g.videoUrl ? (
                      isExternalVideo(g.videoUrl) ? (
                        <div 
                          className={`relative cursor-pointer ${
                            viewMode === "list" 
                              ? "w-24 h-24 rounded-lg" 
                              : "w-full h-48 sm:h-56"
                          }`}
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
                          className={`relative cursor-pointer ${
                            viewMode === "list" 
                              ? "w-24 h-24 rounded-lg" 
                              : "w-full h-48 sm:h-56"
                          }`}
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
                  <div className={`p-3 sm:p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="font-medium text-sm sm:text-base mb-1">{g.title}</div>
                    {g.description && (
                      <div className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                        {g.description}
                      </div>
                    )}
                    {viewMode === "list" && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground bg-secondary/20 px-2 py-1 rounded">
                          {g.type}
                        </span>
                        {g.category && (
                          <span className="text-xs text-muted-foreground bg-secondary/20 px-2 py-1 rounded">
                            {g.category}
                          </span>
                        )}
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
