import Meta from 'components/uiKit/meta/meta'
import { useLoading } from 'hooks/useLoading'
import AboutUS from 'modules/aboutUs'
import { NextPage } from 'next'
import React, { useEffect } from 'react'

const AboutUsPage: NextPage = () => {
  const { setLoading } = useLoading()
  useEffect(() => {
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Meta
        title="سایت آستکو یدک / درباره ما "
        description="Asetco yadak application "
        keywords="خودرو فرسوده, آستکو , استکو , آستکو یدک "
        ogImage="assets/png/home-page.jpg"
        ogUrl="https://www.asetcoyadak.com"
        ogTitle="سایت آستکو یدک / درباره ما "
        ogType="company"
      />
      <AboutUS />
    </>
  )
}

export default AboutUsPage
