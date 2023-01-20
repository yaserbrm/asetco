import React, { FC } from 'react'
import { TitleContainerStyles } from 'modules/priceInquiry/style/carInformation'

interface ITitleProps {
  title: string
}

const TitleContainer: FC<ITitleProps> = ({ title }) => {
  return (
    <TitleContainerStyles>
      <h1>{title}</h1>
    </TitleContainerStyles>
  )
}

export default TitleContainer
