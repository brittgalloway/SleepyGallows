import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import { SRLWrapper } from "simple-react-lightbox";
import {BrittneyNav} from '../components/nav'
import {BrittFooter} from '../components/footer'
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

const PaperPage = ({ data }) => (
  <StyledDiv>
    <Layout />
    <main>
      <BrittneyNav/>
      <section>
        <SRLWrapper options={options}>
            {data.allDatoCmsPaperCutout.edges.map(({node})=> (
              <div>
              <GatsbyImage key={node.paperArt.title} image={node.paperArt.gatsbyImageData} alt={node.paperArt.alt}/>
              </div>
            ))}
        </SRLWrapper>
      </section>
    </main>
    <BrittFooter/>
  </StyledDiv>
)
  
  export default PaperPage

  export const query = graphql`
query PaperQuery {
    allDatoCmsPaperCutout {
        edges {
          node {
            paperArt {
              alt
              gatsbyImageData
              title
            }
          }
        }
      }
    }
    

`