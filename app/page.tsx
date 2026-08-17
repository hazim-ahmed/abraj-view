import Hero from "../components/home/Hero";
import AboutPreview from "../components/home/AboutPreview";
import WhyUs from "../components/home/WhyUs";
import ProjectsPreview from "../components/home/ProjectsPreview";
import VisionMission from "../components/home/VisionMission";
import Values from "../components/home/Values";
import CTA from "../components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <WhyUs />
      <ProjectsPreview />
      <VisionMission />
      <Values />
      <CTA />
    </>
  );
}
