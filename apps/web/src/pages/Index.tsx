import Header from "@/components/ui/header";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Courses from "@/components/sections/courses";
import Newsletter from "@/components/sections/newsletter";
import Blog from "@/components/sections/blog";
import Footer from "@/components/ui/footer";
import WhyASIGyan from "@/components/ui/whyAsiGyan";
import ImmersionExperience from "@/components/ui/ImmersionExperience";
import GlobalCommunity from "@/components/ui/GlobalCommunity";
import Testimonials from "@/components/ui/Testimonials";
import Benefits from "@/components/ui/benefits";
import AboutMe from "@/components/ui/aboutme";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <WhyASIGyan/>
      <ImmersionExperience/>
      <GlobalCommunity/>
      <Testimonials/>
      <Benefits/>
      <Blog/>
      <AboutMe/>
      <Courses />
      <About />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
