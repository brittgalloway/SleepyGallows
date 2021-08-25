import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import {BrittneyNav} from '../components/nav'
import {BrittFooter} from '../components/footer'
import { SRLWrapper } from "simple-react-lightbox";
import styled from 'styled-components'
import Layout from '../components/layout'
import '../styles/global.css'

const StyledDiv = styled.div`
section {
  column-count: 3;
  column-gap: .1rem;
   
}
img{
  margin: 1rem;
  &:hover{
    transform: scale(1.05);
    transition: all .2s ease-in-out;
  }
}
`

const options = {
 
settings: {
  boxShadow: 'none',
  disableKeyboardControls: false,
  disablePanzoom: false,
  disableWheelControls: false,
  hideControlsAfter: false,
  lightboxTransitionSpeed: 0.3,
  lightboxTransitionTimingFunction: 'linear',
  overlayColor: 'rgba(30, 30, 30, 0.9)',
  slideAnimationType: 'fade',
  slideSpringValues: [300, 50],
  slideTransitionSpeed: 0.6,
  slideTransitionTimingFunction: 'linear',
  usingPreact: false
},
buttons: {
  backgroundColor: 'rgba(30,30,36,0.8)',
  iconColor: 'rgba(255, 255, 255, 0.8)',
  iconPadding: '10px',
  showAutoplayButton: false,
  showCloseButton: true,
  showDownloadButton: false,
  showFullscreenButton: true,
  showNextButton: true,
  showPrevButton: true,
  showThumbnailsButton: false,
  size: '40px'
},

thumbnails: {
  showThumbnails: false,
}
};
const SketchPage = ({ data }) => (

  <StyledDiv>
    <Layout />
    <main>
      <BrittneyNav/>
      <section>
        <SRLWrapper options={options}>

          {data.allDatoCmsSketchImg.edges.map(({node})=> (
            <GatsbyImage 
            image={node.sketchImg.gatsbyImageData} 
            alt={node.sketchImg.alt}
            key= {node.sketchImg.originalId}
            />
            ))}
        </SRLWrapper>
		
      </section>
    </main>
    <BrittFooter/>
  </StyledDiv>
)
  export default SketchPage

  export const query = graphql`
  query SketchQuery {
    allDatoCmsSketchImg {
      edges {
        node {
          sketchImg {
            gatsbyImageData(placeholder: BLURRED)
            title
            alt
            originalId
          }
        }
      }
    }
  }
  `