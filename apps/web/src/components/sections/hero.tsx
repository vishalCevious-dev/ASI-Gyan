const heroContent = {
  title: "Learn AI. Build Skills.",
  subtitle: "Transform Your Career.",
  tagline: "Made in Bharat, Scaling to the World 🌍",
  description: "Join the fastest-growing AI-skilled community—100M learners strong. Unlock opportunities, learn practical skills, and grow your career in AI.",
  cta: "Get Started"
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            filter: 'brightness(1.2) contrast(1.2) saturate(1.1)',
            imageRendering: 'crisp-edges'
          }}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-black/80 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center space-y-6">
        
        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-white"
          style={{
            textShadow: '0 6px 30px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)',
            animation: 'fadeInUp 1s ease-out forwards'
          }}
        >
          {heroContent.title}
        </h1>

        {/* Subtitle */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-green-500"
          style={{ animation: 'fadeInUp 1.3s ease-out forwards', animationDelay: '0.3s' }}
        >
          {heroContent.subtitle}
        </h2>

        {/* Tagline */}
        <p
          className="text-white text-lg sm:text-xl md:text-2xl font-medium"
          style={{ animation: 'fadeInUp 1.6s ease-out forwards', animationDelay: '0.5s' }}
        >
          {heroContent.tagline}
        </p>

        {/* Description */}
        <p
          className="text-white text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed"
          style={{ animation: 'fadeInUp 1.9s ease-out forwards', animationDelay: '0.7s' }}
        >
          {heroContent.description}
        </p>

        {/* CTA Button */}
        <a
          href="#courses"
          className="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-transform transform hover:scale-105"
          style={{ animation: 'fadeInUp 2.2s ease-out forwards', animationDelay: '0.9s' }}
        >
          {heroContent.cta}
        </a>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
