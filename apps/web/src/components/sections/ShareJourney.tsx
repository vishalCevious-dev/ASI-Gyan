import { Button } from "@/components/ui/button";
import { Upload, Users, Video, Camera } from "lucide-react";

export default function ShareJourney() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background py-16">
      {/* Dotted pattern overlay at the top */}
      <div className="absolute top-0 left-0 right-0 h-1">
        <div className="h-full bg-repeat-x opacity-30" style={{
          backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-5">
        {/* Main title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            Share Your Learning Journey with{" "}
            <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              ASI Gyan
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your educational moments, community events, and learning experiences to inspire others on their knowledge journey.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="glassmorphism border-primary/20 hover:neon-glow transition-all duration-300 rounded-xl p-6">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Share Photos</h3>
            <p className="text-muted-foreground text-sm">Upload educational photos and learning moments</p>
          </div>

          <div className="glassmorphism border-primary/20 hover:neon-glow transition-all duration-300 rounded-xl p-6">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <Video className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Upload Videos</h3>
            <p className="text-muted-foreground text-sm">Share tutorials, presentations, and learning videos</p>
          </div>

          <div className="glassmorphism border-primary/20 hover:neon-glow transition-all duration-300 rounded-xl p-6">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Build Community</h3>
            <p className="text-muted-foreground text-sm">Connect with learners and share knowledge together</p>
          </div>
        </div>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            size="lg" 
            className="gradient-primary text-black font-medium hover:scale-105 transition-transform rounded-lg px-6 py-3"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload to Gallery
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary/30 text-foreground hover:bg-primary/10 rounded-lg px-6 py-3"
          >
            Join Community
          </Button>
        </div>

        {/* Statistics */}
        <div className="border-t border-primary/20 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-1">5K+</div>
              <div className="text-sm text-muted-foreground">Active Contributors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">1.2K+</div>
              <div className="text-sm text-muted-foreground">Content Uploaded</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">50K+</div>
              <div className="text-sm text-muted-foreground">Monthly Views</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
