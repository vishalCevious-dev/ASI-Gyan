import React from "react";
import { useTheme } from "@/providers/theme-provider"; // assumes you use theme context

const WhyASIGyan: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section
      className={`relative py-14 px-5 overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-background" : "bg-[#f8f9fa]" // Light grey for light mode
      }`}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background pointer-events-none"></div>

      {/* Decorative gradient circles */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full opacity-30 blur-xl bg-green-400/30 dark:bg-primary/20"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full opacity-30 blur-xl bg-green-500/30 dark:bg-secondary/20"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Tag */}
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full mb-6 border transition-colors duration-500 ${
              isDark
                ? "border-primary bg-primary/10"
                : "border-green-500 bg-green-50"
            }`}
          >
            <span
              className={`text-sm font-medium ${
                isDark ? "text-primary" : "text-green-600"
              }`}
            >
              AI for All Stages
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            <span
              className={`transition-colors duration-500 ${
                isDark ? "text-primary" : "text-green-600"
              }`}
            >
              Why
            </span>{" "}
            ASI Gyan?
          </h2>

          {/* Description */}
          <p className="text-sl max-w-3xl mx-auto leading-relaxed text-muted-foreground">
            Discover how our comprehensive AI education platform transforms <br /> 
            learning at every stage of your journey.
          </p>
        </div>

        {/* Infographic Image */}
        <div className="flex justify-center">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/84e1c1e5fdd814e648688b83e520c0f3ade4c5ea?placeholderIfAbsent=true"
            alt="Why ASI Gyan infographic"
            className={`w-full max-w-[1200px] object-contain aspect-[1.71] rounded-2xl shadow-xl transition-all duration-500 border ${
              isDark
                ? "border-border shadow-primary/20"
                : "border-green-200 shadow-green-200/50"
            }`}
          />
        </div>
      </div>
    </section>
  );
};

export default WhyASIGyan;
