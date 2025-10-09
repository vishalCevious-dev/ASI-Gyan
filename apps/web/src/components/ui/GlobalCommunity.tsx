import React from "react";

const GlobalCommunity: React.FC = () => {
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
          {/* Global Community tag */}
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-6 bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">Learners From 30+ Countries</span>
          </div>
          
          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground" style={{ lineHeight: '1.2' }}>
            Join a Global Community Shaping <br /> <span className="text-primary">The Future of AI </span>
          </h2>
          
          {/* Description */}
          <p className="text-sl max-w-3xl mx-auto leading-relaxed text-muted-foreground">
            Connect with learners, professionals, and AI enthusiasts from around <br/> the world in our thriving community.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 justify-center w-full">
          {/* Left Image */}
          <div className="relative flex-1 min-w-[300px] rounded-xl overflow-hidden border border-border aspect-[4/3]">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/9bbd8d7a1a4a920951e207e16e786501f284c91d?placeholderIfAbsent=true"
              alt="Global community background"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Right Column */}
          <div className="flex-1 min-w-[300px] flex flex-col gap-6">
            {/* Community Stats Image */}
            <div className="w-full bg-card rounded-xl overflow-hidden border border-border ">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/bdd817599ae6e5d926f1193106943d76ea4916b3?placeholderIfAbsent=true"
                alt="Community stats"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Experience Cards */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Main Experience Card */}
              <div className="relative flex-1 min-w-[250px] rounded-xl border border-border bg-card p-6">
                <div className="space-y-6">
                  <p className="text-foreground text-base leading-relaxed">
                    <strong> <span className="text-primary text-bold"> 55% of our Community </span> </strong> consists of Founders, Working Professionals, Students and More.
                  </p>

                  {/* Bars */}
                  <div className="space-y-3">
                    {[
                      { percent: "50%", years: "5-10 years experience", bg: "bg-cyan-500", width: "50%" },
                      { percent: "40%", years: "10+ years experience", bg: "bg-cyan-500", width: "40%" },
                      { percent: "10%", years: "0-2 years experience", bg: "bg-cyan-500", width: "10%" },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold text-foreground">{item.percent}</span>
                          <span className="text-muted-foreground">{item.years}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                          <div 
                            className={`${item.bg} h-full rounded-full transition-all duration-500`}
                            style={{ width: item.width }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trustpilot Card */}
              <div className="relative w-full sm:w-56 rounded-xl border border-border bg-card p-6 flex flex-col items-center justify-center text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <h4 className="font-bold text-lg text-foreground">Trustpilot</h4>
                  <p className="text-sm text-muted-foreground">Rated 4.9/5 (980 reviews)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalCommunity;