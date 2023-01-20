import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'

import { Checkbox, Col, Form, Input, Row, Typography } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

import { useRouter } from 'next/router'

import { filterIcon } from 'public/assets/svg/common/filterIcon'
import { IProductsFilter } from './interface'
import FilterModal from './components/filterModal'
import { EPathNames, ProductsType } from 'interfaces/globalEnums'
import { FilterTruckCarsContainer } from './style'
import { ToastAlert } from '../toastAlert/toastAlert'
import { Routes } from 'interfaces/Routes'
import { IProductGroup } from 'core/wcs/common'
import { useProductsContext } from 'pages/products/context'
import { useLoading } from 'hooks/useLoading'

interface IFilterProductsProps {
  setFilterLoading: Dispatch<SetStateAction<boolean>>
  filterOptions: IProductGroup[]
  setPageIndex: (index: number) => void
}

const FilterProducts: FC<IFilterProductsProps> = ({ setFilterLoading, setPageIndex, filterOptions }) => {
  const { commonService, setProducts } = useProductsContext()
  const [searchValue, setSearchValue] = useState<string>('')
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false)
  const [filterArgs, setFilterArgs] = useState<IProductsFilter>({
    search: '',
    new: false,
    stock: false,
  })
  const [filterForm] = Form.useForm()
  const router = useRouter()
  const [groupeChecked, setGroupeChecked] = useState<number[]>([])
  const isBuyWornCars = router.pathname === Routes.pWornCars
  const [currentPath, setCurrentPath] = useState<string>('')
  const { loading } = useLoading()
  const productGroupTypeToString = (type: string) => {
    switch (type) {
      case Routes.pImportedCars:
        return ProductsType.IMPORTED_CAR.toString()

      case Routes.pAutoParts:
        return ProductsType.AUTO_PARTS_CARS.toString()

      case Routes.pWornCars:
        return ProductsType.WORN_CARS.toString()

      default:
        return ''
    }
  }

  const onChange = (e: CheckboxChangeEvent) => {
    if (!+e.target.value) {
      setFilterArgs(p => ({ ...p, [e.target.value]: e.target.checked }))
      return
    }

    if (e.target.checked) {
      if (!groupeChecked.find(prev => prev === e.target.value)) {
        setGroupeChecked([...groupeChecked, e.target.value])
      }
    } else {
      if (groupeChecked.find(prev => prev === e.target.value)) {
        const newArray = groupeChecked.filter(prev => prev !== e.target.value)
        setGroupeChecked(newArray)
      }
    }
  }

  const fetchProductByFilter = () => {
    const formData = new FormData()
    filterArgs.new && formData.append('Filter_ProductsIsUsed', '0')
    filterArgs.stock && formData.append('Filter_ProductsIsUsed', '1')
    formData.append('SearchText', filterArgs.search)
    formData.append('Filter_ProductsType', productGroupTypeToString(router.pathname))
    let productGroup: string = ''
    groupeChecked.forEach((group, index) => {
      if (index > 0) {
        productGroup = productGroup.concat(',' + group)
      } else {
        productGroup = productGroup.concat(group.toString())
      }
    }),
      formData.append('Filter_ProductGroup', productGroup)

    commonService
      .getAllProducts(formData)
      .then(res => {
        if (res.success && res.data) {
          setProducts(res.data!)
        } else {
          ToastAlert.error('خطا در دریافت اطلاعات')
        }
      })
      .catch(() => ToastAlert.error('خطا در دریافت اطلاعات'))
      .finally(() => {
        setFilterLoading(false)
        setPageIndex(1)
      })
  }

  useEffect(() => {
    if (loading) return
    setFilterLoading(true)
    fetchProductByFilter()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterArgs, groupeChecked])

  useEffect(() => {
    const pathName = router.pathname.split('/')[2]
    setCurrentPath('/' + pathName)
  }, [router.pathname])

  return (
    <>
      <FilterModal
        visible={filterModalVisible}
        setVisible={setFilterModalVisible}
        path={router.pathname}
        setFilterArgs={setFilterArgs}
        filterArgs={filterArgs}
        groupeChecked={groupeChecked}
        onChange={onChange}
        filterOptions={filterOptions}
      />
      <FilterTruckCarsContainer>
        <Row gutter={[8, 16]} justify={'center'} style={{ width: '100%' }}>
          <Col xs={18} md={21} lg={24}>
            <section className="filterSearchBox">
              <Input.Search
                placeholder="جستجو..."
                className="searchInputFilter"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setSearchValue(e.target.value)
                  if (e.target.value === '') {
                    setFilterLoading(true)
                    setFilterArgs({ ...filterArgs, search: '' })
                  }
                }}
                onPressEnter={e => {
                  setFilterLoading(true)
                  setFilterArgs({ ...filterArgs, search: searchValue })
                }}
              />
            </section>
          </Col>
          <Col xs={{ span: 0 }} lg={24} className="filters-col-responsive">
            <section className="filtersBox">
              <Form dir="rtl" form={filterForm}>
                <section className="filterBox">
                  <Typography.Title level={5}>دسته بندی محصولات</Typography.Title>
                  <section className="formCheckBoxFilter formCheckBoxFilter-group">
                    {filterOptions.map(item => (
                      <div className="formCheckBoxFilterItem" key={item.pG_ID}>
                        <Checkbox value={item.pG_ID} onChange={onChange} checked={!!groupeChecked.find(s => s === item.pG_ID)}>
                          {item.pG_Name}
                        </Checkbox>
                      </div>
                    ))}
                  </section>
                </section>
                {isBuyWornCars || (
                  <section className="filterBox">
                    <section className="formCheckBoxFilter formCheckBoxFilter-used">
                      <div className="formCheckBoxFilterItem">
                        <Checkbox value="new" onChange={onChange} checked={filterArgs.new}>
                          {currentPath === EPathNames.AUTO_PARTS_CARS ? 'قطعه نو' : 'وسیله نقلیه نو'}
                        </Checkbox>
                      </div>
                      <div className="formCheckBoxFilterItem">
                        <Checkbox value="stock" onChange={onChange} checked={filterArgs.stock}>
                          {currentPath === EPathNames.AUTO_PARTS_CARS ? ' قطعه استوک' : 'وسیله نقلیه کارکرده'}
                        </Checkbox>
                      </div>
                    </section>
                  </section>
                )}
              </Form>
            </section>
          </Col>
          <Col xs={6} md={3} lg={0}>
            <section className="filter-icon-section" onClick={() => setFilterModalVisible(true)}>
              <span className="filter-icon">{filterIcon}</span>
            </section>
          </Col>
        </Row>
      </FilterTruckCarsContainer>
    </>
  )
}

export default FilterProducts
