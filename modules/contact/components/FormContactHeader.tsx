import React from 'react'

import { Typography } from 'antd'
import { FormContactTitleContainer } from '../styles'

const FormContactHeader = ({ title }: { title: string }) => {
  return (
    <FormContactTitleContainer>
      <Typography.Title level={3}>{title}</Typography.Title>
    </FormContactTitleContainer>
  )
}

export default FormContactHeader
