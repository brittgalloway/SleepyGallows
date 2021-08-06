import * as React from 'react'
import { graphql } from 'gatsby'
import {AnimationNav} from '../components/nav'
import {SGFooter} from '../components/footer'
import styled from "styled-components"
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled.div`

`

const FunPage = ({ data }) => (
  <StyledDiv>
    <Layout />
    <main>
    <AnimationNav/>
    <h1>Passion Projects</h1>
    <section>
      {data.allDatoCmsForFun.edges.map(({node})=> (
        <div>
          <iframe width="640" height="360" src={node.link}  frameborder="0" allowfullscreen></iframe>
          <p>{node.title}</p> 
          <p>{node.year}</p> 
          <p>{node.summary}</p> 


        </div>
      ))}
    </section>
    </main>
  <SGFooter/>
  </StyledDiv>
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