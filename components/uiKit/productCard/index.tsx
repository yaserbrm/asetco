import { FC } from 'react'
import { Card } from 'antd'
import ContentCardTruckCars from './ContentCardTruckCars'
import { CardProductsStyles } from './style'
import { ICardProductProps } from './interfaces'
import { useRouter } from 'next/router'
import { ImagePath } from 'helper/imagePath'

const defaultImage = '/assets/png/defaultImg.png'
const ProductCard: FC<ICardProductProps> = ({ item, type }) => {
  const cardImage = item.p_Path !== '' ? ImagePath(item.p_Path) : defaultImage

  const router = useRouter()

  return (
    <CardProductsStyles>
      <Card
        hoverable
        className="cardAutoPart"
        cover={
          <div className="card-image-box">
            {
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cardImage} alt="card image" className="cardImage" />
            }
          </div>
        }
        onClick={() => router.push(`${router.pathname}/${item.p_ID.toString()}`)}
      >
        <ContentCardTruckCars item={item} type={type} />
      </Card>
    </CardProductsStyles>
  )
}

export default ProductCard
