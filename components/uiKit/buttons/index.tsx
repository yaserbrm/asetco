import { CSSProperties, FC } from 'react'
import { ButtonContainer } from './styles'

interface IButtonProps {
  children?: React.ReactNode
  icon?: React.ReactNode
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default' | 'success'
  onClick?: () => void
  htmlType?: 'submit' | 'button' | 'reset'
  loading?: boolean
  className?: string
  disabled?: boolean
  style?: CSSProperties
  fontSize?: number | string
}
export const ButtonUiKit: FC<IButtonProps> = ({
  children,
  type = 'primary',
  onClick,
  className,
  loading,
  htmlType,
  icon,
  disabled,
  style,
  fontSize,
}) => {
  const selectClassName = () => {
    switch (type) {
      case 'success':
        return 'success'
      case 'ghost':
        return 'ghost'
      default:
        return ''
    }
  }
  return (
    <ButtonContainer
      disabled={disabled}
      type={type !== 'success' ? type : 'default'}
      onClick={onClick}
      className={`${className ? className : ''} ${selectClassName()}`}
      loading={loading}
      htmlType={htmlType}
      icon={icon}
      style={{ ...style, fontSize }}
    >
      {children}
    </ButtonContainer>
  )
}
