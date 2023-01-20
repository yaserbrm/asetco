import React from 'react'
import { BrandJsonLd } from 'next-seo'

export const BrandJsonLD = () => (
  <BrandJsonLd
    slogan="استکو یدک"
    id="https://www.asetcoyadak.com"
    logo="/assets/svg/common/asetcoLogo.svg"
    aggregateRating={{
      ratingValue: '5',
      ratingCount: '18',
    }}
  />
)
