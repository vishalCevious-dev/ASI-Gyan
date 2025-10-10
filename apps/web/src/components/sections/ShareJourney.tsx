import { Button } from "@/components/ui/button";
import { Upload, Users, Video, Camera } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";

export default function ShareJourney() {
  const { isDark } = useTheme();
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
          <h2 className={`text-4xl lg:text-5xl font-bold leading-tight mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            Share Your Learning Journey with{" "}
            <span className={isDark ? "text-green-400" : "text-green-600"}>
              ASI Gyan
            </span>
          </h2>
          
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}>
            Upload your educational moments, community events, and learning experiences to inspire others on their knowledge journey.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="glassmorphism border-primary/20 hover:neon-glow transition-all duration-300 rounded-xl p-6">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
              isDark ? "bg-green-500/20" : "bg-green-100"
            }`}>
              <Camera className={`w-6 h-6 ${
                isDark ? "text-green-400" : "text-green-600"
              }`} />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>Share Photos</h3>
            <p className={`text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>Upload educational photos and learning moments</p>
          </div>

          <div className="glassmorphism border-primary/20 hover:neon-glow transition-all duration-300 rounded-xl p-6">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
              isDark ? "bg-green-500/20" : "bg-green-100"
            }`}>
              <Video className={`w-6 h-6 ${
                isDark ? "text-green-400" : "text-green-600"
              }`} />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>Upload Videos</h3>
            <p className={`text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>Share tutorials, presentations, and learning videos</p>
          </div>

          <div className="glassmorphism border-primary/20 hover:neon-glow transition-all duration-300 rounded-xl p-6">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
              isDark ? "bg-green-500/20" : "bg-green-100"
            }`}>
              <Users className={`w-6 h-6 ${
                isDark ? "text-green-400" : "text-green-600"
              }`} />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>Build Community</h3>
            <p className={`text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>Connect with learners and share knowledge together</p>
          </div>
        </div>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            size="lg" 
            className="bg-green-500 hover:bg-green-600 text-white font-semibold hover:scale-105 transition-transform rounded-xl shadow-lg px-6 py-3"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload to Gallery
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className={`rounded-xl px-6 py-3 font-semibold transition-all ${
              isDark 
                ? "border-green-500/50 text-green-400 hover:bg-green-500/10" 
                : "border-green-600/50 text-green-700 hover:bg-green-50"
            }`}
          >
            Join Community
          </Button>
        </div>

        {/* Statistics */}
        <div className="border-t border-primary/20 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className={`text-3xl font-bold mb-1 ${
                isDark ? "text-green-400" : "text-green-600"
              }`}>5K+</div>
              <div className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}>Active Contributors</div>
            </div>
            <div>
              <div className={`text-3xl font-bold mb-1 ${
                isDark ? "text-green-400" : "text-green-600"
              }`}>1.2K+</div>
              <div className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}>Content Uploaded</div>
            </div>
            <div>
              <div className={`text-3xl font-bold mb-1 ${
                isDark ? "text-green-400" : "text-green-600"
              }`}>50K+</div>
              <div className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}>Monthly Views</div>
            </div>
            <div>
              <div className={`text-3xl font-bold mb-1 ${
                isDark ? "text-green-400" : "text-green-600"
              }`}>98%</div>
              <div className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}>Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
