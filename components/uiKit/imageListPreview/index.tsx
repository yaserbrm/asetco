import { FC, useEffect, useRef } from 'react'
import { CarouselWarper } from './styles'
import { Carousel as AntCarousel } from 'antd'
import _ from 'lodash'
import { IFileWorn } from 'core/wcs/wornMaster'
import { nextIcon, prevIcon } from './icons'
import { CarouselRef } from 'antd/lib/carousel'
import { ImagePath } from 'helper/imagePath'

interface IProps {
  images: IFileWorn[]
  imagePreviewCurrentImage?: string
}

export const ImageListPreview: FC<IProps> = ({ images }) => {
  const imagesSlider = useRef<CarouselRef>(null)

  return (
    <CarouselWarper>
      <div className="carouselHolder">
        <AntCarousel dots={{ className: 'dots' }} className="carousel" ref={imagesSlider}>
          {images.map(path => (
            <div key={path.annex_Id} id={String(path.annex_Id)}>
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img src={ImagePath(path?.pathFile || '')} alt="تصاویر بارپزاری شده" />
              }
            </div>
          ))}
        </AntCarousel>
      </div>
      {images.length > 1 && (
        <>
          <span className="next" onClick={() => imagesSlider.current?.next()}>
            {nextIcon}
          </span>
          <span className="prev" onClick={() => imagesSlider.current?.prev()}>
            {prevIcon}
          </span>
        </>
      )}
      <div className="dotsHolder" />
    </CarouselWarper>
  )
}
