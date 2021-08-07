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
  grid-template-rows: masonry;
  grid-gap:1rem;
}
div{
  justify-self: center;
}
h1{
  font-family: var(--brandFont);
    font-size: 2rem;
    text-align: center;
}
h2, p{
  font-size: .875rem;
  padding:none;
}
footer{
  position:fixed;
  bottom:0;
  left: 25rem;
  
}

`

const ClientPage = ({ data }) => (
  <StyledDiv>
    <Layout />
    <main>
    <AnimationNav/>
    <h1>Client Work</h1>
    <section>
      {data.allDatoCmsClientWork.edges.map(({node})=> (
        <div>
          <iframe width="300"  src={node.link}  frameborder="0" allowfullscreen></iframe>
          <h2>{node.title}</h2> 
          <p>{node.year}</p> 
          {/* <p>{node.website}</p> 
          <p>{node.socialMedia}</p> 
          <p>{node.summary}</p>  */}
        </div>
      ))}
    </section>
    </main>
    <SGFooter/>
  </StyledDiv>
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
