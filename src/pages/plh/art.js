import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import { SRLWrapper } from "simple-react-lightbox";
import styled from 'styled-components'
import {OriginalsNav ,AnimationNav} from '../../components/nav'
import {SGFooter} from '../../components/footer'
import Layout from '../../components/layout'

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
const PlhArtPage = ({ data }) => (
  <StyledDiv>
    <Layout />
    <main>
    <AnimationNav/>
    <OriginalsNav/>
    <h1>Art of {data.datoCmsOriginal.name}</h1>
    <section>
      <SRLWrapper options={options}>
        {data.datoCmsOriginal.art.map(({image2})=> (
          <div>
            <GatsbyImage image={image2.gatsbyImageData} alt={image2.alt}/>
          </div>
        ))}
      </SRLWrapper>
    </section>
    </main>
  <SGFooter/>
  </StyledDiv>
)

  export default PlhArtPage

export const query = graphql`
query PlhArtQuery {
  datoCmsOriginal {
    name
    art {
      image2 {
        title
        alt
        gatsbyImageData
      }
    }
  }
}

`