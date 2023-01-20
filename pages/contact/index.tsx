import Meta from 'components/uiKit/meta/meta'
import { useLoading } from 'hooks/useLoading'
import Contact from 'modules/contact'
import { NextPage } from 'next'
import React, { useEffect } from 'react'

import SecurityCodeContext from './context'

const ContactPage: NextPage = () => {
  const { setLoading } = useLoading()
  useEffect(() => {
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <SecurityCodeContext>
      <Meta
        title="سایت آستکو یدک / تماس با ما "
        description="Asetco yadak application "
        keywords="خودرو فرسوده, آستکو , استکو , آستکو یدک "
        ogImage="assets/png/home-page.jpg"
        ogUrl="https://www.asetcoyadak.com"
        ogTitle="سایت آستکو یدک / تماس با ما "
        ogType="company"
      />
      <Contact />
    </SecurityCodeContext>
  )
}

export default ContactPage
