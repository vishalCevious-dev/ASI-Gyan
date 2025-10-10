import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

interface Testimonial {
  type: "text" | "video";
  name: string;
  title?: string;
  content?: string;
  videoSrc?: string;
  iconSrc?: string;
}

const testimonials: Testimonial[] = [
  {
    type: "video",
    name: "Nathalie Ramanathansoa-frat",
    title: "Entrepreneur & Executive Advisor",
    videoSrc: "/videos/Video-502.mp4",
  },
  {
    type: "text",
    name: "Chetan Sharma",
    content:
      "Team Outskill for the Generative AI Mastermind. It helped me open up to AI as a tool for everyday life. Also thanks for all the resources...",
  },
  {
    type: "text",
    name: "Jyoti Sunit Shukla",
    content:
      "Thank you for sharing this knowledge. You guys are doing a fantastic job. Being non-techie, I still learned how to prepare PPTs, create blogs, and posts!",
  },
  {
    type: "video",
    name: "Neha Bapna",
    title: "Marketing Operations Expert",
    videoSrc: "/videos/Video-604.mp4",
  },
  {
    type: "text",
    name: "Parin Patel",
    content:
      "A huge thank you to the entire Outskill Team and my fellow attendees for an incredible 2-Day AI Mastermind!",
  },
];

// ---------------------------------------------------------------
// VideoCard Component
const VideoCard: React.FC<{ t: Testimonial }> = ({ t }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      className="relative w-[320px] md:w-[420px] rounded-3xl overflow-hidden border 
      bg-white/40 dark:bg-white/10 backdrop-blur-xl border-white/30 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.1)]"
      whileHover={{ scale: 1.05 }}
    >
      <video
        ref={videoRef}
        className="w-full aspect-[16/9] object-cover cursor-pointer"
        onClick={togglePlay}
        muted
        preload="metadata"
      >
        <source src={t.videoSrc} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition cursor-pointer"
        onClick={togglePlay}
      >
        <div className="w-16 h-16 rounded-full bg-white/80 dark:bg-white/40 flex items-center justify-center backdrop-blur-md shadow-xl">
          {isPlaying ? (
            <Pause className="w-7 h-7 text-gray-900 dark:text-white" />
          ) : (
            <Play className="w-7 h-7 text-gray-900 dark:text-white ml-1" />
          )}
        </div>
      </div>

      <div className="p-5 text-center">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t.name}
        </h4>
        {t.title && (
          <p className="text-sm text-gray-600 dark:text-gray-300">{t.title}</p>
        )}
      </div>
    </motion.div>
  );
};

// ---------------------------------------------------------------
// TextCard Component
const TextCard: React.FC<{ t: Testimonial }> = ({ t }) => (
  <motion.div
    className="w-[320px] md:w-[420px] p-6 rounded-3xl border 
    bg-white/40 dark:bg-white/10 backdrop-blur-xl border-white/30 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.1)]"
    whileHover={{ scale: 1.05 }}
  >
    <p className="text-base leading-relaxed text-gray-800 dark:text-gray-200">
      {t.content}
    </p>
    <div className="mt-4">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
        {t.name}
      </h4>
      {t.title && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{t.title}</p>
      )}
    </div>
  </motion.div>
);

// ---------------------------------------------------------------
// Main Component
const Testimonials: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = () => setActive((p) => (p + 1) % testimonials.length);
  const prev = () =>
    setActive((p) => (p === 0 ? testimonials.length - 1 : p - 1));

  // 🌀 Auto-scroll logic
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      next();
    }, 4500); // 4.5s per scroll
    return () => clearInterval(interval);
  }, [paused, active]);

  return (
    <section
      className="relative py-24 bg-gray-100 dark:bg-neutral-900 overflow-hidden transition-colors duration-700"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background gradient and glass blobs */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-50 to-gray-200 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900"></div>
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/30 dark:bg-primary/20 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/30 dark:bg-secondary/20 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-5">
            <span className="text-primary text-sm font-medium">
              Hear it From Them
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            What Our Learners Say
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Experience the transformation through voices of our learners —
            inspiring journeys made possible with{" "}
            <span className="text-primary font-semibold">ASI Gyan</span>.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative h-[420px] flex items-center justify-center perspective-[1000px]">
          <AnimatePresence>
            {testimonials.map((t, i) => {
              const offset =
                (i - active + testimonials.length) % testimonials.length;
              const distance = Math.min(
                Math.abs(offset),
                testimonials.length - Math.abs(offset)
              );
              const zIndex = testimonials.length - distance;
              const rotateY =
                offset === 0
                  ? 0
                  : offset > testimonials.length / 2
                  ? -60
                  : 60;
              const translateX =
                offset * 250 -
                (offset > testimonials.length / 2
                  ? testimonials.length * 250
                  : 0);

              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ zIndex }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: distance <= 2 ? 1 : 0,
                    x: translateX,
                    scale: offset === 0 ? 1 : 0.85,
                    rotateY,
                    z: offset === 0 ? 0 : -200,
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  {t.type === "video" ? <VideoCard t={t} /> : <TextCard t={t} />}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-6 mt-12">
          <button
            onClick={prev}
            className="p-4 rounded-full bg-white/70 dark:bg-white/10 text-gray-800 dark:text-gray-200 hover:bg-primary hover:text-white transition-all shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="p-4 rounded-full bg-white/70 dark:bg-white/10 text-gray-800 dark:text-gray-200 hover:bg-primary hover:text-white transition-all shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === active
                  ? "bg-primary scale-110 shadow-md"
                  : "bg-gray-400 dark:bg-gray-500 hover:bg-primary/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
