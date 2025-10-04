const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden mt-20">
      <div className="absolute inset-0">
        <picture>
          {/* WebP format for better quality and smaller size */}
          <source srcSet="/hero.gif" type="image/webp" />
          {/* Fallback to original GIF */}
          <img
            src="/hero.gif"
            alt="Hero animation"
            className="w-full h-full object-cover"
            style={{
              filter: 'brightness(1.15) contrast(1.15) saturate(1.05)',
              imageRendering: 'crisp-edges'
            }}
            loading="eager"
            decoding="async"
          />
        </picture>
      </div> 
    </section>
  );
};

export default Hero;