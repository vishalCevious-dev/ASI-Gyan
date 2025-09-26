import { Button } from "@/components/ui/button";
import { Upload, Users, Video, Camera } from "lucide-react";

export default function ShareJourney() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
      {/* Dotted pattern overlay at the top */}
      <div className="absolute top-0 left-0 right-0 h-1">
        <div className="h-full bg-repeat-x opacity-30" style={{
          backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }} />
      </div>

      <div className="relative container mx-auto px-6">
        {/* Main title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Share Your Learning Journey with{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              ASI Gyan
            </span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Upload your educational moments, community events, and learning experiences to inspire others on their knowledge journey.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Share Photos</h3>
            <p className="text-gray-300 text-sm">Upload educational photos and learning moments</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center mb-4">
              <Video className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Upload Videos</h3>
            <p className="text-gray-300 text-sm">Share tutorials, presentations, and learning videos</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Build Community</h3>
            <p className="text-gray-300 text-sm">Connect with learners and share knowledge together</p>
          </div>
        </div>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 rounded-lg px-6 py-3"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload to Gallery
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 rounded-lg px-6 py-3"
          >
            Join Community
          </Button>
        </div>

        {/* Statistics */}
        <div className="border-t border-slate-700/50 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">5K+</div>
              <div className="text-sm text-gray-300">Active Contributors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">1.2K+</div>
              <div className="text-sm text-gray-300">Content Uploaded</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">50K+</div>
              <div className="text-sm text-gray-300">Monthly Views</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-1">98%</div>
              <div className="text-sm text-gray-300">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
