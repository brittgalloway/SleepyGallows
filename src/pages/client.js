import * as React from 'react'
import { graphql } from 'gatsby'
import {AnimationNav} from '../components/nav'
import {SGFooter} from '../components/footer'
import styled from "styled-components"
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled.div`

section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: masonry;
  grid-gap:1rem;
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
          <iframe width="640" height="360" src={node.link}  frameborder="0" allowfullscreen></iframe>
          <p>{node.title}</p> 
          <p>{node.year}</p> 
          <p>{node.website}</p> 
          <p>{node.socialMedia}</p> 
          <p>{node.summary}</p> 
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
