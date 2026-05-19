import type { SanityImageObject } from '@sanity/image-url/lib/types/types'
import type { PortableTextBlock } from '@portabletext/types'

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
    longDescription: PortableTextBlock[],
    shortDescription:string,
    img:string,
    shippingType?:string,
}

export type CartProduct = {
    id:string, 
    _productName:string,
    variantName?:string,
    stock:number, 
    price:number,
    discount?:number,
    productDescription:string,
    thumbnail:string,
    shipping?: string
}

export type CartItem = {
    id: string
    quantity: number
    productName: string
    variantName?: string
    productStock: number
    productPrice: number
    productDiscount?: number
    productDescription: string
    productDisplay: string
    shipping?: string
}

export type CartState = {
    count: number
    items: CartItem[]
    shipping: number
}