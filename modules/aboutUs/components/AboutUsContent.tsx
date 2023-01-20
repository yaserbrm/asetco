import { Space, Typography } from 'antd'
import { FC } from 'react'
import { AboutUsDescriptionContainer, AboutUsTitle } from '../styles'

const { Paragraph } = Typography

const AboutUsContent: FC = () => {
  return (
    <Space direction="vertical" align="center" className="gap-0">
      <AboutUsTitle bgSrc={'/assets/svg/aboutUs/moonAboutUs.svg'}>
        <h2 className="subTitle">a b o u t</h2>

        <Space direction="horizontal" align="center" size={0}>
          <h1 className="title">ASETCO</h1>
          <span className="title-sub">YADAK</span>
        </Space>
      </AboutUsTitle>

      <AboutUsDescriptionContainer dir="rtl">
        <Paragraph className="mb-0">
          شرکت پیشگامان علم چشمه سرور از سال <b>1399</b> با گرد هم آمدن نیروی های باتجربه در فضای سنتی بازار خودرو و متخصصان دانش روز
          انفورماتیک فعالیت خود را با برند آستکو یدک
          <h2 className="hTag">
            <b> (ASETCO YADAK) </b>
          </h2>
          .در جهت ارائه خدمات خودرویی به مردم شریف ایران در بستر اینترنت آغاز کرد
        </Paragraph>
        <Paragraph className="mb-0">
          در واقع آستکو یدک یک مجموعه استارت آپی است که با تعداد زیادی ایده نو و کارآمد در نظر دارد بهترین شرایط را برای مالکان خودرو و
          فعلان در حوزه خدمات خودرویی فراهم کند ، که در گام اول فعالیت خود را با پروژه اسقاط تا واردات آغاز کرده است.
        </Paragraph>
        در این پروژه مالکان خودروهای فرسوده میتوانند از طریق پلتفرم هوشمند آستکو یدک اقدام به فروش خودرو های خود کنند.اما وجه تمایز آستکو
        یدک با دیگر مجموعه های مشابه در این است که تمام مراحل از جمله ثبت نام ، در یافت وجه و تحویل خودرو به صورت آنلاین صورت میگیرد و مالک
        نیازی به خارج شدن از منزل و مراجعه به مراکز اسقاط خودرو ندارد.
        <Paragraph className="mb-0">
          در بخش دوم این پروژه کسانی که تمایل دارند خودرو های وارداتی خریداری کنند هم میتوانند به صورت آنلاین و بدون نیاز به مراجعه به مراکز
          خاصی با استفاده از پلتفرم هوشمند آستکو یدک اقدام به ثبت سفارش و خرید خودروی مورد نظر کنند.
        </Paragraph>
      </AboutUsDescriptionContainer>
    </Space>
  )
}

export default AboutUsContent
