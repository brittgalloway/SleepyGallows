import * as React from 'react'
import { graphql } from 'gatsby'
import {AnimationNav} from '../components/nav'
import {SGFooter} from '../components/footer'


const ClientPage = ({ data }) => (
  <>
  <AnimationNav/>
  <article>
    {data.allDatoCmsClientWork.edges.map(({node})=> (
      <div>
          <iframe width="640" height="360" src={data.allDatoCmsClientWork.edges[0].node.embed.url} title={data.allDatoCmsClientWork.edges[0].node.title} frameborder="0" allow="accelerometer" allowfullscreen></iframe>
        <p>{data.allDatoCmsClientWork.edges[0].node.title}</p> 
        <p>{data.allDatoCmsClientWork.edges[0].node.year}</p> 
        <p>{data.allDatoCmsClientWork.edges[0].node.website}</p> 
        <p>{data.allDatoCmsClientWork.edges[0].node.socialMedia}</p> 
        <p>{data.allDatoCmsClientWork.edges[0].node.description.value}</p> 
      </div>
    ))}
  </article>
  <SGFooter/>
  </>
)

  export default ClientPage

export const query = graphql`
query ClientQuery {
    allDatoCmsClientWork {
        edges {
          node {
            embed {
              url
              thumbnailUrl
            }
            description {
              value
            }
            title
            website
            year
            socialMedia
          }
        }
      }
    }

`