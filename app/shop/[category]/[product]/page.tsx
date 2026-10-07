import { type Metadata } from 'next'
import { cache } from 'react'
import { notFound } from 'next/navigation'
import { JsonLd, SITE_URL, ORG_ID } from '@/lib/jsonLd'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { ProductImages } from '@/components/productImages'
import ProductInfo from '@/components/productInfo'
import { type SanityDocument } from 'next-sanity'
import { client } from 'b/sanityLib/client'
import style from '@/style/product.module.scss'
import layoutStyle from '@/shop/page.module.scss'
import textStyles from '@/style/titles.module.scss'

const POSTS_QUERY = (product: string) => `*[
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
  "originalsSummary": originalsSummary->{ body[], slug, title },
  "variant": variant[]{ ID, title, price, discountedPrice, stock },
  "cartThumbnail": cartThumbnail.asset -> {url}
}`;

const getProduct = cache(async (product: string) => {
  const _product = await client.fetch<SanityDocument[]>(POSTS_QUERY(product), {});
  return _product[0];
});

export async function generateMetadata(
  { params }: { params: Promise<{ product: string }> }
): Promise<Metadata> {
  const { product } = await params;
  const item = await getProduct(product);

  if (!item) {
    return {
      title: 'Not Found | Sleepy Gallows Shop',
    };
  }

  return {
    title: `${item.title} | Sleepy Gallows Shop`,
    description: item.shortDescription || `Shop ${item.title} from Sleepy Gallows.`,
  };
}

export default async function Product({ params }: { params: Promise<{ category: string; product: string }> }) {
  const { category, product } = await params;
  const item = await getProduct(product);

  if (!item) {
    notFound();
  }
  const productUrl = `${SITE_URL}/shop/${category}/${item.slug}`

  type OfferInput = { price: number; discountedPrice?: number | null; stock: number; name?: string; sku?: string }
  const toOffer = (o: OfferInput) => ({
    '@type': 'Offer',
    ...(o.name && { name: o.name }),
    ...(o.sku && { sku: o.sku }),
    url: productUrl,
    price: (o.discountedPrice ?? o.price).toFixed(2),
    priceCurrency: 'USD',
    availability: o.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    seller: { '@id': ORG_ID },
  })

  const offers = item.variant?.length
    ? item.variant.map((v: { ID: string; title: string; price: number | null; discountedPrice: number | null; stock: number | null }) =>
        toOffer({
          name: `${item.title} - ${v.title}`,
          sku: v.ID,
          price: v.price ?? item.price,
          discountedPrice: v.discountedPrice,
          stock: v.stock ?? 0,
        }))
    : toOffer({ sku: item.id, price: item.price, discountedPrice: item.discount, stock: item.stock })

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${productUrl}#product`,
        name: item.title,
        description: item.shortDescription,
        image: item.productDisplay?.gallery?.map((img: { asset: { url: string } }) => img.asset.url) ?? [],
        category: category.replace('-', ' '),
        brand: { '@type': 'Brand', name: 'Sleepy Gallows' },
        offers,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Shop', item: `${SITE_URL}/shop` },
          { '@type': 'ListItem', position: 2, name: category.replace('-', ' '), item: `${SITE_URL}/shop/${category}` },
          { '@type': 'ListItem', position: 3, name: item.title, item: productUrl },
        ],
      },
    ],
  }
  const imgHeight = item?.productDisplay?.gallery[0].asset.metadata.dimensions.height;
  const imgWidth = item?.productDisplay?.gallery[0].asset.metadata.dimensions.width;
  return (
    <main className={`${layoutStyle.main} ${style.max_width}`}>
      <JsonLd data={productJsonLd} />
      <div className={`${imgHeight > imgWidth ? style.product_portrait : style.product_landscape}`}>
        <h1 className={`${style.h1}`}>
          {item?.title}
        </h1>
        <div className={`${style.imgDisplay}`}>
          <ProductImages
            photos={item?.productDisplay?.gallery}
            layout={imgHeight > imgWidth ? 'portrait' : 'landscape'}
            />
        </div>
        <ProductInfo
            id={item?.id}
            title={item?.title}
            stock={item?.stock} 
            price={item?.price}
            discount={item?.discount} 
            variant={item?.variant} 
            longDescription={item?.longDescription}
            shortDescription={item?.shortDescription}
            img={item?.cartThumbnail?.url}
            shippingType={item?.shippingType}
        />
      </div>
      <aside className={`${style.aside}`}>
        <h2 className={`${style.h2} ${textStyles.cinzel}`}>{item?.originalsSummary?.title}</h2>
          {item?.originalsSummary && 
            <PortableText
              value={item.originalsSummary.body}
            />
        }
        {item?.originalsSummary &&  item?.originalsSummary?.slug.current !== null && 
          <Link  className={`${style.learn_more}`} href={`${item?.originalsSummary?.slug.current}`}>
            Learn More
          </Link>}
      </aside>
    </main>
  )
}