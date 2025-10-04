import React from "react";

const ImmersionExperience: React.FC = () => {
  return (
    <section className="z-10 w-full bg-background py-16 px-5">
      <div className="flex flex-col items-center max-w-6xl mx-auto gap-8">
        {/* Subtitle */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <span className="text-sm font-medium text-primary">Real people. Real learning.</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-[39px] font-medium leading-[50px] text-center max-w-3xl text-foreground">
          Here&apos;s a Sneak Peek at Our Offline Immersion Experience
        </h2>

        {/* Image with adjusted spacing */}
        <div className="w-full mt-4 mb-8 rounded-2xl shadow-lg overflow-hidden">
          <img
            src="/immersive-experience.png"
            alt="Offline immersion experience"
            // className="w-full h-auto object-contain aspect-[1.2] min-h-[600px] rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default ImmersionExperience;