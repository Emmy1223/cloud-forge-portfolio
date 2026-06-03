import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechMarquee from "@/components/sections/TechMarquee";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import GitHubActivity from "@/components/sections/GitHubActivity";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Certifications from "@/components/sections/Certifications";
import Learning from "@/components/sections/Learning";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import DownloadResume from "@/components/DownloadResume";
import AmbientSound from "@/components/AmbientSound";
import CodeRain from "@/components/CodeRain";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <CodeRain />
      <ThemeToggle />
      <DownloadResume />
      <AmbientSound />
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Projects />
        <GitHubActivity />
        <Experience />
        <Education />
        <Certifications />
        <Learning />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;


