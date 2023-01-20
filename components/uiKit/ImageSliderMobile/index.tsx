import { FC, useRef } from 'react'
import { CarouselWarper } from './styles'
import { Carousel as AntCarousel } from 'antd'
import _ from 'lodash'
import { CarouselRef } from 'antd/lib/carousel'
import { IProductImages } from 'modules/products/interface'

interface IProps {
  images: IProductImages[]
}

export const ImageSliderMobile: FC<IProps> = ({ images }) => {
  const imagesSlider = useRef<CarouselRef>(null)

  return (
    <CarouselWarper>
      <div className="carouselHolder">
        <AntCarousel dots={{ className: 'dots' }} className="carousel" ref={imagesSlider}>
          {images.map(path => (
            <div key={path.thumbnail}>
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img src={path.original} alt="تصاویر بارگذاری نشده" />
              }
            </div>
          ))}
        </AntCarousel>
      </div>

      <div className="dotsHolder" />
    </CarouselWarper>
  )
}
