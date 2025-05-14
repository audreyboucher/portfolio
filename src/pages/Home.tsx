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
import { Loader } from '../components/common/ui';

const Index = () => {
  return (
    <>
      <Loader />
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
