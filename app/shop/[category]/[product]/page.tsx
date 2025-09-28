import Link from 'next/link'
import { lato, cinzel_decorative } from '@/fonts'
import { ProductImages } from '@/components/productImages'
import AddToCart from '@/components/addToCart'
import { type SanityDocument } from 'next-sanity'
import { client } from '../../../../sanity/lib/client'
import { USD } from '@/lib/utils'
import { stripe } from '@/lib/stripe'
import style from '@/style/product.module.scss'
import layoutStyle from '@/shop/page.module.scss'

export default async function Product( {params} ) {
  const { product } = await params
  const POSTS_QUERY = await `*[
    _type == "shopProduct"
    && productSlug.current == "${product}"
  ] 
  {
   "id": _id, 
    "title": productName, 
    "price": price, 
    "discount": discountedPrice,
    "stock": stock, 
    "productType": productType, 
    "slug": productSlug.current, 
    "longDescription": detailedDescription,
    "shortDescription": shortDescription,
    "hasShipping": shipping.shippable,
    "shippingType": shipping.shippingOptions,
    "productDisplay": productDisplay -> {gallery[]{ caption, alt, asset ->{metadata{dimensions}, url}}},
    "originalsSummary": originalsSummary->{ body[]{children[0]{text}}, slug, title },
    "variant": variant[]{ title, price }
  }`;
  const _product = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});

  // const product = JSON.parse(JSON.stringify(await stripe.products.retrieve(product?.id)));
  const imgHeight = _product[0]?.productDisplay[0]?.gallery[0].asset.metadata.dimensions.height;
  const imgWidth = _product[0]?.productDisplay[0]?.gallery[0].asset.metadata.dimensions.width;
  
  return (
    <main className={`${layoutStyle.main} ${style.max_width}`}>
      <div className={`${imgHeight > imgWidth ? style.product_portrait : style.product_landscape}`}>
        <h1 className={`${style.h1}`}>{_product[0]?.productName}</h1>
        <div className={`${style.imgDisplay}`}>
          <ProductImages
          photos={_product[0]?.productDisplay?.gallery}
          layout={imgHeight > imgWidth ? 'portrait' : 'landscape'}
          />
        </div>
        <div className={`${style.product_info}`}>
          {_product[0]?.discount !== null ? <div className={`${style.discount}`}>
            <p className={``} aria-label="This is the current sale price.">{USD.format(_product[0]?.discount)}</p>
            <p className={``} aria-label="This is the former price, not the price you will pay today.">{USD.format(_product[0]?.price)}</p>
            </div> :
            <div className={`${style.price}`}>
              <p>{USD.format(_product[0]?.price)}</p>
            </div>
          }
          {_product[0]?.stock > 0 ?<p className={`${style.stock}`}>In Stock</p> : <p className={`${style.no_stock}`}>Sold Out</p>}
          <div className={`${lato.className}`}>
            {_product[0]?.longDescription?.map((content, idx)=><p key={idx} className={`${lato.className}`}>
              {content.children[0].text}
            </p>)}
          </div>
          <AddToCart
            product={_product[0]}
            stock={_product[0]?.stock}
            discount={_product[0]?.discount}
            price={_product[0]?.price}
            productDescription={_product[0]?.shortDescription}
          />
        </div>
      </div>
      <aside className={`${style.aside}`}>
        <h2 className={`${style.h2} ${cinzel_decorative.className}`}>{_product[0]?.originalsSummary?.title}</h2>
          {_product[0]?.originalsSummary && 
            _product[0]?.originalsSummary?.body.map((content, idx)=>
            <p key={idx} className={`${lato.className}`}>
              {content.children.text}
            </p>
          )
        }
        {_product[0]?.originalsSummary?.slug.current !== null && 
          <Link  className={`${style.learn_more}`} href={`/animation/originals/${_product[0]?.originalsSummary?.slug.current}`}>
            Learn More
          </Link>}
      </aside>
    </main>
  )
}