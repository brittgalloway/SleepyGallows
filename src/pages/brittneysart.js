import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import {BrittneyNav} from '../components/nav'
import {BrittFooter} from '../components/footer'
import styled from "styled-components"
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled.div`

`
const SketchPage = ({ data }) => (
  <StyledDiv>
    <Layout />
    <main>
      <BrittneyNav/>
      <section>
        {data.allDatoCmsSketchImg.edges.map(({node})=> (
          <div>
          <GatsbyImage image={node.sketchImg.gatsbyImageData} alt={node.sketchImg.alt}/>
          <p>{node.sketchImg.title}</p> 
          </div>
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
        }
      }
    }
  }
}

`