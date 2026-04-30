/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesGrid from './components/FeaturesGrid';
import ModelCarousel from './components/ModelCarousel';
import ProcessSection from './components/ProcessSection';
import IndustrySolutions from './components/IndustrySolutions';
import Testimonials from './components/Testimonials';
import WhyPartner from './components/WhyPartner';
import ImpactCTA from './components/ImpactCTA';
import StatsSection from './components/StatsSection';
import Projects from './components/Projects';
import FAQ from './components/FAQ';
import Services from './components/Services';
import LeadForm from './components/LeadForm';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import RobotAssistant from './components/RobotAssistant';
import AnimatedBackground from './components/AnimatedBackground';

export default function App() {
  return (
    <div className="min-h-screen text-brand-primary selection:bg-brand-accent/30 md:cursor-none relative">
      <AnimatedBackground />
      <CustomCursor />
      <RobotAssistant />
      <Navbar />
      <main>
        <Hero />
        <ModelCarousel />
        <Services />
        <ProcessSection />
        <IndustrySolutions />
        <Testimonials />
        <WhyPartner />
        <ImpactCTA />
        <StatsSection />
        <Projects />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
