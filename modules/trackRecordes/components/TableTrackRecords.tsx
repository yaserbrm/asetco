import React, { FC, useEffect } from 'react'

import Pagination from 'components/uiKit/pagination'
import { TableUiKit } from 'components/uiKit/table'

import { TableTrackRecordsContainer } from '../style'
import { ColumnType } from 'rc-table/lib/interface'
import { ITableData } from 'components/uiKit/table/interfaces'
import TitleTableCol from './TitleTableCol'
import { useTractRecordsStateCtx } from '../context'
import { Popover, Spin } from 'antd'
import { CurrentTable } from '../constant/page'
import useMediaQuery from 'hooks/mediaQuery'
import { IObject } from 'interfaces/IObject'
import { useRouter } from 'next/router'
import { scrollToTop } from 'helper/scrollToTop'

const TableTrackRecords: FC = () => {
  const { dataSource, paginationTotal, filterArg, setFilterArgHandler, loading, activePage } = useTractRecordsStateCtx()
  const isMobileScreen = useMediaQuery('(max-width:592px)')
  const router = useRouter()

  const desktopScreenColumns = {
    columnsWornCarsTable: [
      {
        dataIndex: 'name',
        key: 'name',
        title: <TitleTableCol title="نام خودرو" dataIndex="name" sortAble={true} setFilterArg={setFilterArgHandler} />,
        width: '198px',
        fixed: 'left',
      },
      {
        dataIndex: 'date',
        key: 'date',
        title: <TitleTableCol title="تاریخ ثبت" dataIndex="date" sortAble={true} setFilterArg={setFilterArgHandler} />,
        width: '115px',
      },
      {
        dataIndex: 'suggestedPrices',
        key: 'suggestedPrices',
        title: (
          <TitleTableCol title="قیمت های پیشنهادی (ریال)" dataIndex="suggestedPrices" sortAble={false} setFilterArg={setFilterArgHandler} />
        ),
        width: '200px',
      },
      {
        dataIndex: 'buyAmount',
        key: 'buyAmount',
        title: <TitleTableCol title="قیمت خرید (ریال)" dataIndex="buyAmount" sortAble={false} setFilterArg={setFilterArgHandler} />,
        width: '121px',
      },
      {
        dataIndex: 'preAmount',
        key: 'preAmount',
        title: <TitleTableCol title="پیش پرداخت (ریال)" dataIndex="preAmount" sortAble={false} setFilterArg={setFilterArgHandler} />,
        width: '131px',
      },
      {
        dataIndex: 'remaining',
        key: 'remaining',
        title: <TitleTableCol title="مانده (ریال)" dataIndex="remaining" sortAble={false} setFilterArg={setFilterArgHandler} />,
        width: '104px',
      },
      {
        dataIndex: 'otherPayed',
        key: 'otherPayed',
        title: <TitleTableCol title="سایر هزینه‌ها (ریال)" dataIndex="otherPayed" sortAble={false} setFilterArg={setFilterArgHandler} />,
        width: '131px',
      },
      {
        dataIndex: 'parking',
        key: 'parking',
        title: <TitleTableCol title="پارکینگ" dataIndex="parking" sortAble={true} setFilterArg={setFilterArgHandler} />,
        width: '102px',
      },
      {
        dataIndex: 'agentName',
        key: 'agentName',
        title: <TitleTableCol title="نماینده" dataIndex="agentName" sortAble={true} setFilterArg={setFilterArgHandler} />,
        width: '136px',
      },
      {
        dataIndex: 'photos',
        key: 'photos',
        title: <TitleTableCol title="تصاویر ارسالی" dataIndex="photos" sortAble={false} setFilterArg={setFilterArgHandler} />,
        width: '103px',
      },
      {
        dataIndex: 'carState',
        key: 'carState',
        width: '131px',
        title: <TitleTableCol title="وضعیت نهایی" dataIndex="carState" sortAble={true} setFilterArg={setFilterArgHandler} />,
      },
    ],
    columnsImportedCarsTable: [
      {
        dataIndex: 'name',
        key: 'name',
        title: <TitleTableCol title="نام خودرو" dataIndex="name" sortAble={true} setFilterArg={setFilterArgHandler} />,
        width: '226px',
        fixed: 'left',
      },
      {
        dataIndex: 'orderIsUsed',
        key: 'orderIsUsed',
        title: <TitleTableCol title="کارکرد" dataIndex="orderIsUsed" sortAble={true} setFilterArg={setFilterArgHandler} />,
        width: '92px',
      },
      {
        dataIndex: 'date',
        key: 'date',
        title: <TitleTableCol title="تاریخ ثبت " dataIndex="date" sortAble={true} setFilterArg={setFilterArgHandler} />,
        width: '115px',
      },

      {
        dataIndex: 'price',
        key: 'price',
        title: <TitleTableCol title="قیمت (ریال)" dataIndex="price" sortAble={false} setFilterArg={setFilterArgHandler} />,
        width: '110px',
      },
      {
        dataIndex: 'count',
        key: 'count',
        title: <TitleTableCol title="تعداد" dataIndex="count" sortAble={false} setFilterArg={setFilterArgHandler} />,
        width: '60px',
      },
      {
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        title: <TitleTableCol title=" جمع پرداختی (ریال)" dataIndex="totalPrice" sortAble={false} setFilterArg={setFilterArgHandler} />,
        width: '129px',
      },
      {
        dataIndex: 'description',
        key: 'description',
        title: <TitleTableCol title="توضیحات" dataIndex="description" sortAble={false} setFilterArg={setFilterArgHandler} />,
        width: '135px',

        render: (value: string) => {
          if (!value) return <></>

          if (value?.length < 15) {
            return <span>{value}</span>
          }

          return (
            <>
              <span>{value.substring(0, 15)}</span>
              <Popover content={value}>
                <span className="dec-more">... </span>
              </Popover>
            </>
          )
        },
      },

      {
        dataIndex: 'photos',
        key: 'photos',
        title: <TitleTableCol title="تصاویر ارسالی" dataIndex="photos" sortAble={false} setFilterArg={setFilterArgHandler} />,
        width: '132px',
      },
      {
        dataIndex: 'resultComment',
        key: 'resultComment',
        width: '152px',
        title: <TitleTableCol title="وضعیت نهایی" dataIndex="resultComment" sortAble={false} setFilterArg={setFilterArgHandler} />,
      },
    ],
    columnsCarPartsTable: [
      {
        dataIndex: 'name',
        key: 'name',
        title: <TitleTableCol title="نام قطعه" dataIndex="name" sortAble={true} setFilterArg={setFilterArgHandler} />,
        width: '222px',
        fixed: 'left',
      },
      {
        dataIndex: 'carName',
        key: 'carName',
        title: <TitleTableCol title="نوع خودرو" dataIndex="carName" sortAble={false} setFilterArg={setFilterArgHandler} />,
        width: '150px',
      },
      {
        dataIndex: 'date',
        key: 'date',
        title: <TitleTableCol title=" تاریخ ثبت " dataIndex="date" sortAble={true} setFilterArg={setFilterArgHandler} />,
        width: '131px',
      },
      {
        dataIndex: 'price',
        key: 'price',
        title: <TitleTableCol title="قیمت (ریال)" dataIndex="price" sortAble={true} setFilterArg={setFilterArgHandler} />,
        width: '137px',
      },
      {
        dataIndex: 'count',
        key: 'count',
        title: <TitleTableCol title="تعداد" dataIndex="count" sortAble={true} setFilterArg={setFilterArgHandler} />,
        width: '60px',
      },
      {
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        title: <TitleTableCol title="  جمع پرداختی (ریال)" dataIndex="totalPrice" sortAble={false} setFilterArg={setFilterArgHandler} />,
        width: '129px',
      },
      {
        dataIndex: 'description',
        key: 'description',
        title: <TitleTableCol title="توضیحات" dataIndex="description" sortAble={false} setFilterArg={setFilterArgHandler} />,
        width: '135px',
        render: (value: string) => {
          if (!value) return <></>

          if (value?.length < 15) {
            return <span>{value}</span>
          }

          return (
            <>
              <span>{value.substring(0, 15)}</span>
              <Popover content={value}>
                <span className="dec-more">... </span>
              </Popover>
            </>
          )
        },
      },

      {
        dataIndex: 'photos',
        key: 'photos',
        title: <TitleTableCol title="تصاویر " dataIndex="photos" sortAble={false} setFilterArg={setFilterArgHandler} />,
        width: '67px',
      },
      {
        dataIndex: 'resultComment',
        key: 'resultComment',
        width: '103px',
        title: <TitleTableCol title="وضعیت نهایی" dataIndex="resultComment" sortAble={false} setFilterArg={setFilterArgHandler} />,
      },
    ],
    columnsTransactions: [
      {
        dataIndex: 'ordTrans_DateTrans',
        key: 'ordTrans_DateTrans',
        title: <TitleTableCol title="تاریخ پرداخت" dataIndex="ordTrans_DateTrans" sortAble={true} setFilterArg={setFilterArgHandler} />,
        // width: '167px',
      },
      {
        dataIndex: 'ordTrans_OrdrCod',
        key: 'ordTrans_OrdrCod',
        title: <TitleTableCol title="کد سفارش" dataIndex="ordTrans_OrdrCod" sortAble={true} setFilterArg={setFilterArgHandler} />,
        // width: '106px',
      },
      {
        dataIndex: 'ordTrans_Price',
        key: 'ordTrans_Price',
        title: <TitleTableCol title="مبلغ سفارش" dataIndex="ordTrans_Price" sortAble={true} setFilterArg={setFilterArgHandler} />,
        // width: '106px',
      },
      {
        dataIndex: 'ordTrans_TrackCode',
        key: 'ordTrans_TrackCode',
        title: <TitleTableCol title="کد رهگیری" dataIndex="ordTrans_TrackCode" sortAble={true} setFilterArg={setFilterArgHandler} />,
        // width: '106px',
      },
    ],
  }

  const mobileScreenColumns = {
    columnsWornCarsTable: [
      {
        dataIndex: 'name',
        key: 'name',
        title: <TitleTableCol title="نام خودرو" dataIndex="name" sortAble={true} setFilterArg={setFilterArgHandler} />,
        width: '167px',
      },
      {
        dataIndex: 'date',
        key: 'date',
        title: <TitleTableCol title="تاریخ ثبت" dataIndex="date" sortAble={true} setFilterArg={setFilterArgHandler} />,
        width: '106px',
      },
    ],
    columnsImportedCarsTable: [
      {
        dataIndex: 'name',
        key: 'name',
        title: <TitleTableCol title="نام خودرو" dataIndex="name" sortAble={true} setFilterArg={setFilterArgHandler} />,
        width: '167px',
      },
      {
        dataIndex: 'date',
        key: 'date',
        title: <TitleTableCol title="تاریخ ثبت" dataIndex="date" sortAble={true} setFilterArg={setFilterArgHandler} />,
        width: '106px',
      },
    ],
    columnsCarPartsTable: [
      {
        dataIndex: 'name',
        key: 'name',
        title: <TitleTableCol title="نام قطعه" dataIndex="name" sortAble={true} setFilterArg={setFilterArgHandler} />,
        width: '167px',
      },
      {
        dataIndex: 'date',
        key: 'date',
        title: <TitleTableCol title=" تاریخ ثبت " dataIndex="date" sortAble={true} setFilterArg={setFilterArgHandler} />,
        width: '106px',
      },
    ],
    columnsTransactions: [
      {
        dataIndex: 'ordTrans_DateTrans',
        key: 'ordTrans_DateTrans',
        title: <TitleTableCol title="تاریخ پرداخت" dataIndex="ordTrans_DateTrans" sortAble={true} setFilterArg={setFilterArgHandler} />,
        width: '167px',
      },
      {
        dataIndex: 'ordTrans_TrackCode',
        key: 'ordTrans_TrackCode',
        title: <TitleTableCol title="کد رهگیری" dataIndex="ordTrans_TrackCode" sortAble={true} setFilterArg={setFilterArgHandler} />,
        width: '106px',
      },
    ],
  }

  const conditionColumns: IObject = isMobileScreen ? mobileScreenColumns : desktopScreenColumns

  let columns: ColumnType<ITableData>[]
  switch (activePage) {
    case CurrentTable.AUTO_PARTS:
      columns = conditionColumns['columnsCarPartsTable']
      break

    case CurrentTable.IMPORTED_CARS:
      columns = conditionColumns['columnsImportedCarsTable']
      break

    case CurrentTable.BUY_WORN_CARS:
      columns = conditionColumns['columnsImportedCarsTable']
      break
    case CurrentTable.TRANSACTIONS:
      columns = conditionColumns['columnsTransactions']
      break
    default:
      columns = conditionColumns['columnsWornCarsTable']
  }

  useEffect(() => {
    scrollToTop()
  }, [filterArg.PageIndex])

  return (
    <>
      <TableTrackRecordsContainer>
        <Spin tip="Loading..." spinning={loading} wrapperClassName="w-full">
          <TableUiKit
            scroll={{ x: isMobileScreen ? true : 1000 }}
            columns={columns}
            data={dataSource}
            hasKey
            className="table-track-records"
            onRow={record => {
              return {
                onClick: () => {
                  isMobileScreen &&
                    router.push({
                      pathname: `/track-records/${record?.uid}`,
                      query: {
                        page: activePage,
                      },
                    })
                },
              }
            }}
          />
        </Spin>
      </TableTrackRecordsContainer>

      <Pagination
        total={paginationTotal}
        onChange={(page, pageSize) => {
          setFilterArgHandler({
            ...filterArg,
            PageIndex: page,
            PageSize: pageSize,
          })
        }}
        defaultCurrent={1}
        responsive
        pageSize={filterArg.PageSize}
        current={filterArg.PageIndex}
        showSizeChanger={true}
      />
    </>
  )
}

export default TableTrackRecords
