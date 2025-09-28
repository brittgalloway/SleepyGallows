'use client'
import { useState } from 'react'
import Image from 'next/image'
import PhotoAlbum from 'react-photo-album'
import style from '@/style/product.module.scss'

export function ProductImages({photos, layout}) {
  const [index, setIndex] = useState(0);
  const handleClick = ({ index: current }) => {
    setIndex(current);
  }
  const slides = photos.map((photo) => (
    {
        key: photo?.id,
        src: photo?.asset?.url,
        width: 100,
        height: 100,
        title: photo?.title,
        alt: photo?.alt
    }))
  return (
    <>
      <div className={`${style.productImage}`}>
        <Image className={`${style.img}`}
            key= {photos[index]?.id}
            src= {photos[index]?.asset?.url}
            width={photos[index]?.asset.metadata.dimensions.width}
            height={photos[index]?.asset.metadata.dimensions.height}
            title= {photos[index]?.title}
            alt= {photos[index]?.alt}
        />
      </div>
      {layout === 'portrait' ? 
        <PhotoAlbum 
            layout="columns"
            photos={slides}
            maxPhotos={4}
            columns={4}
            height={100}
            width={100}
            spacing={10}
            onClick={handleClick}
        /> :
        <PhotoAlbum 
            layout="columns"
            photos={slides}
            maxPhotos={4}
            columns={1}
            height={100}
            width={100}
            spacing={10}
            onClick={handleClick}
        />
      } 
    </>
  )
}
