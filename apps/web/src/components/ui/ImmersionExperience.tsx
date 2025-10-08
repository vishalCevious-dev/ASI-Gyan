import React from "react";

const ImmersionExperience: React.FC = () => {
  const logoGreen = "#1DB954"; // Logo green

  return (
    <section className="z-10 w-full bg-background py-10 px-5">
      <div className="flex flex-col items-center max-w-6xl mx-auto gap-8">
        {/* Subtitle */}
        <div
          className="inline-flex items-center px-4 py-2 rounded-full border"
          style={{
            backgroundColor: "rgba(29, 185, 84, 0.1)", // subtle green background
            borderColor: "rgba(29, 185, 84, 0.3)",   // subtle green border
          }}
        >
          <span className="text-sm font-medium" style={{ color: logoGreen }}>
            Real people. Real learning.
          </span>
        </div>

        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl font-bold mb-6 text-foreground text-center"
          style={{ lineHeight: "1.2" }}
        >
          Here's a Sneak Peek at <br /> Our Offline Immersion Experience
        </h2>

        {/* Image */}
        <div className="w-full mt-4 mb-8 rounded-2xl shadow-lg overflow-hidden">
          <img
            src="/immersive-experience.png"
            alt="Offline immersion experience"
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default ImmersionExperience;
