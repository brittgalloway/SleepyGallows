import * as React from 'react'
import { graphql } from 'gatsby'
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Captions from "yet-another-react-lightbox/plugins/captions";
import {BrittneyNav} from '../components/nav'
import {Footer} from '../components/footer'
import Layout from "../components/layout"
import styled from "styled-components"
import '../styles/global.css'
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

const StyledDiv = styled("div")`
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
  
`


const PaperPage = ({ data }) => {
  const [index, setIndex] = React.useState(-1);
  const slides = data.allDatoCmsPaperCutout.edges.map(({node})=> (
    {
      key: node.paperArt.originalId,
      src: node.paperArt.fluid.src,
      width: node.paperArt.fluid.width,
      height: node.paperArt.fluid.height,
      title: node.paperArt.title,
      alt: node.paperArt.alt
    }
  ));
  return (
    <StyledDiv>
      <Layout title={"Brittney's Art"}/>
      <main>
        <BrittneyNav/>
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
      <Footer footer={"Brittney Galloway"}/>
    </StyledDiv>
  )
}
export default PaperPage

export const query = graphql`
query PaperQuery {
    allDatoCmsPaperCutout {
        edges {
          node {
            paperArt {
              alt
              fluid {
                height
                width
                src
              }
              title
              originalId
            }
          }
        }
      }
    }
    

`