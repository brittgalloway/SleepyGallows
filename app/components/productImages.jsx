'use client'
import Image from 'next/image'
import * as React from 'react'
import PhotoAlbum from 'react-photo-album'

export function ProductImages({photos}) {
  const [index, setIndex] = React.useState(0);
  const handleClick = ({ index: current }) => {
    setIndex(current);
    console.log(index);
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
        <Image
            key= {photos[index]?.id}
            src= {photos[index]?.responsiveImage?.src}
            width={photos[index]?.responsiveImage?.width}
            height={photos[index]?.responsiveImage?.height}
            title= {photos[index]?.title}
            alt= {photos[index]?.alt}
        />
        <PhotoAlbum
            layout="rows"
            photos={slides}
            onClick={handleClick}
            maxPhotos={4}
            singleRowMaxHeight={100}
            spacing={10}
        />
    </>
  )
}
