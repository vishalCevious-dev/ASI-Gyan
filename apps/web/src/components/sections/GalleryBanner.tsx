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
    <section className="relative py-16 px-5 overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full opacity-30 blur-xl bg-primary/20"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full opacity-30 blur-xl bg-secondary/20"></div>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Gallery tag */}
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-6 bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">Visual Learning</span>
          </div>
          
          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Explore Knowledge in{" "}
            <span className="text-primary">Pictures</span>{" "}
            <span className="text-accent-foreground">& Videos</span>
          </h2>
          
          {/* Description */}
          <p className="text-lg max-w-3xl mx-auto leading-relaxed text-muted-foreground">
            Discover our rich collection of educational content, community moments, and AI-powered learning experiences through visual storytelling.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6 sm:space-y-8">

            {/* Call to action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                size="lg" 
                className="gradient-primary text-black font-medium hover:scale-105 transition-transform rounded-lg px-5 sm:px-6 py-2.5 sm:py-3"
              >
                Browse Gallery
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary/50 text-foreground hover:bg-primary/10 rounded-lg px-5 sm:px-6 py-2.5 sm:py-3"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Video Tour
              </Button>
            </div>

            {/* Statistics */}
            <div className="flex flex-wrap gap-6 sm:gap-8 text-sm">
              <div className="flex items-baseline">
                <span className="text-xl sm:text-2xl font-bold text-primary">1K+</span>
                <span className="ml-2 text-muted-foreground">Photos</span>
              </div>
              <div className="flex items-baseline">
                <span className="text-xl sm:text-2xl font-bold text-primary">250+</span>
                <span className="ml-2 text-muted-foreground">Videos</span>
              </div>
              <div className="flex items-baseline">
                <span className="text-xl sm:text-2xl font-bold text-primary">50+</span>
                <span className="ml-2 text-muted-foreground">Events</span>
              </div>
            </div>
          </div>

          {/* Right side - Featured video */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl glassmorphism border-primary/20">
              {/* Featured video */}
              <div className="w-full h-64 sm:h-72 lg:h-80 bg-gradient-to-br from-muted to-muted/50 relative">
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
                  className={`absolute inset-0 bg-background/20 flex items-center justify-center transition-opacity duration-300 ${
                    isPlaying ? 'opacity-0' : 'opacity-100'
                  }`}
                  onClick={handlePlayClick}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-background/20 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-background/30 transition-colors">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-foreground" />
                  </div>
                </div>
              </div>
              
              {/* Live Learning tag - top left */}
              <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-2 border border-primary/20">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-foreground">Live Learning</span>
              </div>
              
              {/* AI Powered tag - bottom right */}
              <div className="absolute bottom-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 border border-primary/20">
                <div className="w-4 h-4 bg-primary rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-background">AI</span>
                </div>
                <span className="text-xs font-medium text-foreground">Powered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
