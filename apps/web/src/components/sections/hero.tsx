import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import heroRocket from "@/assets/hero-rocket.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex items-center justify-center bg-space-depth">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
        style={{ backgroundImage: `url(${heroRocket})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-neon-core opacity-20" />

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="max-w-6xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Mission Statement */}
          <motion.div
            className="mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Badge
                variant="secondary"
                className="bg-secondary/20 text-secondary border-secondary/30 mb-4"
              >
                🚀 AI Learning Revolution
              </Badge>
            </motion.div>
            <motion.p
              className="text-lg text-muted-foreground mb-6 max-w-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Empowering the next generation of AI leaders through innovation,
              global impact, and transformative learning experiences in
              Artificial Super-Intelligence
            </motion.p>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight max-w-4xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {["Learn", "AI.", "Build", "Skills."].map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.2,
                    ease: "easeOut",
                  }}
                  className="inline-block mr-4"
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
            <br />
            <motion.span
              className="bg-cyber-sheen bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              {["Transform", "Your", "Career."].map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, rotateX: 90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 1.5 + index * 0.15,
                    ease: "easeOut",
                  }}
                  className="inline-block mr-4"
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-xl md:text-2xl text-secondary mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.2 }}
          >
            {"Made in Bharat, Scaling to the World"
              .split("")
              .map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.05,
                    delay: 2.2 + index * 0.03,
                    ease: "easeOut",
                  }}
                  className={char === " " ? "inline-block w-2" : "inline-block"}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
          </motion.p>

          <motion.p
            className="text-lg text-muted-foreground mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.0 }}
          >
            {"Join the fastest-growing AI-skilled community—100M learners strong."
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.3,
                    delay: 3.0 + index * 0.08,
                    ease: "easeOut",
                  }}
                  className="inline-block mr-1"
                >
                  {word}
                </motion.span>
              ))}
          </motion.p>

          {/* Value Badges */}
          <motion.div
            className="flex flex-wrap gap-4 mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            {[
              {
                text: "• Innovation",
                className: "border-primary text-primary bg-primary/10",
                delay: 1.2,
              },
              {
                text: "• Global Impact",
                className: "border-secondary text-secondary bg-secondary/10",
                delay: 1.3,
              },
              {
                text: "• Learning & Growth",
                className: "border-ai-green text-ai-green bg-ai-green/10",
                delay: 1.4,
              },
              {
                text: "• ASI Ethics",
                className: "border-accent text-accent bg-accent/10",
                delay: 1.5,
              },
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: badge.delay }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge variant="outline" className={badge.className}>
                  {badge.text}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-12"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-green px-8 py-4 text-lg animate-glow-pulse"
              >
                Explore Courses
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.0 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10 px-8 py-4 text-lg"
              >
                For Business
              </Button>
            </motion.div>
          </motion.div>

          {/* Trusted By */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
          >
            <motion.p
              className="text-muted-foreground mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 2.6 }}
            >
              Trusted by professionals from:
            </motion.p>
            <div className="flex flex-wrap items-center gap-8 text-muted-foreground">
              {["Google", "Microsoft", "OpenAI", "Meta", "Tesla"].map(
                (company, index) => (
                  <motion.span
                    key={company}
                    className="text-lg font-medium hover:text-primary transition-colors cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 2.8 + index * 0.1,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {company}
                  </motion.span>
                ),
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Animation Element */}
      <div className="absolute top-20 right-10 animate-float hidden lg:block">
        <div className="w-4 h-4 bg-primary rounded-full shadow-glow-green" />
      </div>
      <div
        className="absolute bottom-20 left-10 animate-float hidden lg:block"
        style={{ animationDelay: "2s" }}
      >
        <div className="w-3 h-3 bg-secondary rounded-full shadow-glow-cyan" />
      </div>
    </section>
  );
};

export default Hero;
