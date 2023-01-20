import React from 'react'

import { LocalBusinessJsonLd } from 'next-seo'

const LocalBusinessJsonLD = () => {
  return (
    <LocalBusinessJsonLd
      type="LocalBusiness "
      id="https://www.asetcoyadak.com"
      name="آستکو یدک"
      description="خرید و فروش قعطعات خودرو ,خودرو وارداتی و خودرو فرسوده"
      url="https://www.asetcoyadak.com"
      telephone="011-332 90 455"
      address={{
        streetAddress: 'Pasdaran Blvd., in front of Nimeh Shaaban Hospital, upper floor of Mazandaran reception hall ',
        addressLocality: 'sari',
        addressRegion: 'mazandran',
        postalCode: '95129',
        addressCountry: 'IRN',
      }}
      geo={{
        latitude: '37.293058',
        longitude: '-121.988331',
      }}
      images={[
        'https://example.com/photos/1x1/photo.jpg',
        'https://example.com/photos/4x3/photo.jpg',
        'https://example.com/photos/16x9/photo.jpg',
      ]}
      sameAs={['www.company-website-url1.dev', 'www.company-website-url2.dev', 'www.company-website-url3.dev']}
      openingHours={[
        {
          opens: '08:00',
          closes: '16:30',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday', 'Sunday'],
          validFrom: '2019-12-23',
          validThrough: '2030-04-02',
        },
      ]}
      rating={{
        ratingValue: '4.5',
        ratingCount: '2',
      }}
      review={[
        {
          author: 'John Doe',
          datePublished: '2021-05-04',
          name: 'A masterpiece of literature',
          reviewBody:
            'I really enjoyed this book. It captures the essential challenge people face as they try make sense of their lives and grow to adulthood.',
          reviewRating: {
            bestRating: '5',
            worstRating: '1',
            reviewAspect: 'Ambiance',
            ratingValue: '4',
          },
        },
      ]}
      makesOffer={[
        {
          priceSpecification: {
            type: 'UnitPriceSpecification',
            priceCurrency: 'IRRM',
          },
          itemOffered: {
            name: 'خرید خودرو وارداتی',
            description: '  خرید خودرو و قطعات وارداتی یا فرسوده به صورت انلاین',
          },
        },
        {
          priceSpecification: {
            type: 'UnitPriceSpecification',
            priceCurrency: 'IRRM',
          },
          itemOffered: {
            name: 'خرید خودرو فرسوده',
            description: '  خرید خودرو و قطعات وارداتی یا فرسوده به صورت انلاین',
          },
        },
        {
          priceSpecification: {
            type: 'UnitPriceSpecification',
            priceCurrency: 'IRRM',
          },
          itemOffered: {
            name: 'خرید قطعات خودرو',
            description: '  خرید خودرو و قطعات وارداتی یا فرسوده به صورت انلاین',
          },
        },
        {
          priceSpecification: {
            type: 'UnitPriceSpecification',
            priceCurrency: 'IRRM',
          },
          itemOffered: {
            name: 'فروش خودرو فرسوده',
            description: 'فروش خودرو فرسوده شما به صورت انلاین',
          },
        },
        {
          priceSpecification: {
            type: 'UnitPriceSpecification',
            priceCurrency: 'IRRM',
          },
          itemOffered: {
            name: 'استعلام قیمت  خودرو فرسوده',
            description: ' استعلام قیمت خودرو فرسوه شما',
          },
        },
      ]}
      areaServed={[
        {
          geoMidpoint: {
            latitude: '41.108237',
            longitude: '-80.642982',
          },
          geoRadius: '1000',
        },
        {
          geoMidpoint: {
            latitude: '51.108237',
            longitude: '-80.642982',
          },
          geoRadius: '1000',
        },
      ]}
      action={{
        actionName: 'potentialAction',
        actionType: 'ReviewAction',
        target: 'https://www.asetcoyadak.com/contact',
      }}
    />
  )
}

export default LocalBusinessJsonLD
