import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Innovation",
      description: "Cutting-edge AI curriculum designed for the future",
      gradient: "from-primary to-ai-green",
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Global Impact",
      description: "Scaling knowledge from Bharat to the world",
      gradient: "from-secondary to-digital-purple",
    },
    {
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
      title: "Transformation",
      description: "Real career advancement through practical AI skills",
      gradient: "from-accent to-primary",
    },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-5 py-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="text-4xl mb-4">🎓</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ASI Gyan - AI School of Entrepreneur
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Preparing the next generation of AI leaders through innovative
            education, practical skills, and transformative learning
            experiences.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <Card
              key={index}
              className="group relative border border-border rounded-2xl bg-card text-foreground hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3
                  className={`text-2xl font-bold mb-4 bg-gradient-to-r ${value.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}
                >
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Experience Levels */}
      </div>
    </section>
  );
};

export default About;