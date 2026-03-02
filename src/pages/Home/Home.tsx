import type { FC } from 'react'

import { Header, SummarySection, AboutMeSection, SkillsSection, EducationSection, ExperiencesSection, Footer } from '@/components'
import { Loader } from '@/components/ui'

const Home: FC = () => (
  <main data-testid="home">
    <Loader />
    <Header />
    <SummarySection />
    <AboutMeSection />
    <SkillsSection />
    <EducationSection />
    <ExperiencesSection />
    <Footer />
  </main>
)

export default Home