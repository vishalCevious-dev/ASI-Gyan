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
    <section className="relative  px-5 overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full opacity-30 blur-xl bg-primary/20"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full opacity-30 blur-xl bg-secondary/20"></div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            {/* Main heading */}
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Explore Knowledge in{" "}
                <span className="text-secondary">Pictures</span>{" "}
                <span className="text-foreground">&</span>{" "}
                <span className="text-accent">Videos</span>
              </h2>
              
              {/* Description */}
              <p className="text-lg leading-relaxed text-muted-foreground max-w-lg">
                Discover our rich collection of educational content, community moments, and AI-powered learning experiences through visual storytelling.
              </p>
            </div>

            {/* Call to action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-secondary to-accent text-black font-medium hover:scale-105 transition-transform rounded-lg px-8 py-4 text-base"
              >
                Browse Gallery
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-secondary/50 text-foreground hover:bg-secondary/10 rounded-lg px-8 py-4 text-base"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Video Tour
              </Button>
            </div>

            {/* Statistics */}
            <div className="flex flex-wrap gap-8 text-sm">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-secondary">1K+</span>
                <span className="ml-2 text-muted-foreground">Photos</span>
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-secondary">250+</span>
                <span className="ml-2 text-muted-foreground">Videos</span>
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-secondary">50+</span>
                <span className="ml-2 text-muted-foreground">Events</span>
              </div>
            </div>
          </div>

          {/* Right side - Featured video */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl glassmorphism border-primary/20">
              {/* Featured video */}
              <div className="w-full h-80 lg:h-96 bg-gradient-to-br from-muted to-muted/50 relative">
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
                  <div className="w-20 h-20 bg-background/20 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-background/30 transition-colors">
                    <Play className="w-10 h-10 text-foreground" />
                  </div>
                </div>
              </div>
              
              {/* Live Learning tag - top left */}
              <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-2 flex items-center gap-2 border border-primary/20">
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