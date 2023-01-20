import Meta from 'components/uiKit/meta/meta'
import type { NextPage } from 'next'

import { HomePage } from 'modules/home'

const Home: NextPage = () => {
  return (
    <>
      <Meta
        title="سایت آستکو یدک"
        keywords="خودرو فرسوده, آستکو , استکو , آستکو یدک "
        ogImage="assets/png/home-page.jpg"
        ogUrl="https://www.asetcoyadak.com"
        ogTitle="سایت آستکو یدک"
        ogType="company"
      />
      <HomePage />
    </>
  )
}

export default Home
