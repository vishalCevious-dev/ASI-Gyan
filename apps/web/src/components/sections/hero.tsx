import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import heroRocket from "@/assets/hero-rocket.jpg";

const HEADLINE_LINE_ONE = ["Learn", "AI.", "Build", "Skills."] as const;
const HEADLINE_LINE_TWO = ["Transform", "Your", "Career."] as const;
const TAGLINE_WORDS = [
  "Made",
  "in",
  "Bharat,",
  "Scaling",
  "to",
  "the",
  "World",
] as const;
const VALUE_BADGES = [
  {
    text: "* Innovation",
    className: "border-primary text-primary bg-primary/10",
    delay: 1.2,
  },
  {
    text: "* Global Impact",
    className: "border-secondary text-secondary bg-secondary/10",
    delay: 1.3,
  },
  {
    text: "* Learning & Growth",
    className: "border-ai-green text-ai-green bg-ai-green/10",
    delay: 1.4,
  },
  {
    text: "* ASI Ethics",
    className: "border-accent text-accent bg-accent/10",
    delay: 1.5,
  },
] as const;
const TRUSTED_COMPANIES = ["Google", "Microsoft", "OpenAI", "Meta", "Tesla"] as const;
const SUPPORTING_COPY =
  "Join the fastest-growing AI-skilled community - 100M learners strong.";

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = (delay = 0, distance = 32, duration = 0.6) => ({
    initial: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : distance,
    },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: prefersReducedMotion ? 0 : delay,
      duration: prefersReducedMotion ? 0.01 : duration,
      ease: "easeOut" as const,
    },
  });

  const fadeIn = (delay = 0, duration = 0.6) => ({
    initial: { opacity: prefersReducedMotion ? 1 : 0 },
    animate: { opacity: 1 },
    transition: {
      delay: prefersReducedMotion ? 0 : delay,
      duration: prefersReducedMotion ? 0.01 : duration,
      ease: "easeOut" as const,
    },
  });

  const scaleIn = (delay = 0, duration = 0.6) => ({
    initial: {
      opacity: prefersReducedMotion ? 1 : 0,
      scale: prefersReducedMotion ? 1 : 0.95,
    },
    animate: { opacity: 1, scale: 1 },
    transition: {
      delay: prefersReducedMotion ? 0 : delay,
      duration: prefersReducedMotion ? 0.01 : duration,
      ease: "easeOut" as const,
    },
  });

  return (
    <section className="relative hidden min-h-screen overflow-hidden bg-space-depth md:flex md:items-center md:justify-center md:py-24">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{ backgroundImage: `url(${heroRocket})` }}
      />
      <div className="absolute inset-0 bg-neon-core opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/75 to-background/90 dark:from-black/70 dark:via-black/60 dark:to-black/70 backdrop-blur-sm" />

      <motion.div
        className="relative z-10 container mx-auto px-6 md:px-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0, duration: 0.8, ease: "easeInOut" as const }}
      >
        <motion.div className="max-w-6xl" {...fadeInUp(0.2, 56, 0.8)}>
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight max-w-4xl text-balance"
            {...fadeInUp(0.3, 50, 0.8)}
          >
            <motion.span {...fadeIn(0.5, 0.8)}>
              {HEADLINE_LINE_ONE.map((word, index) => (
                <motion.span
                  key={word}
                  className="inline-block mr-4"
                  {...fadeInUp(0.5 + index * 0.15, 20, 0.5)}
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
            <br />
            <motion.span
              className="bg-cyber-sheen bg-clip-text text-transparent inline-flex flex-wrap"
              {...scaleIn(1.2, 0.8)}
            >
              {HEADLINE_LINE_TWO.map((word, index) => (
                <motion.span
                  key={word}
                  className="inline-block mr-4"
                  {...scaleIn(1.4 + index * 0.15, 0.6)}
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-secondary mb-4 flex flex-wrap gap-2"
            {...fadeInUp(0.9, 16, 0.5)}
          >
            {TAGLINE_WORDS.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                className="inline-block"
                {...fadeInUp(0.9 + index * 0.1, 12, 0.4)}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          <motion.p
            className="text-lg text-foreground/80 mb-8 max-w-2xl"
            {...fadeInUp(1.3, 20, 0.6)}
          >
            {SUPPORTING_COPY}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 mb-12"
            {...fadeInUp(1.0, 24, 0.6)}
          >
            {VALUE_BADGES.map((badge) => (
              <motion.div
                key={badge.text}
                {...scaleIn(badge.delay, 0.4)}
                whileHover={
                  prefersReducedMotion ? undefined : { scale: 1.05 }
                }
              >
                <Badge variant="outline" className={badge.className}>
                  {badge.text}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-12"
            {...fadeInUp(1.6, 24, 0.6)}
          >
            <motion.div
              {...fadeInUp(1.8, 16, 0.5)}
              whileHover={
                prefersReducedMotion ? undefined : { scale: 1.05 }
              }
              whileTap={
                prefersReducedMotion ? undefined : { scale: 0.98 }
              }
            >
              <Button
                size="lg"
                className={cn(
                  "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-green px-8 py-4 text-lg",
                  !prefersReducedMotion && "animate-glow-pulse"
                )}
              >
                Explore Courses
              </Button>
            </motion.div>
            <motion.div
              {...fadeInUp(2.0, 16, 0.5)}
              whileHover={
                prefersReducedMotion ? undefined : { scale: 1.05 }
              }
              whileTap={
                prefersReducedMotion ? undefined : { scale: 0.98 }
              }
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

          <motion.div {...fadeInUp(2.0, 24, 0.6)}>
            <motion.p
              className="text-muted-foreground mb-6"
              {...fadeIn(2.2, 0.4)}
            >
              Trusted by professionals from:
            </motion.p>
            <div className="flex flex-wrap items-center gap-8 text-muted-foreground">
              {TRUSTED_COMPANIES.map((company, index) => (
                <motion.span
                  key={company}
                  className="text-lg font-medium hover:text-primary transition-colors cursor-pointer"
                  {...fadeInUp(2.3 + index * 0.1, 16, 0.4)}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { scale: 1.05, transition: { duration: 0.2 } }
                  }
                >
                  {company}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <div
        className={cn(
          "absolute top-20 right-10 hidden lg:block",
          !prefersReducedMotion && "animate-float"
        )}
      >
        <div className="w-4 h-4 bg-primary rounded-full shadow-glow-green" />
      </div>
      <div
        className={cn(
          "absolute bottom-20 left-10 hidden lg:block",
          !prefersReducedMotion && "animate-float"
        )}
        style={prefersReducedMotion ? undefined : { animationDelay: "2s" }}
      >
        <div className="w-3 h-3 bg-secondary rounded-full shadow-glow-cyan" />
      </div>
    </section>
  );
};

export default Hero;
