import React from "react";

const WhyASIGyan: React.FC = () => {
  const logoGreen = "#1DB954"; // Logo green

  return (
    <section className="relative py-16 px-5 overflow-hidden bg-background">
      {/* Background gradient (gray) */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right bottom, rgba(128,128,128,0.125), rgba(128,128,128,0.063), rgba(128,128,128,0.125))`,
        }}
      ></div>

      {/* Decorative elements */}
      <div
        className="absolute top-20 left-10 w-20 h-20 rounded-full opacity-30 blur-xl"
        style={{ backgroundColor: "rgba(128,128,128,0.1)" }}
      ></div>
      <div
        className="absolute bottom-20 right-10 w-32 h-32 rounded-full opacity-30 blur-xl"
        style={{ backgroundColor: "rgba(128,128,128,0.1)" }}
      ></div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* AI for All Stages tag (green) */}
          <div
            className="inline-flex items-center px-4 py-2 rounded-full mb-6 border"
            style={{ backgroundColor: `${logoGreen}20`, borderColor: `${logoGreen}40` }}
          >
            <span className="text-sm font-medium" style={{ color: logoGreen }}>
              AI for Everyone
            </span>
          </div>

          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            <span className="text-primary">Why</span> ASI Gyan?
          </h2>

          {/* Description with beginner-friendly language */}
          <p className="text-sl max-w-3xl mx-auto leading-relaxed text-muted-foreground">
            Learn AI step by step, no matter your experience. 
            <br />
            Practice with real projects, try AI prompts, and join a friendly community to grow your skills.
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
