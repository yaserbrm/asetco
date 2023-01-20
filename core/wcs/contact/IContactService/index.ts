export interface IContactS {
  send: (formData: FormData) => Promise<{
    success: boolean
    data?: { message: string; status: number | string }
  }>
}
