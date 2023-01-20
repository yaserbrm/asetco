import { Typography } from 'antd'
import React from 'react'
import { HomeFooterTitleContainer } from '../styles/HomeFooterTitle'

const HomeFooterTitle = () => {
  return (
    <HomeFooterTitleContainer>
      <Typography.Title level={4} className="home_title">
        Asetco yadak
      </Typography.Title>
      <Typography.Text className="home_subtitle">Everywhere in IRAN</Typography.Text>
    </HomeFooterTitleContainer>
  )
}

export default HomeFooterTitle
