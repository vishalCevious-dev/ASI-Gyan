const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            filter: 'brightness(1.15) contrast(1.15) saturate(1.05) drop-shadow(0 40px 100px rgba(0,0,0,0.6))',
            imageRendering: 'crisp-edges'
          }}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-black/80 backdrop-blur-[1px] pointer-events-none" />
      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-white"
          style={{ textShadow: '0 6px 30px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8)' }}>
          <span className="block">Learn AI. Build Skills.</span>
          <span className="block text-green-500">Transform Your Career.</span>
        </h1>
      </div>
    </section>
  );
};

export default Hero;