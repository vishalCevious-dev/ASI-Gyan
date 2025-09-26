import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Loader2, Play, Pause } from "lucide-react";

interface FeaturedItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  featured: boolean;
}

const featuredItems: FeaturedItem[] = [
  {
    id: 1,
    title: "Traditional Meets Modern AI",
    description: "Exploring how ancient Indian knowledge systems integrate with cutting-edge AI technology",
    imageUrl: "https://media.istockphoto.com/id/1499059971/photo/artificial-intelligence-technology-robot-futuristic-data-science-data-analytics-a-i.jpg?s=612x612&w=0&k=20&c=sW-oYTPEph-MM-r9PjLdvVIGOlWqjbD52sNnsP3HIVQ=",
    featured: true,
  },
  {
    id: 2,
    title: "Community Learning Sessions",
    description: "Discover how our community comes together to share knowledge and grow together",
    imageUrl: "https://media.istockphoto.com/id/1688516568/photo/training-a-neural-network-artificial-intelligence-concept-artificial-intelligence-training.jpg?s=612x612&w=0&k=20&c=uxqIMLnVyeIUB1t17F1HXD1xgZZhL_Qucp6uGOua5e8=",
    featured: true,
  },
  {
    id: 3,
    title: "AI-Powered Education",
    description: "See how artificial intelligence is transforming the way we learn and teach",
    imageUrl: "https://media.istockphoto.com/id/1537254165/photo/ai-artificial-intelligence-digital-concept-innovations-and-technology.jpg?s=612x612&w=0&k=20&c=BNijYHCGn2YBJmFfk04k9CArJ32Zcrv2tjyoxoTjwHY=",
    featured: true,
  },
];

export default function FeaturedContent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = featuredItems.map((item, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, index]));
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to load image for item ${index}:`, item.imageUrl);
            setLoadedImages(prev => new Set([...prev, index]));
            resolve();
          };
          img.src = item.imageUrl;
        });
      });
      
      await Promise.all(imagePromises);
      setIsLoading(false);
    };

    preloadImages();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
    setIsAutoPlaying(false); // Stop auto-play when user interacts
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
    setIsAutoPlaying(false); // Stop auto-play when user interacts
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false); // Stop auto-play when user interacts
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isLoading) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, isLoading]);

  // Progress bar for auto-play
  useEffect(() => {
    if (!isAutoPlaying || isLoading) {
      setProgress(0);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 2; // Update every 100ms, reaches 100% in 5 seconds
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isAutoPlaying, isLoading, currentIndex]);

  // Touch/swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
        setIsAutoPlaying(false); // Stop auto-play when user interacts
      } else if (event.key === 'ArrowRight') {
        nextSlide();
        setIsAutoPlaying(false); // Stop auto-play when user interacts
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentItem = featuredItems[currentIndex];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 lg:py-20">
      {/* Dotted pattern overlay at the top */}
      <div className="absolute top-0 left-0 right-0 h-1">
        <div className="h-full bg-repeat-x opacity-30" style={{
          backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }} />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 lg:mb-6">
            <span className="text-cyan-400">★</span> Featured Content <span className="text-cyan-400">★</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
            Discover our handpicked selection of exceptional educational content and community moments
          </p>
        </div>

        {/* Main Content Card */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
            {/* Background Image */}
            <div 
              className="w-full h-[400px] sm:h-[450px] lg:h-[500px] bg-cover bg-center bg-no-repeat relative transition-all duration-500 ease-in-out"
              style={{
                backgroundImage: `url(${currentItem.imageUrl})`,
                backgroundPosition: 'center',
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 text-white animate-spin mx-auto mb-4" />
                    <p className="text-white text-lg">Loading featured content...</p>
                  </div>
                </div>
              )}

              {/* Image Loading Indicator */}
              {!loadedImages.has(currentIndex) && !isLoading && (
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="w-6 h-6 text-white animate-spin mx-auto mb-2" />
                    <p className="text-white text-sm">Loading image...</p>
                  </div>
                </div>
              )}
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Featured Badge */}
              <div className="absolute top-6 left-6">
                <div className="bg-black/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 border border-white/20">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm font-medium">Featured</span>
                </div>
              </div>

              {/* Auto-play Control */}
              <div className="absolute top-6 right-6 flex items-center gap-3">
                {/* Progress Bar */}
                {isAutoPlaying && (
                  <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
                
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="bg-black/90 backdrop-blur-sm rounded-full p-2 border border-white/20 hover:bg-black/80 transition-all duration-200"
                  aria-label={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
                >
                  {isAutoPlaying ? (
                    <Pause className="w-4 h-4 text-white" />
                  ) : (
                    <Play className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                disabled={isLoading}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              
              <button
                onClick={nextSlide}
                disabled={isLoading}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                <div className="max-w-3xl">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 leading-tight">
                    {currentItem.title}
                  </h3>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-4 sm:mb-6 lg:mb-8 leading-relaxed max-w-2xl">
                    {currentItem.description}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-white/50 text-white hover:bg-white/10 rounded-lg px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium backdrop-blur-sm"
                    >
                      View Details
                    </Button>
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white border-0 rounded-lg px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium shadow-lg"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 sm:mt-8 lg:mt-10 gap-3 sm:gap-4">
            {featuredItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isLoading}
                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 transform hover:scale-125 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                  index === currentIndex 
                    ? 'bg-orange-500 shadow-lg shadow-orange-500/50 scale-110' 
                    : 'bg-white/50 hover:bg-white/70 hover:shadow-md'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}