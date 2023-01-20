import { useRouter } from 'next/router'
import { Button, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { DetailTitleHeaderContainer } from '../style'
import { useTrackRecordsDetailsCtx } from '../context'
import { CurrentTable } from 'modules/trackRecordes/constant/page'

const DetailTitleHeader = () => {
  const router = useRouter()
  const { states } = useTrackRecordsDetailsCtx()
  const [pageText, setPageText] = useState<string>('')

  const { currentPage } = states

  useEffect(() => {
    switch (currentPage) {
      case CurrentTable.AUTO_PARTS:
        setPageText('قطعات وسایل نقلیه')
        break

      case CurrentTable.WORN_CARS:
        setPageText('خودرو فرسوده')
        break

      case CurrentTable.IMPORTED_CARS:
        setPageText('وسیله نقلیه وارداتی ')
        break
    }
  }, [currentPage])

  const backHander = () => router.back()

  return (
    <DetailTitleHeaderContainer>
      <Button className="backBtn" onClick={backHander}>
        <span className="material-icons">arrow_back</span>
      </Button>

      <Space direction="vertical" align="end" size={0}>
        <Typography.Title level={4}>پیگیری سوابق</Typography.Title>
        <Typography.Text className="text-current-page">{pageText}</Typography.Text>
      </Space>
    </DetailTitleHeaderContainer>
  )
}

export default DetailTitleHeader
