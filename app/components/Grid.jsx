'use client'
import { useState } from 'react'
import PhotoAlbum from 'react-photo-album'
import Lightbox from 'yet-another-react-lightbox'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'

export default function Grid({photos, name}) {
  const [index, setIndex] = useState(-1);
  const slides = photos.map((photo) => ( 
    {
        key: photo.id,
        src: photo[`${name}`].url,
        width: photo[`${name}`].width,
        height: photo[`${name}`].height,
        title: photo[`${name}`].title,
        alt: photo[`${name}`].alt
    }))
  return (
    <>
      <PhotoAlbum
      layout="rows"
      photos={slides}
      onClick={({ index: current }) => setIndex(current)}
      />

      <Lightbox
      plugins={[Captions, Fullscreen]}
      index={index}
      slides={slides}
      open={index >= 0}
      close={() => setIndex(-1)}
      />
    </>
  )
}
