import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react'
import AuthCode, { AuthCodeRef } from 'react-auth-code-input'
// import ReactCodeInput from 'react-code-input'
import { InputCodeContainer } from './styles'

interface IInputCode {
  className?: string
  fields: number
  onChange: (value: string) => void
  containerClassName?: string
  autoFocus: boolean
  clear: boolean
  setClear: Dispatch<SetStateAction<boolean>>
  isValid?: boolean
}
export const InputCode: FC<IInputCode> = ({
  className,
  fields,
  onChange,
  containerClassName,
  autoFocus = false,
  clear,
  setClear,
  isValid,
}) => {
  const inputRef = useRef<AuthCodeRef>(null)
  useEffect(() => {
    document
      .getElementsByClassName('react-code-input')
      .item(0)
      ?.setAttribute('style', 'display: flex !important;flex-direction: row-reverse;')
  })

  useEffect(() => {
    if (clear) {
      inputRef.current?.clear()
    }
    setClear(false)
  }, [clear, setClear])
  return (
    <InputCodeContainer className={containerClassName} id="200" error={isValid}>
      <AuthCode
        onChange={(value: string) => {
          onChange(value)
        }}
        ref={inputRef}
        length={fields}
        autoFocus={autoFocus}
        inputClassName={className}
        allowedCharacters={'numeric'}
      />
    </InputCodeContainer>
  )
}
//const el = document.getElementById('200')
