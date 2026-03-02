import type { FC } from 'react'

import { Header, SummarySection, AboutMeSection, SkillsSection, EducationSection } from '@/components'
import { Loader } from '@/components/ui'

const Home: FC = () => (
  <main data-testid="home">
    <Loader />
    <Header />
    <SummarySection />
    <AboutMeSection />
    <SkillsSection />
    <EducationSection />
  </main>
)

export default Home