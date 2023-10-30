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
.grid > div{
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

h1, h2{
  font-family: var(--brandFont);
  font-size: 2rem;
  text-align: center;
}
`
const StyledVis = styled("div")`
  margin: 1rem;
  .react-photo-album img{
    margin: 0;
    &:hover{
      transform: scale(1);
      cursor: default;
      box-shadow: none;
    }
  }
  @media(max-width: 400px){
    margin-bottom: 1rem;
    margin-left: 1rem;
  }
`

//   export default CrystalPage
const VisDevPage = ({ data }) => {
  const [index, setIndex] = React.useState(-1);
  const slides = data.allDatoCmsMermaidVisdev.edges.map(({node})=> (
    {
      key: node.visArt.originalId,
      src: node.visArt.fluid.src,
      width: node.visArt.fluid.width,
      height: node.visArt.fluid.height,
      title: node.visArt.title,
      alt: node.visArt.alt
    }
  ));
  const slidesPLH = data.allDatoCmsVisdev.edges.map(({node})=> (
    {
      key: node.plhVisdev.originalId,
      src: node.plhVisdev.fluid.src,
      width: node.plhVisdev.fluid.width,
      height: node.plhVisdev.fluid.height,
      title: node.plhVisdev.title,
      alt: node.plhVisdev.alt
    }
  ));
  return (
    <StyledDiv>
      <Layout />
      <main>
        <CrystalNav/>
        <section>
          <h1>The Little Mermaid</h1>
          <p>
          I read the Little Mermaid by Hans Cristian Anderson for the first time a couple of years ago and I was very surprised when I read it because in every version of the tale that I saw on film it took place somewhere in Europe, or at least a fantasy place inspired by Europe. However when I read the tale it did not seem like a European setting. It felt eastern. Perhaps it was just the translation from the version that I read, but the fact that they would say palace instead of castle and temple instead of church really had my thinking. I did a lot of research on where it could have taken place and I saw the illustrations that Edmund Dulac did for the tale which have very heavy Eastern influence. I decided that I wanted to redesign the story set in India. It is still a far off idea, but I hope to be able to turn this into a full movie on day.
          </p>
          <h2>Characters</h2>
          <div className="grid">
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
          </div>
        </section>
        <section>
          <h2>Visual Design</h2>
          <StyledVis>
            <PhotoAlbum
              layout="rows"
              photos={slidesPLH}
            />
          </StyledVis>
        </section>
      </main>
      <Footer footer={"Crystal Galloway"} />
    </StyledDiv>
  )
}
export default VisDevPage;

export const query = graphql`
query VisDevQuery {
  allDatoCmsVisdev(sort: {plhVisdev: {createdAt: ASC}}) {
    edges {
      node {
        plhVisdev {
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
  allDatoCmsMermaidVisdev(sort: {visArt: {createdAt: ASC}}) {
    edges {
      node {
        visArt {
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