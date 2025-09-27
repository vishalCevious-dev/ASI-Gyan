import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";

export default function GalleryBanner() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background with gradient - matching the image */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 via-slate-900 to-blue-900/30" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Dotted pattern overlay at the top */}
      <div className="absolute top-0 left-0 right-0 h-1">
        <div className="h-full bg-repeat-x opacity-30" style={{
          backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }} />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Main title */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Explore Knowledge in{" "}
                <span className="text-cyan-400">Pictures</span>{" "}
                <span className="text-purple-400">& Videos</span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-300 max-w-lg">
                Discover our rich collection of educational content, community moments, 
                and AI-powered learning experiences through visual storytelling.
              </p>
            </div>

            {/* Call to action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 rounded-lg px-5 sm:px-6 py-2.5 sm:py-3"
              >
                Browse Gallery
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-cyan-400/50 text-white hover:bg-cyan-400/10 rounded-lg px-5 sm:px-6 py-2.5 sm:py-3"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Video Tour
              </Button>
            </div>

            {/* Statistics */}
            <div className="flex flex-wrap gap-6 sm:gap-8 text-sm">
              <div className="flex items-baseline">
                <span className="text-xl sm:text-2xl font-bold text-cyan-400">1K+</span>
                <span className="ml-2 text-gray-300">Photos</span>
              </div>
              <div className="flex items-baseline">
                <span className="text-xl sm:text-2xl font-bold text-cyan-400">250+</span>
                <span className="ml-2 text-gray-300">Videos</span>
              </div>
              <div className="flex items-baseline">
                <span className="text-xl sm:text-2xl font-bold text-cyan-400">50+</span>
                <span className="ml-2 text-gray-300">Events</span>
              </div>
            </div>
          </div>

          {/* Right side - Featured video */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Featured video */}
              <div className="w-full h-64 sm:h-72 lg:h-80 bg-gradient-to-br from-slate-700 to-slate-800 relative">
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  poster=""
                  preload="metadata"
                  muted
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                >
                  <source src="https://cdn.pixabay.com/video/2024/06/06/215470_tiny.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Video overlay with play button */}
                <div 
                  className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
                    isPlaying ? 'opacity-0' : 'opacity-100'
                  }`}
                  onClick={handlePlayClick}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-white/30 transition-colors">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Live Learning tag - top left */}
              <div className="absolute top-4 left-4 bg-gray-200/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-gray-800">Live Learning</span>
              </div>
              
              {/* AI Powered tag - bottom right */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">AI</span>
                </div>
                <span className="text-xs font-medium text-gray-700">Powered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
