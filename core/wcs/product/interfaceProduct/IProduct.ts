export interface IProduct {
  pro_ID: number
  prod_Desc: string
  prod_Group: number
  prod_Image: string
  prod_IsUsed: boolean
  prod_Model: string
  prod_Name: string
  prod_Price: number
  prod_RegDate: string
  prod_Serie: string
  prod_Type: number
}

export interface IProductPrice {
  productPrice_Date: string
  productPrice_ID: number
  productPrice_Price: number
  productPrice_ProductId: number
}

export interface IProductDetail {
  product?: {
    product_Description: string
    product_Group: number
    product_ID: number
    product_IsUsed: boolean
    product_Model: string
    product_Name: string
    product_NameEn: string
    product_Price: number
    product_RegisterDate: string
    product_Series: string
    product_Type: number
  }
  listFiles?: IProductDetailFiles[]
  status: number
  productPrice: IProductPrice
}

export interface IProductDetailFiles {
  annex_Id?: number
  pathFile?: string
}
export interface IProductGetAll {
  p_ID: number
  p_Name: string
  p_NameEn: string
  p_Model: string
  p_Price: number
  p_Path: string
  p_Date: string
}
