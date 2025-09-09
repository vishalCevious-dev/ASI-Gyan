import Header from "@/components/ui/header";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Courses from "@/components/sections/courses";
import Newsletter from "@/components/sections/newsletter";
import Blog from "@/components/sections/blog";
import Footer from "@/components/ui/footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Courses />
      <About />
      <Newsletter />
      <Blog />
      <Footer />
    </div>
  );
};

export default Index;
