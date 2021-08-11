import * as React from 'react'
import { graphql } from 'gatsby'
import {AnimationNav} from '../components/nav'
import {SGFooter} from '../components/footer'
import styled from "styled-components"
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled.div`
section {
  padding-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-gap:1rem;
  justify-items:center;
}
div{
  width:376px;
}
h1{
  font-family: var(--brandFont);
    font-size: 2rem;
    text-align: center;
}
summary{
  font-weight:bold;
}
summary, p{
  font-size: 1rem;
  padding:none;
}
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
          <iframe width={376} height={212}src={node.link} title={"Watch "+ node.title}  frameborder="0" allowfullscreen></iframe>
          <details>
            <summary>
             {node.title}
            </summary>
            <p>{node.year}</p> 
            <p>{node.summary}</p> 
          </details>
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
        title
        year
        summary
      }
    }
  }
}
`