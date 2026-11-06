import AboutCta from "@/components/About/AboutCta";
import AboutBenefits from "@/components/About/AboutBenefits";
import AboutHero from "@/components/About/AboutHero";
import AboutHowItWorks from "@/components/About/AboutHowItWorks";
import AboutMission from "@/components/About/AboutMission";
import AboutVision from "@/components/About/AboutVision";

const About = () => {
  return (
    <div>
      <AboutHero />
      <AboutMission />
      <AboutHowItWorks />
      <AboutBenefits />
      <AboutVision />
      <AboutCta />
    </div>
  );
};

export default About;
