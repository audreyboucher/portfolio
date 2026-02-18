import type { FC } from 'react'

import { Header, SummarySection, AboutMeSection } from '@/components'
import { Loader } from '@/components/ui'

const Home: FC = () => (
  <main data-testid="home">
    <Loader />
    <Header />
    <SummarySection />
    <AboutMeSection />
  </main>
)

export default Home