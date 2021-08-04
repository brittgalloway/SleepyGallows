import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import {AnimationNav} from '../components/nav'
import {SGFooter} from '../components/footer'

const OriginalsPage = ({ data }) => (
    <>
    <AnimationNav/>
    <article>
      {data.allDatoCmsOriginal.edges.map(({node})=> (
        <Link to={node.link}> 
           <GatsbyImage image={node.thumb.gatsbyImageData} alt={node.thumb.alt}/>
        </Link>
      ))}
    </article>
    <SGFooter/>
    </>
  )
  
    export default OriginalsPage
  
  export const query = graphql`
  query OgQuery {
    allDatoCmsOriginal {
        edges {
          node {
            thumb {
              alt
              gatsbyImageData
            }
            link
          }
        }
      }
    }
    
  `