import { FC } from 'react'
import { FooterWarper } from './styles'
import { Col, Row } from 'antd'
import { Footer } from 'antd/lib/layout/layout'

import { SocialMedia } from './components'
import { useRouter } from 'next/router'

export const MainFooter: FC = () => {
  const router = useRouter()
  return (
    <FooterWarper>
      <Footer className="footer">
        <Row align="middle">
          <Col xs={{ span: 12, order: 1 }} lg={{ span: 4, order: 1 }} className={'enamadLogos '}>
            <div>
              {
                // eslint-disable-next-line react/jsx-no-target-blank
                <a referrerPolicy="origin" target="_blank" href="https://trustseal.enamad.ir/?id=189451&amp;Code=TLpyB1eh6YaOs3F8vvBG">
                  {
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      referrerPolicy="origin"
                      src="https://Trustseal.eNamad.ir/logo.aspx?id=189451&amp;Code=TLpyB1eh6YaOs3F8vvBG"
                      alt=""
                      style={{ cursor: 'pointer', width: 67 }}
                      id="TLpyB1eh6YaOs3F8vvBG"
                    />
                  }
                </a>
              }
            </div>
            <div>
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxwYXRoIGQ9Im0xMjAgMjQzbDk0LTU0IDAtMTA5IC05NCA1NCAwIDEwOSAwIDB6IiBmaWxsPSIjODA4Mjg1Ii8+Cgk8cGF0aCBkPSJtMTIwIDI1NGwtMTAzLTYwIDAtMTE5IDEwMy02MCAxMDMgNjAgMCAxMTkgLTEwMyA2MHoiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS13aWR0aDo1O3N0cm9rZTojMDBhZWVmIi8+Cgk8cGF0aCBkPSJtMjE0IDgwbC05NC01NCAtOTQgNTQgOTQgNTQgOTQtNTR6IiBmaWxsPSIjMDBhZWVmIi8+Cgk8cGF0aCBkPSJtMjYgODBsMCAxMDkgOTQgNTQgMC0xMDkgLTk0LTU0IDAgMHoiIGZpbGw9IiM1ODU5NWIiLz4KCTxwYXRoIGQ9Im0xMjAgMTU3bDQ3LTI3IDAtMjMgLTQ3LTI3IC00NyAyNyAwIDU0IDQ3IDI3IDQ3LTI3IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MTU7c3Ryb2tlOiNmZmYiLz4KCTx0ZXh0IHg9IjE1IiB5PSIzMDAiIGZvbnQtc2l6ZT0iMjVweCIgZm9udC1mYW1pbHk9IidCIFlla2FuJyIgc3R5bGU9ImZpbGw6IzI5Mjk1Mjtmb250LXdlaWdodDpib2xkIj7Yudi22Ygg2KfYqtit2KfYr9uM2Ycg2qnYtNmI2LHbjDwvdGV4dD4KCTx0ZXh0IHg9IjgiIHk9IjM0MyIgZm9udC1zaXplPSIyNXB4IiBmb250LWZhbWlseT0iJ0IgWWVrYW4nIiBzdHlsZT0iZmlsbDojMjkyOTUyO2ZvbnQtd2VpZ2h0OmJvbGQiPtqp2LPYqCDZiCDaqdin2LHZh9in24wg2YXYrNin2LLbjDwvdGV4dD4KPC9zdmc+ "
                  alt=""
                  // onclick=""
                  onClick={() =>
                    window.open(
                      'https://ecunion.ir/verify/asetcoyadak.com?token=32649955fce123d53840',
                      'Popup',
                      'toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30',
                    )
                  }
                  style={{ cursor: 'pointer', width: '48px' }}
                />
              }
            </div>
          </Col>
          <Col xs={{ span: 24, order: 3 }} lg={{ span: 16, order: 2 }} dir="rtl">
            <div className="policies">
              {' کلیه حقوق این سایت متعلق به مجموعه'} <span className="companyName">آستکو یدک</span> {' میباشد. '}
            </div>
          </Col>
          <Col xs={{ span: 12, order: 2 }} lg={{ span: 4 }}>
            <SocialMedia />
          </Col>
        </Row>
      </Footer>
    </FooterWarper>
  )
}
