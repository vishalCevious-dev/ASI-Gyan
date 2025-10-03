import React from "react";

const ImmersionExperience: React.FC = () => {
  return (
    <section className="z-10 w-full bg-background py-16 px-5">
      <div className="flex flex-col items-center max-w-6xl mx-auto gap-8">
        {/* Subtitle */}
        {/* <p className="text-base font-medium leading-6 tracking-[0.8px] uppercase text-foreground text-center">
          Real people. Real learning.
        </p> */}
        <div className="inline-flex items-center px-4 py-2 rounded-full mb-4 bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">Real people. Real learning.</span>
          </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-[39px] font-medium leading-[50px] text-center max-w-3xl text-foreground">
          Here&apos;s a Sneak Peek at Our Offline Immersion Experience
        </h2>

        {/* Image */}
        <div className="w-full border border-border rounded-2xl overflow-hidden">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/478fc3e3e3177a60af06c1ca364d91ce9451ab8a?placeholderIfAbsent=true"
            alt="Offline immersion experience"
            className="w-full h-auto object-contain aspect-[1.78]"
          />
        </div>
      </div>
    </section>
  );
};

export default ImmersionExperience;
