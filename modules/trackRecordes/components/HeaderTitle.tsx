import { Space, Typography } from 'antd'
import { ToastAlert } from 'components/uiKit/toastAlert/toastAlert'
import { useTrackRecordsService } from 'pages/track-records/context'
import React, { useCallback, useEffect, useState } from 'react'
import { IUserInfoTractRecords } from '../interfaces'
import { HeaderTitleContainer } from '../style'

const HeaderTitle = () => {
  const service = useTrackRecordsService()
  const [userInfo, setUserInfo] = useState<IUserInfoTractRecords>({
    fName: '-',
    lName: '-',
    mobile: '-',
  })

  const getUserInfoReq = useCallback(async () => {
    try {
      const { data } = await service.CommonService.getInfoUser()
      if (data?.user) {
        const { usr_FName, usr_LName, usr_Mobile } = data?.user
        setUserInfo({
          fName: usr_FName,
          lName: usr_LName,
          mobile: usr_Mobile,
        })
      }
    } catch {
      ToastAlert.error('خطا در دریافت اطلاعات کاربر')
    }
  }, [service])

  useEffect(() => {
    if (service) getUserInfoReq()
  }, [getUserInfoReq, service])

  return (
    <HeaderTitleContainer>
      <h1>پیگیری سوابق</h1>
      <Space direction="horizontal" size="small">
        <Typography.Text className="user-phoneNumber">{userInfo?.mobile}</Typography.Text>
        <Typography.Text className="user-name">{`${userInfo?.fName} ${userInfo?.lName}`}</Typography.Text>
      </Space>
    </HeaderTitleContainer>
  )
}

export default HeaderTitle
