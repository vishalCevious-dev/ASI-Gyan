import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Courses = () => {
  return (
    <section id="courses" className="py-12 bg-background relative max-w-6xl mx-auto">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Explore Courses
          </h2>
          <p className="text-sl text-muted-foreground max-w-3xl mx-auto">
            Choose from our comprehensive range of AI courses designed to
            elevate <br /> your skills and accelerate your career in artificial
            intelligence.
          </p>
        </div>

        {/* CTA Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Explore Courses Card */}
          <div className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3"> Explore <span class="text-primary" > Courses </span></h3>
            <p className=" text-sm text-muted-foreground mb-4">
              Discover our comprehensive AI learning programs <br /> designed
              for every skill level.
            </p>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/courses">Browse Courses</Link>
            </Button>
          </div>

          {/* Coming Soon Card */}
          <div className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
            {/* Clock Icon in green */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Coming Soon</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Stay tuned for exciting new features and advanced <br /> AI
              specialization courses.
            </p>

            {/* Get Notified Button in green with hover */}
            <Button
              variant="outline"
              className="border-2 border-green-400 text-green-400 
                         bg-white/50 backdrop-blur-sm
                         hover:bg-green-400 hover:text-white hover:backdrop-blur-md
                         hover:shadow-[0_0_20px_rgba(40,167,69,0.6)]
                         transition-all duration-300 font-medium"
            >
              Get Notified
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
