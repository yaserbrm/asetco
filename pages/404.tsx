import { Col, Row } from 'antd'
import Meta from 'components/uiKit/meta/meta'
import { useLoading } from 'hooks/useLoading'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import styled from 'styled-components'

const Page404Container = styled.section`
  overflow: hidden;
  .errorTexts {
    text-align: center;
    &__title {
      font-size: 1rem;
      font-weight: bold;
    }

    &__backToHome {
      color: #40a9ff;
      font-weight: 700;
    }
  }
  .logo404 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Custom404: NextPage = () => {
  const { setLoading } = useLoading()
  useEffect(() => {
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Meta title="صفحه مورد نظر یافت نشد" description="page not found" ogTitle="صفحه مورد نظر یافت نشد" />

      <Page404Container>
        <Row justify="center" align="middle">
          <Col span={24} className="logo404">
            <Image src={'/assets/svg/common/error404.svg'} width={400} height={400} alt="404" />
          </Col>
          <Col span={24} className="errorTexts">
            <h1 className="errorTexts__title">متاسفانه صفحه مورد نظر یافت نشد!</h1>
            <p>
              <Link href="/" passHref>
                <a className="errorTexts__backToHome">بازگشت به صفحه اصلی</a>
              </Link>
            </p>
          </Col>
        </Row>
      </Page404Container>
    </>
  )
}

export default Custom404
