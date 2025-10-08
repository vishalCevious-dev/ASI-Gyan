import React from "react";

const heroContent = {
  title: "Learn AI. Build Projects.", // replaced original title
  subtitle: "Step-by-Step AI Learning", // replaced original subtitle
  tagline: "No matter your experience, start today!", // replaced tagline
  description: (
    <>
      Join thousands of learners and explore AI in simple steps.
      <br />
      Learn AI basics, practice prompts, make real projects, and grow your skills.
    </>
  ), // replaced description
  cta: "Start Learning", // replaced CTA
};

const Hero: React.FC = () => {
  const logoGreen = "#1DB954"; // brand green

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
            filter: "brightness(1.15) contrast(1.15) saturate(1.1)",
            imageRendering: "crisp-edges",
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
            textShadow: "0 6px 30px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)",
            animation: "fadeInUp 1s ease-out forwards",
          }}
        >
          {heroContent.title}
        </h1>

        {/* Subtitle */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-semibold"
          style={{
            color: logoGreen,
            animation: "fadeInUp 1.3s ease-out forwards",
            animationDelay: "0.3s",
          }}
        >
          {heroContent.subtitle}
        </h2>

        {/* Tagline */}
        <p
          className="text-white text-lg sm:text-xl md:text-2xl font-medium"
          style={{
            animation: "fadeInUp 1.6s ease-out forwards",
            animationDelay: "0.5s",
          }}
        >
          {heroContent.tagline}
        </p>

        {/* Description */}
        <p
          className="text-white text-base sm:text-sl max-w-3xl leading-relaxed"
          style={{
            animation: "fadeInUp 1.9s ease-out forwards",
            animationDelay: "0.7s",
          }}
        >
          {heroContent.description}
        </p>

        {/* CTA Button */}
        <a
          href="#courses"
          className="mt-4 inline-block font-semibold py-3 px-8 rounded-xl shadow-lg transition-transform transform hover:scale-105"
          style={{
            backgroundColor: logoGreen,
            color: "white",
            animation: "fadeInUp 2.2s ease-out forwards",
            animationDelay: "0.9s",
          }}
        >
          {heroContent.cta}
        </a>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
