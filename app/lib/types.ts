import type { SanityImageObject } from '@sanity/image-url/lib/types/types'

export type WebProject = {
  id:string, 
  projectName:string, 
  role:string,
  description:string, 
  liveApp:string, 
  github:string
}

export type SanityImage = {
    image: SanityImageObject,
    altText: string
}

export type ProductDetails = {
    id:string, 
    title:string,
    stock:number, 
    price:number,
    discount?:number, 
    variant?:{
        ID:string,
        price:number, 
        title:string, 
        discountedPrice:number|null, 
        stock:number
    }[], 
    longDescription: [],
    shortDescription:string
}

export type CartProduct = {
    id:string, 
    _productName:string,
    variantName?:string,
    stock:number, 
    price:number,
    discount?:number,
    productDescription:any
}