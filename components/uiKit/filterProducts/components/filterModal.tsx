import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Checkbox, Form, Modal, Typography } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { FilterModalContent } from '../style'
import { IProductsFilter } from '../interface'
import useMediaQuery from 'hooks/mediaQuery'
import { useRouter } from 'next/router'
import { Routes } from 'interfaces/Routes'

const FilterModal: FC<{
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  path: string
  filterArgs: IProductsFilter
  setFilterArgs: Dispatch<SetStateAction<IProductsFilter>>
  groupeChecked: number[]
  onChange: (e: CheckboxChangeEvent) => void
  filterOptions: any[]
}> = ({ visible, setVisible, path, filterArgs, setFilterArgs, groupeChecked, onChange, filterOptions }) => {
  const [filterArgsTemp, setFilterArgsTemp] = useState<IProductsFilter>({
    search: '',
    new: false,
    stock: false,
  })

  const query = useMediaQuery('(min-width: 992px)')
  const router = useRouter()

  const isBuyWornCars = router.pathname === Routes.pWornCars

  useEffect(() => {
    setFilterArgsTemp({
      ...filterArgs,
      new: filterArgs.new,
      stock: filterArgs.stock,
    })
  }, [filterArgs])

  const handleCancel = () => {
    setVisible(false)
    setFilterArgsTemp({
      ...filterArgs,
      new: filterArgs.new,
      stock: filterArgs.stock,
    })
  }

  // const onChange = (e: CheckboxChangeEvent) => {
  //   // filterForm.submit()
  //   const key = e.target.value
  //   const value = e.target.checked
  //   setFilterArgsTemp({ ...filterArgsTemp, [key]: value })
  // }

  // const handleFilterModal = () => {
  //   setFilterArgs({
  //     ...filterArgs,
  //     new: filterArgsTemp.new,
  //     stock: filterArgsTemp.stock,
  //   })
  //   setVisible(false)
  // }

  useEffect(() => {
    if (query) {
      setVisible(false)
    }
  }, [query, setVisible])

  return (
    <Modal
      visible={visible}
      title={
        <div className="flex justify-between">
          <div className="icon" onClick={handleCancel}>
            <span className="material-icons cursor-pointer">keyboard_backspace</span>
          </div>
          <span>{path === '/auto-parts' ? 'فیلتر قطعات' : 'فیلتر وسایل نقلیه'}</span>
        </div>
      }
      footer={null}
      closable={false}
      className="filterModal"
    >
      <FilterModalContent>
        <Form dir="rtl">
          <section>
            <Typography.Title level={5} className="!mb-5">
              دسته بندی محصولات
            </Typography.Title>
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
            <section className="filterBox mt-2">
              <Typography.Title level={5}>کارکرد</Typography.Title>
              <section className="formCheckBoxFilter formCheckBoxFilter-used">
                <div className="formCheckBoxFilterItem">
                  <Checkbox value="new" onChange={onChange} checked={filterArgsTemp.new}>
                    {path === '/auto-parts' ? 'قطعه نو' : 'وسیله نقلیه نو'}
                  </Checkbox>
                </div>
                <div className="formCheckBoxFilterItem">
                  <Checkbox value="stock" onChange={onChange} checked={filterArgsTemp.stock}>
                    {path === '/auto-parts' ? ' قطعه استوک' : 'وسیله نقلیه کارکرده'}
                  </Checkbox>
                </div>
              </section>
            </section>
          )}
        </Form>
      </FilterModalContent>
    </Modal>
  )
}

export default FilterModal
