import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import {BrittneyNav} from '../components/nav'
import {BrittFooter} from '../components/footer'
import styled from "styled-components"
import Layout from "../components/layout"
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
const SketchPage = ({ data }) => (
  <StyledDiv>
    <Layout />
    <main>
      <BrittneyNav/>
      <section>
        {data.allDatoCmsSketchImg.edges.map(({node})=> (
          <>
          <div>
          <GatsbyImage id={node.originalId} image={node.sketchImg.gatsbyImageData} alt={node.sketchImg.alt}/>
          </div>
          <div id="myModal" class="modal">

            <span class="close">&times;</span>
            <img class="modal-content" id={node.originalId}/>
            <div id="caption">
              <a href="https://www.gatsbyjs.com/blog/2018-11-03-building-an-accessible-lightbox/">Build a Lightbox</a>
              <h3>
                {node.sketchImg.title}
              </h3>
            </div>
        
          </div>
          </>
        ))}
        
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