import { Dispatch, SetStateAction } from 'react'
import { IStepsValue } from './stepsValues'

export interface ISellingWornCarProps {
  setValue?: Dispatch<SetStateAction<IStepsValue>>
}
