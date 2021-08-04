import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import {BrittneyNav} from '../components/nav'
import {BrittFooter} from '../components/footer'

const SketchPage = ({ data }) => (
  <>
  <BrittneyNav/>
  <article>
    {data.allDatoCmsSketchImg.edges.map(({node})=> (
      <div>
      <GatsbyImage image={node.sketchImg.gatsbyImageData} alt={node.sketchImg.alt}/>
      <p>{node.sketchImg.title}</p> 
      </div>
    ))}
  </article>
  <BrittFooter/>
  </>
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