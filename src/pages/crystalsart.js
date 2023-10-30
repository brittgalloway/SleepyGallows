import * as React from 'react'
import { graphql } from 'gatsby'
import PhotoAlbum from 'react-photo-album'
import Lightbox from 'yet-another-react-lightbox'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import { CrystalNav } from '../components/nav'
import { Footer } from '../components/footer'
import styled from 'styled-components'
import Layout from '../components/layout'
import '../styles/global.css'
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
    @media(max-width: 400px){
      margin-bottom: 1rem;
      margin-left: 0;
    }
  }
  }
`

const IllustrationPage = ({ data }) => {
  const [index, setIndex] = React.useState(-1);
  const slides = data.allDatoCmsIllustraion.edges.map(({node})=> (
    {
      key: node.art.originalId,
      src: node.art.fluid.src,
      width: node.art.fluid.width,
      height: node.art.fluid.height,
      title: node.art.title,
      alt: node.art.alt
    }
  ));
  return (
    <StyledDiv>
      <Layout title={"Crystal's Art"}/>
      <main>
        <CrystalNav/>
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
      <Footer footer={"Crystal Galloway"}/>
    </StyledDiv>
  )
}
  export default IllustrationPage

export const query = graphql`
query ArtQuery {
  allDatoCmsIllustraion {
    edges {
      node {
        art {
          fluid {
            height
            width
            src
          }
          alt
          title
          originalId
        }
      }
    }
  }
}
`