import { Dispatch, SetStateAction } from "react";

export interface ILoginFormProps{
    setLoginFormActive: Dispatch<SetStateAction<string>>
    mobile?: string
    setMobile?: Dispatch<SetStateAction<string>>
}