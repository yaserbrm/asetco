export interface IUploadFile{
    setImageUrl:(image: string | File | null) => void
    imageError?:boolean
    imageUrl?:any
    title ?:string
    onDelete?: () => Promise<boolean>
    onSelect?: (image: File) => Promise<boolean>
    hasSendButton?: boolean
    imageSrc?: string | ArrayBuffer | null | undefined
    setImageSrc?: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null | undefined>>
    loading: boolean
}