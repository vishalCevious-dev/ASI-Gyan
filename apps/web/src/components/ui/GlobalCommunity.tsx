import React from "react";

const GlobalCommunity: React.FC = () => {
  return (
    <section className="flex flex-col gap-12 px-48 py-20 max-md:px-5 bg-[#081121] text-white">
      {/* Header */}
      <div className="max-w-4xl">
        <p className="uppercase text-base tracking-wider">LEARNERS FROM 30+ COUNTRIES</p>
        <h2 className="text-4xl font-medium mt-2 leading-snug">
          Join a Global Community
          <br />
          Shaping the Future of AI
        </h2>
      </div>

      {/* Main Content */}
      <div className="flex flex-wrap gap-6 justify-center">
        {/* Left Image */}
        <div className="relative flex-1 min-w-[300px] max-w-lg rounded-xl overflow-hidden border border-gray-600">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/9bbd8d7a1a4a920951e207e16e786501f284c91d?placeholderIfAbsent=true"
            alt="Global community background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/b123eb30e329f7e03bad627cbbed6c860c6edca5?placeholderIfAbsent=true"
            alt="Community visualization"
            className="relative w-full max-w-md mx-auto object-contain"
          />
        </div>

        {/* Right Column */}
        <div className="flex-1 min-w-[300px] max-w-2xl flex flex-col gap-4">
          {/* Community Stats Image */}
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/bdd817599ae6e5d926f1193106943d76ea4916b3?placeholderIfAbsent=true"
            alt="Community stats"
            className="w-full object-contain"
          />

          {/* Experience Cards */}
          <div className="flex flex-wrap gap-4">
            {/* Main Experience Card */}
            <div className="relative flex-1 min-w-[250px] rounded-xl overflow-hidden border border-gray-600 p-4">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/e0b906dd090ac9bf66f4f0c007f92e357cce2932?placeholderIfAbsent=true"
                alt="Experience statistics"
                className="w-full object-contain"
              />
              <div className="mt-[-200px] space-y-4">
                <p className="text-gray-300 text-base">
                  55% of our Community consists of Founders, Working Professionals, Students
                  and More.
                </p>

                {/* Bars */}
                <div className="space-y-2">
                  {[
                    { percent: "50%", years: "5-10 years", bg: "bg-cyan-400", w: "w-1/2" },
                    { percent: "40%", years: "10+ years", bg: "bg-cyan-400", w: "w-2/5" },
                    { percent: "10%", years: "0-2 years", bg: "bg-cyan-400", w: "w-1/10" },
                  ].map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className="border border-gray-500 rounded-l-md px-2 py-1 text-right">
                        <div className="font-bold">{item.percent}</div>
                        <div className="text-xs">{item.years}</div>
                      </div>
                      <div className={`${item.bg} absolute left-0 top-0 h-full rounded-l-md`} style={{ width: item.w }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trustpilot Card */}
            <div className="relative w-56 rounded-xl overflow-hidden border border-gray-600 p-4 flex flex-col items-center justify-center">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/38f8956fafa65689b042382e31cb6c6a1499bb37?placeholderIfAbsent=true"
                alt="Trustpilot rating background"
                className="absolute inset-0 w-full h-full object-contain"
              />
              <div className="relative z-10 flex flex-col items-center">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/835b1f3b3f83c14f5f55df07c97156cbf034148a?placeholderIfAbsent=true"
                  alt="Star rating"
                  className="w-12 mb-2"
                />
                <h4 className="font-bold text-lg">Trustpilot</h4>
                <p className="text-sm text-gray-300">Rated 4.9/5 (980)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalCommunity;
