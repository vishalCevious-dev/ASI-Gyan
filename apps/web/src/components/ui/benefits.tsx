import React from "react";

const Benefits: React.FC = () => {
  const benefits = [
    {
      title: "Built by Professionals",
      description: "Get the best Experience knowing that our Courses are built by Professionals.",
    },
    {
      title: "Completion Certificate",
      description: "Receive a Completion Award from our Team to enhance your motivation",
    },
    {
      title: "Instant Chat Help",
      description: "Have questions? Reach out for a quick chat—here for you 24/7",
    },
    {
      title: "Lifetime Membership",
      description: "With Just One Payment, you'll get Permanent Access to the Course.",
    },
    {
      title: "Access to Community",
      description: "Join Our Private Community to Connect with Like-Minded Individuals and Grow Together.",
    },
    {
      title: "Download for Offline Use",
      description: "Our courses can be downloaded, so you can watch them anytime, anywhere.",
    },
  ];

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
          {/* Benefits tag */}
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-6 bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">Benefits</span>
          </div>
          
          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Key Benefits of <span className="text-primary">Courses</span>
          </h2>
          
          {/* Description */}
          <p className="text-lg max-w-3xl mx-auto leading-relaxed text-muted-foreground">
            Explore the incredible advantages of enrolling in our courses and enhancing your skills for the ultimate career success.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group rounded-xl p-6 bg-card border border-primary/20 shadow-glow-green overflow-hidden 
                       transition-all duration-500 ease-out cursor-pointer
                       hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 hover:border-primary/60
                       hover:bg-gradient-to-br hover:from-card hover:to-card/90
                       transform hover:-translate-y-2 hover:rotate-1
                       relative before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br 
                       before:from-primary/5 before:to-transparent before:opacity-0 
                       hover:before:opacity-100 before:transition-opacity before:duration-500"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-muted
                            transition-all duration-500 ease-out
                            group-hover:bg-primary/20 group-hover:scale-125 group-hover:rotate-12
                            group-hover:shadow-lg group-hover:shadow-primary/25">
                <div className="w-6 h-6 rounded bg-primary/60 
                              transition-all duration-500 ease-out
                              group-hover:bg-primary group-hover:scale-125 group-hover:rotate-180
                              group-hover:shadow-md group-hover:shadow-primary/50"></div>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold mb-3 text-foreground
                            transition-all duration-500 ease-out
                            group-hover:text-primary group-hover:scale-105 group-hover:translate-x-1">
                {benefit.title}
              </h3>
              
              {/* Description */}
              <p className="leading-relaxed text-muted-foreground
                          transition-all duration-500 ease-out
                          group-hover:text-foreground/90 group-hover:translate-x-1">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
