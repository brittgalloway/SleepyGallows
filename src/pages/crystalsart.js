import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import { SRLWrapper } from "simple-react-lightbox";
import {CrystalNav} from '../components/nav'
import {CrystalFooter} from '../components/footer'
import styled from "styled-components"
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled.div`
section > div{
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:center;
}
img{
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

const IllustrationPage = ({ data }) => (
  <StyledDiv>
    <Layout />
    <main>
      <CrystalNav/>
      <section>
        <SRLWrapper options={options}>
          {data.allDatoCmsIllustraion.edges.map(({node})=> (
            <div>
            <GatsbyImage image={node.art.gatsbyImageData} alt={node.art.alt}/>
            </div>
          ))}
        </SRLWrapper>
      </section>
      
    </main>
    <CrystalFooter/>
  </StyledDiv>
)

  export default IllustrationPage

export const query = graphql`
query ArtQuery {
  allDatoCmsIllustraion {
    edges {
      node {
        art {
          gatsbyImageData(placeholder: BLURRED)
          alt
          title
          focalPoint {
            x
            y
          }
        }
      }
    }
  }
}
`