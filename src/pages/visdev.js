import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import {CrystalNav} from '../components/nav'
import {CrystalFooter} from '../components/footer'

//   export default CrystalPage
const VisDevPage = ({ data }) => (
  <>
  <CrystalNav/>
  <article>
    {data.allDatoCmsVisdev.edges.map(({node})=> (
      <div>
      <GatsbyImage image={node.plhVisdev.gatsbyImageData} alt={node.plhVisdev.alt}/>
      <p>{node.plhVisdev.title}</p> 
      </div>
    ))}
  </article>
  <CrystalFooter/>
  </>
)

  export default VisDevPage

export const query = graphql`
query VisDevQuery {
    allDatoCmsVisdev {
      edges {
        node {
          plhVisdev {
            alt
            gatsbyImageData
            title
          }
        }
      }
    }
    allDatoCmsMermaidVisdev {
      edges {
        node {
          visArt {
            alt
            gatsbyImageData
            title
          }
        }
      }
    }
  }
  
`