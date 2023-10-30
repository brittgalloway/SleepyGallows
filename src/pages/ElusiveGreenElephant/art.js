import * as React from 'react'
import { graphql } from 'gatsby'
import PhotoAlbum from 'react-photo-album'
import Lightbox from 'yet-another-react-lightbox'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import styled from 'styled-components'
import { OriginalsNav, AnimationNav } from '../../components/nav'
import { Footer } from '../../components/footer'
import Layout from '../../components/layout'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'

const StyledDiv = styled("div")`
section > div{
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:center;
}
main img{
  width: 20rem;
  height: 20rem;
  margin: 1rem;
  &:hover{
    transform: scale(1.05);
    transition: all .2s ease-in-out;
    cursor:pointer;
    box-shadow: 1px 1px 7px var(--brand-color);
  }
  @media(max-width: 400px){
    margin-bottom: 1rem;
    margin-left: 0;
  }
}
h1{
  font-family: var(--brandFont);
    font-size: 2rem;
    text-align: center;
}
h2, p{
  font-size: 1rem;
  padding:none;
}
`

const EleArtPage = ({ data }) => {
  const [index, setIndex] = React.useState(-1);
  const slides = data.datoCmsOriginal.art.map(({image2})=> (
    {
      src: image2.fluid.src,
      width: image2.fluid.width,
      height: image2.fluid.height,
      title: image2.title,
      alt: image2.alt
    }
  ));
  return (
    <StyledDiv>
      <Layout title={data.datoCmsOriginal.name} />
      <main>
      <AnimationNav/>
      <OriginalsNav
        name={data.datoCmsOriginal.name}
        link={data.datoCmsOriginal.link}
      />
      <h1>Art of {data.datoCmsOriginal.name}</h1>
      <section>
        <PhotoAlbum
          layout="masonry"
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
      </section>
      </main>
    <Footer/>
    </StyledDiv>
  )
}
export default EleArtPage;

export const query = graphql`
query EleArtQuery {
  datoCmsOriginal(name: {eq: "The Elusive Green Elephant"}){
    name
    link
    art {
      image2 {
        title
        alt
        fluid {
          height
          width
          src
        }
      }
    }
  }
}

`