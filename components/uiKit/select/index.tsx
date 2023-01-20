import { FC, useState } from 'react'
import { Checkbox, Select } from 'antd'
import { ISelect } from './interface/ISelect'
import { SelectStyle } from './style/select'
const { Option } = Select

export const SelectUiKit: FC<ISelect> = ({
  Id,
  optionItem,
  placeholder,
  selectClassName,
  optionClassName,
  onChange,
  size,
  checkSelected,
}) => {
  return (
    <SelectStyle dir="rtl">
      <Select mode="multiple" placeholder={placeholder} onChange={onChange} className={selectClassName} size={size}>
        {optionItem.map((item, index) => (
          <Option value={item.value.toString()} key={index} className={optionClassName}>
            <Checkbox checked={!checkSelected ? !!Id?.find(id => id === item.value.toString()) : undefined}>{item.label}</Checkbox>
          </Option>
        ))}
      </Select>
    </SelectStyle>
  )
}

// const [IdOfSelectCheckbox, setIdOfSelectCheckbox] = useState<string[]>([])

// const handleSelectCheckbox = (value: string[]) => {
//   setIdOfSelectCheckbox(value)
// }

// {/* <SelectUiKit
//   optionItem={roles.map(item => ({ value: item.rol_ID, label: item.transTagText }))}
//   placeholder="انتخاب"
//   selectClassName="roleAssignmentSelect"
//   onChange={handleSelectCheckbox}
//   Id={IdOfSelectCheckbox}
// /> */}
