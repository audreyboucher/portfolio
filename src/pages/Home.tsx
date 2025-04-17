import React from 'react';

import {
  SummarySection,
  AboutMeSection,
  SkillsSection,
  EducationSection,
  ExperiencesSection,
  ContactSection
} from '../components/sections';
import { Header, Footer } from '../components';

const Index = () => {
  return (
    <>
      <Header />
      <SummarySection />
      <AboutMeSection />
      <SkillsSection />
      <EducationSection />
      <ExperiencesSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Index;
