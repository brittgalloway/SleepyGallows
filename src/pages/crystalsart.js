import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import {CrystalNav} from '../components/nav'
import {CrystalFooter} from '../components/footer'


const IllustrationPage = ({ data }) => (
  <>
  <CrystalNav/>
  <article>
    {data.allDatoCmsIllustraion.edges.map(({node})=> (
      <div>
      <GatsbyImage image={node.art.gatsbyImageData} alt={node.art.alt}/>
      <p>{node.art.title}</p> 
      </div>
    ))}
  </article>
  <CrystalFooter/>
  </>
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
        }
      }
    }
  }
}
`