import { Col, Row, Space, Typography } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { ButtonUiKit } from 'components/uiKit/buttons'
import { formatNumberToCurrency } from 'helper/formatNumberToCurrency'
import { ImagePath } from 'helper/imagePath'
import Image from 'next/image'
import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeCount, deleteProduct } from 'store/actions/cart.action'
import { ICartItem } from 'store/reducers/cart.reducer'
import { OrderDetailCol, OrderImageCol } from '../styles/order.style'

interface IOrder {
  order: ICartItem
}

export const Order: FC<IOrder> = ({ order }) => {
  const { Title, Text } = Typography
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const dispatch = useDispatch()

  const raiseOrder = () => {
    dispatch(changeCount({ count: order.count + 1, pro_ID: order.product.p_ID }))
  }
  const lessOrder = () => {
    if (order.count === 1) {
      return
    }
    dispatch(changeCount({ count: order.count - 1, pro_ID: order.product.p_ID }))
  }
  const deleteOrder = () => {
    dispatch(deleteProduct(order.product.p_ID))
  }
  const modalHandler = () => {
    setShowDeleteModal(perv => !perv)
  }
  return (
    <Row className="sm:border sm:border-[#B9BBC2]  p-[8px]">
      <Modal title={null} visible={showDeleteModal} footer={null} onCancel={modalHandler} closable={false}>
        <div className="text-center mb-[32px]" dir="rtl">{`آیا مایل به حذف سفارش "${order.product.p_Name}" می باشید؟`}</div>
        <DeleteModalFooter
          onOk={() => {
            deleteOrder()
            modalHandler()
          }}
          onCancel={modalHandler}
        />
      </Modal>
      <OrderImageCol span={12}>
        <Image
          src={order.product.p_Path ? ImagePath(order.product.p_Path) : '/assets/png/defaultImg.png'}
          alt="cart"
          className="orderImage"
          layout="responsive"
          width={152}
          height={152}
          style={{ borderRadius: 16 }}
        />
      </OrderImageCol>
      <OrderDetailCol span={12}>
        <Title level={5} className="title">
          {order.product.p_Name}
        </Title>
        <Text className="model">مدل {order.product.p_Model}</Text>
        <br />
        <Text className="price">{formatNumberToCurrency(order.product.p_Price)} ریال</Text>

        <div className="cartDetailHolder">
          <div className="cartDetail">
            <div className="changeCounter">
              <span className="material-icons up" onClick={raiseOrder}>
                expand_less
              </span>
              <span className={`material-icons down ${order.count === 1 ? '!cursor-not-allowed' : ''}`} onClick={lessOrder}>
                keyboard_arrow_down
              </span>
            </div>
            <span className="counter">{order.count}</span>
            <span className="material-icons deleteIcon" onClick={() => setShowDeleteModal(perv => !perv)}>
              delete_forever
            </span>
          </div>
        </div>
      </OrderDetailCol>
    </Row>
  )
}

const DeleteModalFooter: FC<{ onCancel: () => void; onOk: () => void }> = ({ onCancel, onOk }) => {
  return (
    <div className="flex justify-center align-center gap-[16px]">
      <ButtonUiKit type="default" onClick={onCancel} className="!h-[32px] !rounded-[4px]">
        خیر
      </ButtonUiKit>
      <ButtonUiKit type="success" onClick={onOk} className="!h-[32px] !rounded-[4px]">
        بلی
      </ButtonUiKit>
    </div>
  )
}
