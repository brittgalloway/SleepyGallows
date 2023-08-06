import * as React from 'react';
import { graphql } from 'gatsby';
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Captions from "yet-another-react-lightbox/plugins/captions";
import {BrittneyNav} from '../components/nav';
import {Footer} from '../components/footer';
import Layout from '../components/layout';
import styled from 'styled-components';
import '../styles/global.css';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

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
`

const SketchPage = ({ data }) => {
  const [index, setIndex] = React.useState(-1);
  const slides = data.allDatoCmsSketchImg.edges.map(({node})=> (
    {
      key: node.sketchImg.originalId,
      src: node.sketchImg.fluid.src,
      width: node.sketchImg.fluid.width,
      height: node.sketchImg.fluid.height,
      title: node.sketchImg.title,
      alt: node.sketchImg.alt
    }
  ));

  return (
    <StyledDiv>
      <Layout title={"Brittney's Art"} />
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
export default SketchPage

export const query = graphql`
query SketchQuery {
  allDatoCmsSketchImg {
    edges {
      node {
        sketchImg {
          fluid {
            height
            width
            src
          }
          title
          alt
          originalId
        }
      }
    }
  }
}
`