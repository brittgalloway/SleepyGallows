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
        <iframe width="640" height="360" src={node.link}  frameborder="0" allowfullscreen></iframe>
        <p>{node.title}</p> 
        <p>{node.year}</p> 
        <p>{node.website}</p> 
        <p>{node.socialMedia}</p> 
        <p>{node.summary}</p> 


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
        year
        website
        title
        summary
        socialMedia
        link
      }
    }
  }
}
`
