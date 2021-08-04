import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import {BrittneyNav} from '../components/nav'
import {BrittFooter} from '../components/footer'

const PaperPage = ({ data }) => (
  <>
  <BrittneyNav/>
  <article>
    {data.allDatoCmsPaperCutout.edges.map(({node})=> (
      <div>
      <GatsbyImage image={node.paperArt.gatsbyImageData} alt={node.paperArt.alt}/>
      <p>{node.paperArt.title}</p> 
      </div>
    ))}
  </article>
  <BrittFooter/>
  </>
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