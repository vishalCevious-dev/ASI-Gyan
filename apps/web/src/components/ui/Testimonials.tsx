import React, { useState, useRef } from "react";

interface TestimonialProps {
  name: string;
  content: string;
  hasIcon?: boolean;
  iconSrc?: string;
}

interface VideoTestimonialProps {
  name: string;
  title?: string;
  videoSrc: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({
  name,
  content,
  hasIcon,
  iconSrc,
}) => (
  <div className="group relative border border-border rounded-2xl p-6 bg-card text-foreground hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
    <h4 className="text-base font-semibold group-hover:text-primary transition-colors duration-300">{name}</h4>
    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{content}</p>

    {hasIcon && iconSrc && (
      <div className="absolute top-3 right-3 w-6 h-6">
        <img
          src={iconSrc}
          alt="icon"
          className="w-full h-full object-contain"
        />
      </div>
    )}
  </div>
);

const VideoTestimonialCard: React.FC<VideoTestimonialProps> = ({
  name,
  title,
  videoSrc,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
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
    <div className="group relative border border-border rounded-2xl overflow-hidden bg-card hover:shadow-2xl transition-transform duration-500 hover:scale-105">
      <div className="relative">
        {/* Video element */}
        <video
          ref={videoRef}
          className="w-full aspect-[16/9] md:aspect-[4/3] object-cover rounded-t-2xl cursor-pointer"
          muted
          preload="metadata"
          poster=""
          onClick={handleVideoClick}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Play button overlay - only show when video is not playing */}
        {!isPlaying && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors cursor-pointer"
            onClick={handleVideoClick}
          >
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
              <svg 
                className="w-8 h-8 text-gray-800 ml-1" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        )}

        {/* Pause indicator - show when video is playing */}
        {isPlaying && (
          <div className="absolute top-3 right-3">
            <div className="bg-black/70 rounded-full p-2">
              <svg 
                className="w-4 h-4 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M6 4h4v16H6zm8 0h4v16h-4z"/>
              </svg>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h4 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{name}</h4>
        {title && (
          <p className="text-sm text-muted-foreground mt-1">{title}</p>
        )}
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Chetan Sharma",
      content:
        "Team Outskill for the Generative AI Mastermind. It helped me open up to AI as tool for everyday life. Also thanks for all the resources...",
      hasIcon: true,
      iconSrc:
        "https://api.builder.io/api/v1/image/assets/TEMP/1fd16a8353d4937f3c22d02935da9ca4f248bef7?placeholderIfAbsent=true",
    },
    {
      name: "Kamal Kanagat",
      content:
        "This has been a phenomenal session. Thank you so much for sharing all the information and knowledge. It was indeed an eye opener.",
    },
    {
      name: "Jyoti Sunit Shukla",
      content:
        "Thank you for sharing this knowledge. You guys are doing fantastic job. Being non techie I still got to learn how to prepare PPT, create blog & posts :)",
      hasIcon: true,
      iconSrc:
        "https://api.builder.io/api/v1/image/assets/TEMP/d6f84fd6aa29343e089905aedce69d13fd49ed1c?placeholderIfAbsent=true",
    },
    {
      name: "Twinkle Soni",
      content:
        "Thank you. The last two days have been incredible and today towards the end the things did become overwhelming. The sessions were great and valuable.",
    },
  ];

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
          {/* Testimonials tag */}
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-6 bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">Hear it From Them</span>
          </div>
          
          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Ambitious People Love <span className="text-primary">ASI Gyan</span>
          </h2>
          
          {/* Description */}
          <p className="text-lg max-w-3xl mx-auto leading-relaxed text-muted-foreground">
            Discover what our community members say about their transformative learning experiences with ASI Gyan.
          </p>
        </div>

        {/* Grid Layout with equal spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Column 1 - Using space-y-6 for consistent gaps */}
          <div className="space-y-6">
            <VideoTestimonialCard
              name="Nathalie Ramanathansoa-frat"
              title="Entrepreneur & executive advisor"
              videoSrc="/videos/Video-502.mp4"
            />
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>

          {/* Column 2 - Using space-y-6 for consistent gaps */}
          <div className="space-y-6">
            <TestimonialCard
              name="Ashwath BM"
              content="Immense gratitude to the Outskill team, phenomenal mentors, and the powerhouse community..."
            />
            <TestimonialCard
              name="Yasmin Niazi"
              content="I had a fantastic experience at the two-day AI Mastermind event. It was an incredible opportunity..."
              hasIcon
              iconSrc="https://api.builder.io/api/v1/image/assets/TEMP/ea4ec06768c3163b6b5e3346d658c81a3bd9e61b?placeholderIfAbsent=true"
            />
            <TestimonialCard
              name="Priya Sharma"
              content="The AI Mastermind session was absolutely transformative! The practical insights and hands-on approach made complex concepts so much clearer."
            />
            <VideoTestimonialCard
              name="Neha Bapna"
              title="Marketing Operation expert"
              videoSrc="/videos/Video-604.mp4"
            />
            <TestimonialCard
              name="Shashank Aeligala"
              content="Thank you Outskill team. I've learnt a lot in these 2 days and looking forward to learn more about AI this year!"
            />
          </div>

          {/* Column 3 - Using space-y-6 for consistent gaps */}
          <div className="space-y-6">
            <TestimonialCard
              name="Parin Patel"
              content="A huge thank you to the entire Outskill Team and my fellow attendees for an incredible 2 Day AI Mastermind!"
              hasIcon
              iconSrc="https://api.builder.io/api/v1/image/assets/TEMP/fe2137467fae4db3828da8fd9c3ce0986e1930b1?placeholderIfAbsent=true"
            />
            <TestimonialCard
              name="Bhawna Mehra"
              content="First of all, I thank the entire Outskill and Outshine team and then to myself for keeping patience for this long..."
              hasIcon
              iconSrc="https://api.builder.io/api/v1/image/assets/TEMP/80446e8cb44773744235d0bb8bc19b49fc8a1427?placeholderIfAbsent=true"
            />
            <TestimonialCard
              name="Jay"
              content="Hello Outskill team Thank you guys for a fantastic 1+2 days. This was a weekend very well spent with great learning..."
            />
            <TestimonialCard
              name="Subhashini Nachimuthu"
              content="Thank you, divij. It was really very insightful. Especially for a beginner like me, helped me understand basics of AI & prompting techniques!"
              hasIcon
              iconSrc="https://api.builder.io/api/v1/image/assets/TEMP/f8643c0824cb50a555c34a717f1e9956891f438c?placeholderIfAbsent=true"
            />
            <VideoTestimonialCard
              name="Subhashini Nachimuthu"
              title="AI Enthusiast"
              videoSrc="/videos/Video-746.mp4"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;