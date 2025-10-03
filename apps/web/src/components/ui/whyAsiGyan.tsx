import React from "react";

const WhyASIGyan: React.FC = () => {
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
          {/* AI for All Stages tag */}
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-6 bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">AI for All Stages</span>
          </div>
          
          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Why ASI Gyan?
          </h2>
          
          {/* Description */}
          <p className="text-lg max-w-3xl mx-auto leading-relaxed text-muted-foreground">
            Discover how our comprehensive AI education platform transforms learning at every stage of your journey.
          </p>
        </div>

        {/* Infographic image */}
        <div className="flex justify-center">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/84e1c1e5fdd814e648688b83e520c0f3ade4c5ea?placeholderIfAbsent=true"
            alt="Why ASI Gyan infographic"
            className="w-full max-w-[1200px] object-contain aspect-[1.71] rounded-lg shadow-lg border border-border"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyASIGyan;
