import type { FC } from 'react'

import { Header, SummarySection } from '@/components'
import { Loader } from '@/components/ui'

const Home: FC = () => (
  <main data-testid="home">
    <Loader />
    <Header />
    <SummarySection />
  </main>
)

export default Home