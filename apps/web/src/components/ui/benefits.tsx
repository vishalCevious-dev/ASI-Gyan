import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Brain, Bot, Layers, Rocket } from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// Reusable UI components
function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-block rounded-full bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1 font-medium">{children}</span>;
}

function Card({ title, desc, level, icon: Icon }: { title: string; desc: string; level: string; icon: React.ElementType; }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true, amount: 0.3 }}
      className="group relative rounded-2xl backdrop-blur-md bg-white/20 dark:bg-black/30 border border-white/30 dark:border-white/10 shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:border-primary/40 hover:bg-white/30"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/30">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-2 flex-wrap">
        <Badge>{level}</Badge>
      </div>
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary/10 to-secondary/10 blur-xl" />
    </motion.div>
  );
}

export default function CoursesSection() {
  const courses = [
    {
      title: "AI Foundations",
      desc: "Learn the core principles of AI, ML, and deep learning.",
      level: "Beginner",
      icon: Brain,
    },
    {
      title: "Prompt Engineering Lab",
      desc: "Master prompt crafting with practical hands-on tasks.",
      level: "Prompt Engineering",
      icon: Bot,
    },
    {
      title: "Project-Based Learning",
      desc: "Build interactive AI tools and automation workflows.",
      level: "Intermediate",
      icon: Layers,
    },
    {
      title: "Capstone Challenge",
      desc: "Solve real-world problems and showcase your portfolio.",
      level: "Advanced",
      icon: Rocket,
    },
  ];

  return (
    <section className="relative py-20 px-5 overflow-hidden bg-background">
      {/* Background visuals */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
      <div className="absolute top-10 left-20 w-40 h-40 rounded-full bg-primary/20 blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-10 right-20 w-64 h-64 rounded-full bg-secondary/20 blur-3xl opacity-30 animate-pulse" />

      <div className="relative max-w-6xl mx-auto text-center mb-14">
        <div className="inline-flex items-center gap-2 mb-4 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
          <Sparkles className="h-4 w-4" /> Structured Courses
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Structured Courses for Real AI Skills</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Learn AI step-by-step with interactive labs, guided projects, and skill-level badges.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4"
      >
        {courses.map((course, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
          >
            <Card {...course} />
          </motion.div>
        ))}
      </motion.div>

      <div className="relative mt-12 text-center">
        <button className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:scale-105 transition-transform">
          Explore All Courses
        </button>
      </div>
    </section>
  );
}
