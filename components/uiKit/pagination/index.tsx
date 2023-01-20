import { Pagination as AntPagination, PaginationProps } from 'antd'
import React from 'react'
import { PaginationContainer } from './styles'

interface IPaginationProps extends PaginationProps {
  direction?: 'rtl' | 'ltr'
}
const Pagination: React.FC<IPaginationProps> = (props, { direction = 'ltr' }) => (
  <PaginationContainer dir={direction}>
    <AntPagination
      {...props}
      locale={
        props.locale || {
          items_per_page: '',
          next_page: 'بعدی',
          prev_page: 'قبلی',
          next_5: 'بعدی - 5',
          next_3: 'بعدی - 3',
          page: 'صفحه',
          prev_3: 'قبلی - 3',
          prev_5: 'قبلی - 5',
          jump_to: 'پرش به',
          jump_to_confirm: 'تایید برای پرش',
        }
      }
    />
  </PaginationContainer>
)

export default Pagination
