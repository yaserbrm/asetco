import { FC, useEffect, useState } from 'react'

import { Col, InputNumber, Modal, Row } from 'antd'

import ImageGallery from 'react-image-gallery'

import { DetailbasketIcon } from 'public/assets/svg/common/headerMenu'
import { ButtonUiKit } from 'components/uiKit/buttons'
import { deleteBasketItemIcon } from 'public/assets/svg/common/cardProduct'
import { useDispatch, useSelector } from 'react-redux'
import { IProductGetAll } from 'core/wcs/product'
import { changeCount, deleteProduct, insertCart } from 'store/actions/cart.action'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import { cartSelector } from 'store/selectors'
import { useDetailsContext } from 'pages/products/detailsContext'
import { ProductDetailStyle, DetailButton, DetailTitle } from './style'
import { IProductImages } from '../../interface'
import { ImportedCarDetailMobileScreen, DetailButtonMobile } from './MobileScreen.styled'
import useMediaQuery from 'hooks/mediaQuery'
import { ImageSliderMobile } from 'components/uiKit/ImageSliderMobile'
import { BackButton } from 'components/uiKit/backButton'
import { useRouter } from 'next/router'

const ProductDetail: FC = () => {
  const isMobileScreen = useMediaQuery('(max-width: 592px)')
  const [autoPartImages, setAutoPartImages] = useState<IProductImages[]>()
  const [countInCart, setCountInCart] = useState<number>(0)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedProduct, setSelectedProduct] = useState<IProductGetAll>({
    p_ID: 0,
    p_Name: '',
    p_NameEn: '',
    p_Model: '',
    p_Price: 0,
    p_Path: '',
    p_Date: '',
  })

  const router = useRouter()
  const dispatch = useDispatch()
  const cart = useSelector(cartSelector)
  const { productDetail } = useDetailsContext()

  const insertToCart = () => {
    dispatch(insertCart(selectedProduct))
    ToastAlert.info('به سبد سفارش شما اضافه شد.')
  }

  const handleIncreaseOrder = () => {
    dispatch(changeCount({ pro_ID: selectedProduct.p_ID, count: countInCart + 1 }))
    ToastAlert.info(`تعدادمحصول در سبد سفارش به ${countInCart + 1} افزایش یافت.`)
  }

  const handleDecreaseOrder = () => {
    dispatch(changeCount({ pro_ID: selectedProduct.p_ID, count: countInCart - 1 }))
    ToastAlert.info(`تعدادمحصول در سبد سفارش به ${countInCart - 1} کاهش یافت.`)
  }

  const deleteOrder = () => {
    setShowDeleteModal(false)
    setCountInCart(0)
    dispatch(deleteProduct(selectedProduct.p_ID))
  }
  useEffect(() => {
    if (cart) {
      cart.forEach(item => {
        if (item.product.p_ID === productDetail?.product?.product_ID) {
          setCountInCart(item.count)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])
  useEffect(() => {
    if (productDetail) {
      setAutoPartImages(
        productDetail?.listFiles?.map(file => ({
          original: process.env.NEXT_PUBLIC_GOD_FTP_SERVER + (file.pathFile || ''),
          thumbnail: process.env.NEXT_PUBLIC_GOD_FTP_SERVER + (file.pathFile || ''),
        })),
      )
      const path = productDetail.listFiles ? (productDetail.listFiles.length > 0 ? productDetail.listFiles[0].pathFile : '') : ''

      setSelectedProduct({
        p_ID: productDetail.product?.product_ID!,
        p_Name: productDetail.product?.product_Name!,
        p_NameEn: productDetail.product?.product_NameEn!,
        p_Model: productDetail.product?.product_Model!,
        p_Price: productDetail.productPrice?.productPrice_Price ?? 0,
        p_Path: path || '',
        p_Date: new Date().toString(),
      })
    }
  }, [productDetail])

  if (!productDetail) {
    return <></>
  }

  const mobileScreen = () => (
    <ImportedCarDetailMobileScreen>
      <Row justify="space-around" dir="rtl">
        <Col span={24} className="detailTitle">
          <section className="detailTitle__info">
            <div className="name">{productDetail?.product?.product_Name}</div>
            <div className="brand">{productDetail?.product?.product_Model}</div>
          </section>

          <BackButton onClick={() => router.back()} />
        </Col>

        <Col xs={24} lg={12}>
          {autoPartImages && autoPartImages.length > 0 && (
            <ProductDetailStyle>
              <div className="autoPart-image" dir="ltr">
                <ImageSliderMobile images={autoPartImages} />
              </div>
            </ProductDetailStyle>
          )}
        </Col>

        <Col span={24}>
          <ProductDetailStyle>
            <div
              dir="rtl"
              className="details-box pr-[24px]"
              dangerouslySetInnerHTML={{ __html: productDetail?.product?.product_Description || '' }}
            />
          </ProductDetailStyle>
        </Col>

        <DetailButtonMobile>
          {countInCart > 0 ? (
            <div className="ordered-box ">
              <div className="delete-increase-decrease">
                <div className="increase-decrease">
                  <ButtonUiKit type="link" onClick={handleIncreaseOrder} className="increase-decrease-btn">
                    <span className="material-icons">expand_less</span>
                  </ButtonUiKit>

                  <ButtonUiKit
                    type="link"
                    onClick={handleDecreaseOrder}
                    className="increase-decrease-btn"
                    disabled={countInCart === 1 ? true : false}
                  >
                    <span className="material-icons">expand_more</span>
                  </ButtonUiKit>
                </div>
                <div className="input-box">
                  <InputNumber
                    min={1}
                    value={countInCart}
                    bordered={false}
                    controls={false}
                    onChange={(value: number) => {
                      dispatch(changeCount({ pro_ID: selectedProduct.p_ID, count: value }))
                      ToastAlert.info(`تعدادمحصول در سبد سفارش به ${value} تغییر یافت.`)
                    }}
                    onKeyPress={event => {
                      if (!new RegExp(/[1-9]/).test(event.key)) {
                        event.preventDefault()
                      }
                    }}
                  />
                </div>
                <div className="delete-icon" onClick={() => setShowDeleteModal(true)}>
                  {deleteBasketItemIcon}
                </div>
              </div>
              <div className="description">
                <p>در سبد سفارش شما قرار گرفت.</p>
              </div>
            </div>
          ) : (
            <ButtonUiKit type="primary" className="button" onClick={() => insertToCart()}>
              ثبت در سبد سفارش
              <span>{DetailbasketIcon}</span>
            </ButtonUiKit>
          )}
        </DetailButtonMobile>
      </Row>
    </ImportedCarDetailMobileScreen>
  )

  const desktopScreen = () => (
    <Row justify="space-around" dir="rtl">
      <Col xs={23} lg={10}>
        <DetailTitle>
          <div className="name">{productDetail?.product?.product_Name}</div>
          <span className="px-1">,</span>
          <div className="brand">{productDetail?.product?.product_Model}</div>
        </DetailTitle>
        <ProductDetailStyle>
          <div
            dir="rtl"
            className="details-box pr-[24px]"
            dangerouslySetInnerHTML={{ __html: productDetail?.product?.product_Description || '' }}
          />
        </ProductDetailStyle>
        <DetailButton>
          {countInCart > 0 ? (
            <div className="ordered-box ">
              <div className="delete-increase-decrease">
                <div className="increase-decrease">
                  <ButtonUiKit type="link" onClick={handleIncreaseOrder} className="increase-decrease-btn">
                    <span className="material-icons">expand_less</span>
                  </ButtonUiKit>

                  <ButtonUiKit
                    type="link"
                    onClick={handleDecreaseOrder}
                    className="increase-decrease-btn"
                    disabled={countInCart === 1 ? true : false}
                  >
                    <span className="material-icons">expand_more</span>
                  </ButtonUiKit>
                </div>
                <div className="input-box">
                  <InputNumber
                    min={1}
                    value={countInCart}
                    bordered={false}
                    controls={false}
                    onChange={(value: number) => {
                      dispatch(changeCount({ pro_ID: selectedProduct.p_ID, count: value }))
                      ToastAlert.info(`تعدادمحصول در سبد سفارش به ${value} تغییر یافت.`)
                    }}
                    onKeyPress={event => {
                      if (!new RegExp(/[1-9]/).test(event.key)) {
                        event.preventDefault()
                      }
                    }}
                  />
                </div>
                <div className="delete-icon" onClick={() => setShowDeleteModal(true)}>
                  {deleteBasketItemIcon}
                </div>
              </div>
              <div className="description">
                <p>در سبد سفارش شما قرار گرفت.</p>
              </div>
            </div>
          ) : (
            <ButtonUiKit type="primary" className="button" onClick={() => insertToCart()}>
              ثبت در سبد سفارش
              <span>{DetailbasketIcon}</span>
            </ButtonUiKit>
          )}
        </DetailButton>
      </Col>
      <Col xs={23} lg={12}>
        <DetailTitle dir="ltr">
          <div className="name">{productDetail?.product?.product_NameEn}</div>
          <span className="px-1">,</span>
          <div className="brand">{productDetail?.product?.product_Model}</div>
        </DetailTitle>
        <ProductDetailStyle>
          <div className="autoPart-image" dir="ltr">
            {autoPartImages && autoPartImages.length > 0 ? (
              <ImageGallery
                showBullets={false}
                autoPlay={true}
                showPlayButton={false}
                showFullscreenButton={false}
                items={autoPartImages}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src="/assets/png/defaultImg.png" alt="default-image" />
            )}
          </div>
        </ProductDetailStyle>
        <div></div>
      </Col>
    </Row>
  )

  return (
    <>
      <Modal title={null} visible={showDeleteModal} footer={null} onCancel={() => setShowDeleteModal(false)} closable={false}>
        <div className="text-center mb-[32px]" dir="rtl">{`آیا مایل به حذف سفارش "${productDetail?.product?.product_Name}" می باشید؟`}</div>
        <div className="flex justify-center align-center gap-[16px]">
          <ButtonUiKit type="default" onClick={() => setShowDeleteModal(false)} className="!h-[32px] !rounded-[4px]">
            خیر
          </ButtonUiKit>
          <ButtonUiKit type="success" onClick={() => deleteOrder()} className="!h-[32px] !rounded-[4px]">
            بلی
          </ButtonUiKit>
        </div>
      </Modal>

      {isMobileScreen ? mobileScreen() : desktopScreen()}
    </>
  )
}

export default ProductDetail
