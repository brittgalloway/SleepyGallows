'use client'
import * as React from 'react'
import Image from 'next/image'
import PhotoAlbum from 'react-photo-album'
import style from '@/app/style/product.module.scss'

export function ProductImages({photos}) {
  const [index, setIndex] = React.useState(0);
  const handleClick = ({ index: current }) => {
    setIndex(current);
  }
  const slides = photos.map((photo) => (
    {
        key: photo?.id,
        src: photo?.responsiveImage?.src,
        width: 100,
        height: 100,
        title: photo?.title,
        alt: photo?.alt
    }))
  return (
    <>
        <Image className={`${style.img}`}
            key= {photos[index]?.id}
            src= {photos[index]?.responsiveImage?.src}
            width={photos[index]?.responsiveImage?.width}
            height={photos[index]?.responsiveImage?.height}
            title= {photos[index]?.title}
            alt= {photos[index]?.alt}
        />
        <PhotoAlbum 
            layout="columns"
            photos={slides}
            maxPhotos={4}
            columns={4}
            height={100}
            width={100}
            spacing={10}
            onClick={handleClick}
        />
    </>
  )
}
