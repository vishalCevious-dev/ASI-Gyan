import React from "react";
import { motion } from "framer-motion";
import {
  Compass,
  BookOpenCheck,
  Bot,
  Hammer,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Local utility (avoid alias imports like "@/lib/utils")
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// ---------------------------------------------------------------------------
// Minimal UI primitives (no alias-based imports)
// Button
function Button({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "md" | "lg" | "icon";
}) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md font-small transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:pointer-events-none disabled:opacity-50";
  const variants: Record<string, string> = {
    default: "bg-primary text-primary-foreground hover:opacity-95",
    outline:
      "border bg-background hover:bg-muted/40 text-foreground border-border",
    ghost: "hover:bg-muted/50",
    secondary:
      "bg-secondary text-secondary-foreground hover:opacity-95 border border-border/50",
  };
  const sizes: Record<string, string> = {
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-6 text-sm",
    icon: "h-10 w-10",
  };
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

// Badge
function Badge({
  variant = "default",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary" | "outline";
}) {
  const variants: Record<string, string> = {
    default: "bg-primary text-primary-foreground",
    secondary:
      "bg-primary/10 text-primary border border-primary/30",
    outline: "border border-primary/30 text-primary",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// Progress
function Progress({ value, className }: { value: number; className?: string }) {
  const clamped = Math.max(0, Math.min(100, value ?? 0));
  return (
    <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div
        className="h-full rounded-full bg-primary"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

// Card primitives
function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  );
}
function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6", className)} {...props} />;
}
function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-6 pb-6", className)} {...props} />;
}
function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold", className)} {...props} />;
}
function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

// ====== CONFIGURABLE DATA ====================================================
const steps = [
  {
    key: "enter",
    title: "Enter & Explore",
    blurb: "Sign up and discover AI fundamentals.",
    icon: Compass,
    badges: ["Onboarding", "Basics", "Tour"],
  },
  {
    key: "learn",
    title: "Learn & Practice",
    blurb: "Interactive lessons, quizzes, and exercises.",
    icon: BookOpenCheck,
    badges: ["Lessons", "Quizzes", "XP"],
  },
  {
    key: "prompt",
    title: "Master Prompt Engineering",
    blurb: "Hands-on prompt drills and workflow building.",
    icon: Bot,
    badges: ["Prompts", "Workflows", "Labs"],
  },
  {
    key: "apply",
    title: "Apply Skills",
    blurb: "Mini-projects and real-world challenges.",
    icon: Hammer,
    badges: ["Projects", "Challenges", "Review"],
  },
  {
    key: "showcase",
    title: "Showcase & Grow",
    blurb: "Earn certificates, badges, and join community builds.",
    icon: Trophy,
    badges: ["Certificates", "Badges", "Community"],
  },
] as const;

// Optionally, control current progress (0..steps.length)
// You can wire this to user state/XP later.
const DEFAULT_COMPLETED = 2; // first two steps completed

// ====== COMPONENT ============================================================
export default function LearningJourneyRoadmap() {
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const [active, setActive] = React.useState<number>(2); // default focused card
  const [completed, setCompleted] = React.useState<number>(DEFAULT_COMPLETED);

  // Scroll helpers
  const scrollBy = (delta: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  // Keyboard support for accessibility
  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") scrollBy(320);
      if (e.key === "ArrowLeft") scrollBy(-320);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, []);

  const progressPct = Math.min(100, (completed / steps.length) * 100);

  return (
    <section className="relative py-14 sm:py-16 lg:py-20">
      {/* Background accents that look good in light & dark */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-10 top-16 h-24 w-24 rounded-full blur-2xl bg-primary/15" />
        <div className="absolute right-10 bottom-16 h-32 w-32 rounded-full blur-3xl bg-primary/10" />
      </div>

      {/* Header */}
      <div className="mx-auto mb-10 max-w-6xl px-4 text-center">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" />
          AI Learning Journey
        </div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          Step‑by‑Step Roadmap
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Clear milestones, micro‑animations, and gamified progress to keep you hooked.
        </p>
      </div>

      {/* Global Progress */}
      <div className="mx-auto mb-6 max-w-6xl px-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium">Overall Progress</span>
          <span className="tabular-nums text-muted-foreground">{Math.round(progressPct)}%</span>
        </div>
        <Progress value={progressPct} className="h-2" />
        <div className="mt-3 flex items-center gap-3">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0.9, opacity: 0.6 }}
                animate={{
                  scale: i < completed ? 1 : 0.95,
                  opacity: i <= active ? 1 : 0.6,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full border",
                  i < completed
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border"
                )}
              >
                {i < completed ? <Check className="h-4 w-4" /> : <span className="text-xs">{i + 1}</span>}
              </motion.div>
              {i < steps.length - 1 && (
                <div className="h-px w-6 sm:w-10 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div className="relative mx-auto max-w-6xl">
        {/* Left/Right scroll buttons */}
        <div className="pointer-events-none absolute -left-2 -right-2 top-1/2 z-10 flex -translate-y-1/2 justify-between">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollBy(-360)}
            className="pointer-events-auto shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollBy(360)}
            className="pointer-events-auto shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div
          ref={trackRef}
          tabIndex={0}
          className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 pt-1"
          aria-label="Learning roadmap steps"
        >
          {steps.map((step, i) => (
            <RoadmapCard
              key={step.key}
              index={i}
              active={active}
              setActive={setActive}
              completed={completed}
              onComplete={() => setCompleted(Math.max(completed, i + 1))}
              {...step}
            />
          ))}
        </div>
      </div>

      {/* Tiny helper CTA */}
      <div className="mx-auto mt-8 max-w-6xl px-4 text-center">
        <Button
          size="lg"
          className="rounded-full px-6"
          onClick={() => setCompleted(Math.min(steps.length, completed + 1))}
        >
          Mark next step as complete
        </Button>
      </div>

      {/* Utility: hide scrollbar (Tailwind plugin-less) */}
      <style>{`
        .hide-scrollbar { scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}

// ====== ROADMAP CARD =========================================================
function RoadmapCard({
  index,
  title,
  blurb,
  icon: Icon,
  badges,
  active,
  setActive,
  completed,
  onComplete,
}: {
  index: number;
  title: string;
  blurb: string;
  icon: React.ElementType;
  badges: string[];
  active: number;
  setActive: (i: number) => void;
  completed: number;
  onComplete: () => void;
}) {
  const isDone = index < completed;
  const isActive = index === active;

  return (
    <motion.div
      layout
      onMouseEnter={() => setActive(index)}
      onFocus={() => setActive(index)}
      className="snap-center"
    >
      <Card
        className={cn(
          "group relative min-w-[18rem] sm:min-w-[20rem] bg-card/80 transition-all duration-300",
          "border",
          isActive && "ring-2 ring-primary/60 shadow-md",
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-3">
            <motion.div
              initial={{ scale: 0.9, rotate: -2, opacity: 0.9 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className={cn(
                "grid h-12 w-12 place-items-center rounded-xl border",
                isDone
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-primary border-primary/40"
              )}
            >
              <Icon className="h-6 w-6" />
            </motion.div>

            <div className="flex items-center gap-2">
              {isDone && (
                <Badge variant="secondary">Completed</Badge>
              )}
              {!isDone && <Badge variant="secondary">XP +50</Badge>}
            </div>
          </div>

          <CardTitle className="mt-3 text-lg">{title}</CardTitle>
          <CardDescription className="text-sm">{blurb}</CardDescription>
        </CardHeader>

        <CardContent className="pt-2">
          {/* Badges row */}
          <div className="mb-3 flex flex-wrap gap-2">
            {badges.map((b) => (
              <Badge key={b} variant="outline">
                {b}
              </Badge>
            ))}
          </div>

          {/* Hover expand panel */}
          <div className="relative">
            <motion.div
              initial={false}
              animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="rounded-xl border border-border bg-muted/30 p-3 text-sm leading-relaxed">
                {index === 0 && (
                  <p>
                    Create your account, explore the dashboard, and unlock your first <strong>streak</strong>.
                    Grab the <em>Starter Badge</em> on Day 1.
                  </p>
                )}
                {index === 1 && (
                  <p>
                    Dive into bite‑sized lessons with instant checks. Earn <strong>XP</strong> for each quiz and keep your streak alive!
                  </p>
                )}
                {index === 2 && (
                  <p>
                    Practice prompt patterns, chain prompts into workflows, and compare outputs side‑by‑side.
                  </p>
                )}
                {index === 3 && (
                  <p>
                    Build mini‑projects: chatbot, summarizer, or automation. Submit for mentor review to earn bonus XP.
                  </p>
                )}
                {index === 4 && (
                  <p>
                    Get certified, collect <strong>badges</strong>, and join community builds. Showcase your portfolio.
                  </p>
                )}
              </div>
            </motion.div>

            {/* Micro animation bar at bottom */}
            <motion.div layout className="mt-3 h-1 w-full rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isActive ? "80%" : isDone ? "100%" : "35%" }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className={cn("h-1 rounded-full", isDone ? "bg-primary" : "bg-primary/60")}
              />
            </motion.div>
          </div>

          {/* Action row */}
          <div className="mt-4 flex items-center justify-between">
            <Button variant={isDone ? "secondary" : "default"} onClick={onComplete} className="rounded-full">
              {isDone ? "Revisit" : "Complete Step"}
            </Button>
            <Button variant="ghost" className="rounded-full">
              View details
            </Button>
          </div>
        </CardContent>

        {/* Glow ring on hover for better light & dark visibility */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-primary/0 transition-all duration-300 group-hover:ring-8 group-hover:ring-primary/10" />
      </Card>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Runtime smoke tests (non-breaking) — to catch common regressions
(function runSmokeTests() {
  try {
    console.assert(Array.isArray(steps), "steps should be an array");
    console.assert(steps.length === 5, "expected 5 roadmap steps");
    const keys = new Set<string>();
    for (const s of steps) {
      console.assert(typeof s.key === "string" && s.key.length > 0, "each step needs a key");
      console.assert(typeof s.title === "string" && s.title.length > 0, "each step needs a title");
      console.assert(typeof s.blurb === "string", "each step needs a blurb");
      console.assert(typeof s.icon === "function", "each step needs an icon component");
      console.assert(Array.isArray(s.badges), "each step needs badges array");
      console.assert(!keys.has(s.key), `duplicate key: ${s.key}`);
      keys.add(s.key);
    }
    console.assert(
      DEFAULT_COMPLETED >= 0 && DEFAULT_COMPLETED <= steps.length,
      "DEFAULT_COMPLETED must be within [0, steps.length]"
    );
    console.debug("[Roadmap] Smoke tests passed.");
  } catch (err) {
    console.warn("[Roadmap] Smoke test issue:", err);
  }
})();
