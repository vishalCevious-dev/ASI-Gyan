import React from "react";
import { FaLinkedin, FaTwitter, FaGithub, FaAward, FaUsers, FaBook, FaChalkboardTeacher } from "react-icons/fa";

const AboutUs: React.FC = () => {
  const benefits = [
    {
      title: "Certificate of Completion",
      description: "Earn a recognized certificate that adds value to your resume and showcases your expertise.",
      icon: <FaAward className="w-6 h-6" />
    },
    {
      title: "Networking Opportunities",
      description: "Connect with learners, industry professionals, and mentors to expand your professional network.",
      icon: <FaUsers className="w-6 h-6" />
    },
    {
      title: "Comprehensive Curriculum",
      description: "Learn practical, job-ready skills through a well-structured and detailed curriculum.",
      icon: <FaBook className="w-6 h-6" />
    },
    {
      title: "Expert Guidance",
      description: "Get mentorship and support from experienced instructors who guide you every step of the way.",
      icon: <FaChalkboardTeacher className="w-6 h-6" />
    },
  ];

  return (
    <section className="relative py-16 px-5 overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-background"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-10 w-20 h-20 rounded-full opacity-40 blur-xl bg-primary/20 animate-bounce"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full opacity-40 blur-xl bg-secondary/20 animate-bounce delay-1000"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full mb-8 bg-primary/10 border border-primary/20 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-primary mr-3 animate-ping"></div>
            <span className="text-sm font-semibold text-primary">About Me</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
             Why <span className="text-primary">ASI-Gyan?</span>
          </h2>

          <p className="text-sl max-w-4xl mx-auto leading-relaxed text-muted-foreground font-light">
            Discover the incredible benefits of learning with ASI-Gyan, where every course is designed <br/>to level up your skills and accelerate your career growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl p-8 bg-card border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-6">
                    {benefit.icon}
                  </div>

                  <h3 className="relative z-10 text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-sm relative z-10 text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Instructor */}
          <div className="sticky top-8">
            <div className="bg-card rounded-2xl border border-border/50 overflow-hidden group hover:shadow-3xl transition-all duration-500">
              <div className="relative overflow-hidden w-full aspect-[2/1] rounded-t-2xl">
                <img
                  src="https://media.licdn.com/dms/image/v2/D5603AQHYRbkjdXKbbA/profile-displayphoto-crop_800_800/B56ZlSHNhHHAAI-/0/1758019246994?e=1762387200&v=beta&t=IjdZnUvjSMzM0dOw_RBlvSGP_g0wsKFtJqS9d8aeXbY"
                  alt="Instructor Hemant"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent"></div>
                <div className="absolute bottom-5 left-5">
                  <h3 className="text-2xl font-bold text-white mb-2">Hemant</h3>
                  <p className="text-white/80">Senior Instructor & Mentor</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  <span className="font-semibold text-foreground">I started my journey:</span> 
                  In web design and development in 2010 at the age of 24. I transitioned into a full-time instructor and mentor in 2018.
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  <span className="font-semibold text-foreground">Through hands-on:</span> 
                  project-based courses, I simplify challenging topics and make them accessible to everyone.
                </p>

                <div className="flex gap-6 mb-6">
                  <a href="#" className="w-12 h-12 flex items-center justify-center rounded-xl bg-muted hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 shadow-sm">
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 flex items-center justify-center rounded-xl bg-muted hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 shadow-sm">
                    <FaTwitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 flex items-center justify-center rounded-xl bg-muted hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 shadow-sm">
                    <FaGithub className="w-5 h-5" />
                  </a>
                </div>

                <div className="text-right border-t border-border/50 pt-6">
                  <span className="font-cursive text-2xl text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Hemant
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
