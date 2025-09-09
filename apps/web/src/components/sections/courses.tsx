import { Button } from "@/components/ui/button";
const Courses = () => {
  // const courses = [{
  //   title: "AI Fundamentals Program",
  //   description: "Master the core concepts of Artificial Intelligence through hands-on projects and real-world applications.",
  //   duration: "8 Weeks",
  //   mode: "Online",
  //   level: "Beginner",
  //   highlights: ["Machine Learning Basics", "Neural Networks", "Python for AI", "Project Portfolio"]
  // }, {
  //   title: "Advanced AI Specialization",
  //   description: "Deep dive into advanced AI topics including deep learning, computer vision, and natural language processing.",
  //   duration: "12 Weeks",
  //   mode: "Hybrid",
  //   level: "Advanced",
  //   highlights: ["Deep Learning", "Computer Vision", "NLP", "AI Ethics"]
  // }, {
  //   title: "AI Leadership Track",
  //   description: "Strategic AI implementation for executives and team leaders driving organizational transformation.",
  //   duration: "6 Weeks",
  //   mode: "Executive",
  //   level: "Leadership",
  //   highlights: ["AI Strategy", "Team Management", "ROI Analysis", "Implementation"]
  // }];
  return (
    <section id="courses" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Explore Courses
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our comprehensive range of AI courses designed to
            elevate your skills and accelerate your career in artificial
            intelligence.
          </p>
        </div>

        {/* Courses Grid */}
        {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {courses.map((course, idx) => (
            <Card key={idx} className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow-green h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
                  <Badge variant="outline" className="border-secondary text-secondary bg-secondary/10">
                    {course.level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <p className="text-muted-foreground leading-relaxed">{course.description}</p>

                <div className="flex flex-wrap gap-2 text-sm">
                  <Badge variant="outline" className="border-border">⏱ {course.duration}</Badge>
                  <Badge variant="outline" className="border-border">🎯 {course.mode}</Badge>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2 text-foreground">Highlights</div>
                  <div className="flex flex-wrap gap-2">
                    {course.highlights.map((h) => (
                      <Badge key={h} variant="outline" className="border-muted text-muted-foreground">
                        {h}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Enroll Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div> */}

        {/* CTA Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
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
            <h3 className="text-xl font-semibold mb-3">Explore Courses</h3>
            <p className="text-muted-foreground mb-4">
              Discover our comprehensive AI learning programs designed for every
              skill level.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Browse Courses
            </Button>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-secondary"
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
            <p className="text-muted-foreground mb-4">
              Stay tuned for exciting new features and advanced AI
              specialization courses.
            </p>
            <Button
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10"
            >
              Get Notified
            </Button>
          </div>
        </div>

        {/* Additional Programs Section */}
        <div className="mt-20 text-center">
          <div className="bg-card border border-border rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Custom Enterprise Programs
            </h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Tailored AI training solutions for organizations looking to
              upskill their teams and drive digital transformation at scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10"
              >
                For Business
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Courses;
