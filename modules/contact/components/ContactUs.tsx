import { Typography } from 'antd'
import React from 'react'
import { ConcatList, ConcatListItem } from '../styles'

import Image from 'next/image'
import { SocialMedia } from 'modules/layout/components'

const ContactUs = () => {
  return (
    <ConcatList>
      <ConcatListItem>
        <div className="text-right w-full">
          <Typography.Title level={5}>آدرس</Typography.Title>
          <h1 className="text-gray-400 font-normal">
            ساری بلوار پاسداران، روبه روی بیمارستان نیمه شعبان ، طبقه فوقانی تالار پذیرایی مازندران
          </h1>
        </div>

        <div className="contact-icon">
          <span className="material-icons text-4xl">location_on</span>
        </div>
      </ConcatListItem>

      <ConcatListItem>
        <div className="text-right flex flex-col flex-1">
          <Typography.Title level={5}>پشتیبانی</Typography.Title>
          <Typography.Text className="text-gray-400 font-normal">شنبه تا پنجشنبه 8:30 / 17</Typography.Text>
          <Typography.Link href="tel:011-332 90 455" className="mt-1 font-bold text-lg">
            {/* 011 - 332 90 455 */}
            011 - 33261578
          </Typography.Link>
        </div>

        <div className="contact-icon">
          <span className="material-icons text-4xl">support_agent</span>
        </div>
      </ConcatListItem>

      <ConcatListItem>
        <div className="text-right flex-1">
          <Typography.Title level={5}>ایمیل پشتیبانی</Typography.Title>
          <Typography.Link href="mailto:support@Asetco yadakd.com" className="email-text-gray">
            support@Asetco yadakd.com
          </Typography.Link>
        </div>

        <div className="contact-icon">
          <span className="material-icons text-4xl">email</span>
        </div>
      </ConcatListItem>

      <ConcatListItem>
        <div className="text-right flex-1">
          <Typography.Title level={5}>شبکه های اجتماعی</Typography.Title>

          <SocialMedia />
        </div>

        <div className="contact-icon">
          <Image src="/assets/svg/contact/speakerContact.svg" width={40} height={40} alt="speaker icon" />
        </div>
      </ConcatListItem>
    </ConcatList>
  )
}

export default ContactUs
