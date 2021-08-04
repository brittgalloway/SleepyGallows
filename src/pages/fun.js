import * as React from 'react'
import { graphql } from 'gatsby'
import {AnimationNav} from '../components/nav'
import {SGFooter} from '../components/footer'


const FunPage = ({ data }) => (
  <>
  <AnimationNav/>
  <article>
    {data.allDatoCmsForFun.edges.map(({node})=> (
      <div>
        <iframe width="640" height="360" src={node.link}  frameborder="0" allowfullscreen></iframe>
        <p>{node.title}</p> 
        <p>{node.year}</p> 
        <p>{node.summary}</p> 


      </div>
    ))}
  </article>
  <SGFooter/>
  </>
)

  export default FunPage

export const query = graphql`
query FunQuery {
  allDatoCmsForFun {
    edges {
      node {
        link
        summary
        title
        year
      }
    }
  }
}
`