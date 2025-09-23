import React from "react";

const WhyASIGyan: React.FC = () => {
  return (
    <section className="bg-[#081121] flex w-full flex-col items-center text-white font-medium justify-center py-16 px-5">
      <div className="flex w-full max-w-6xl flex-col items-center text-center">
        {/* Subtitle */}
        <div className="text-base font-medium leading-6 tracking-wide uppercase">
          AI for All Stages
        </div>

        {/* Main heading */}
        <h2 className="text-4xl md:text-[42px] font-medium leading-snug mt-4 md:mt-6">
          Why ASI Gyan?
        </h2>

        {/* Infographic image */}
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/84e1c1e5fdd814e648688b83e520c0f3ade4c5ea?placeholderIfAbsent=true"
          alt="Why ASI Gyan infographic"
          className="w-full max-w-[1200px] mt-8 md:mt-10 object-contain aspect-[1.71]"
        />
      </div>
    </section>
  );
};

export default WhyASIGyan;
