/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "@/components/ui/header";
import GalleryBanner from "@/components/sections/GalleryBanner";
import FeaturedContent from "@/components/sections/FeaturedContent";
import ShareJourney from "@/components/sections/ShareJourney";
import { usePublicGalleryList } from "@/hooks/usePublicQuery";
import Footer from "@/components/ui/footer";
import { Grid3X3, List, ChevronDown, Filter } from "lucide-react";
import { useState, useMemo } from "react";
import { VideoCard } from "@/components/ui/VideoCard";


// Component for embedded video players
const EmbeddedVideoPlayer = ({ videoUrl, className }: { videoUrl: string; className?: string }) => {
  // YouTube videos (including Shorts)
  if (videoUrl.includes('youtube.com/watch') || videoUrl.includes('youtu.be/') || videoUrl.includes('youtube.com/shorts/')) {
    let videoId = '';
    
    if (videoUrl.includes('youtu.be/')) {
      videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0] || '';
    } else if (videoUrl.includes('youtube.com/shorts/')) {
      videoId = videoUrl.split('youtube.com/shorts/')[1]?.split('?')[0] || '';
    } else if (videoUrl.includes('youtube.com/watch')) {
      videoId = videoUrl.split('v=')[1]?.split('&')[0] || '';
    }
    
    if (videoId) {
      return (
        <iframe
          className={className}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      );
    }
  }
  
  // Vimeo videos
  if (videoUrl.includes('vimeo.com/')) {
    const videoId = videoUrl.split('vimeo.com/')[1]?.split('?')[0];
    if (videoId) {
      return (
        <iframe
          className={className}
          src={`https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`}
          title="Vimeo video player"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      );
    }
  }
  
  // Instagram Reels and Posts
  if (videoUrl.includes('instagram.com/reel/') || videoUrl.includes('instagram.com/p/')) {
    return (
      <div className={`${className} bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white cursor-pointer relative overflow-hidden`}
           onClick={() => window.open(videoUrl, '_blank')}>
        {/* Instagram-style background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
          <div className="absolute top-8 right-6 w-6 h-6 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-6 left-6 w-4 h-4 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-white rounded-full"></div>
        </div>
        
        <div className="text-center relative z-10">
          <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
          <p className="text-lg font-bold mb-1">Instagram Reel</p>
          <p className="text-sm opacity-90">Click to view</p>
        </div>
      </div>
    );
  }
  
  // TikTok videos
  if (videoUrl.includes('tiktok.com/')) {
    return (
      <div className={`${className} bg-gradient-to-br from-black to-gray-800 flex items-center justify-center text-white cursor-pointer`}
           onClick={() => window.open(videoUrl, '_blank')}>
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </div>
          <p className="text-sm font-medium">TikTok Video</p>
          <p className="text-xs opacity-75">Click to view</p>
        </div>
      </div>
    );
  }
  
  // Twitter/X videos
  if (videoUrl.includes('twitter.com/') || videoUrl.includes('x.com/')) {
    return (
      <div className={`${className} bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white cursor-pointer`}
           onClick={() => window.open(videoUrl, '_blank')}>
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </div>
          <p className="text-sm font-medium">Twitter Video</p>
          <p className="text-xs opacity-75">Click to view</p>
        </div>
      </div>
    );
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
            <EmbeddedVideoPlayer 
              videoUrl={videoUrl} 
              className="w-full h-full" 
            />
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
                    <div 
                      className={`relative cursor-pointer ${
                        viewMode === "list" 
                          ? "w-24 h-24 rounded-lg" 
                          : "w-full h-48 sm:h-56"
                      }`}
                      onClick={() => setSelectedVideo({ url: g.videoUrl, title: g.title })}
                    >
                      <VideoCard
                        videoUrl={g.videoUrl || ''}
                        title={g.title}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                        showPlatformInfo={true}
                        isShortForm={g.isShortForm}
                        videoPlatform={g.videoPlatform}
                        videoType={g.videoType}
                      />
                    </div>
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
