import { Typography } from 'antd'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { CardBannerBox, CardImagesBox, CardImagesButton, CardImagesTitleBox } from '../styles/cardImages'
import { Carousel } from 'antd'

interface ICardImagesProps {
  navigateLink: string
  images: string[]
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5
}

const CardImages: FC<ICardImagesProps> = ({ images, children, navigateLink, level = 2 }) => {
  const router = useRouter()

  const navigateHandler = () => router.push(navigateLink)

  return (
    <CardImagesBox hoverable={true} onClick={() => router.push(navigateLink)}>
      <CardBannerBox EllipsBg="/assets/png/home/EllipseHome.png">
        <section className="circle-bg">
          <Carousel dots={false} autoplay={true} effect="scrollx">
            {images?.map((image, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="card-banner" key={index} />
            ))}
          </Carousel>
        </section>
      </CardBannerBox>

      <CardImagesTitleBox>
        <div>{children}</div>
      </CardImagesTitleBox>

      <CardImagesButton>
        <span className="material-icons" onClick={navigateHandler}>
          east
        </span>
      </CardImagesButton>
    </CardImagesBox>
  )
}

export default CardImages
