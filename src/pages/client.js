import * as React from 'react'
import { graphql } from 'gatsby'
import {AnimationNav} from '../components/nav'
import {SGFooter} from '../components/footer'
import styled from "styled-components"
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled.div`

section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:center;
}
main div{
  width:375px;
  height:auto;
  margin:1rem;
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
        <div key={node.title}>
          <iframe src={node.link} maxWidth={376} maxHeight={212} title={"Watch "+ node.title} frameBorder="0" allowFullScreen></iframe>
          <details>
            <summary>
             {node.title}
            </summary>
            <p>{node.year}</p> 
            <p><a href={node.website}>{node.website}</a></p> 
            <p><a href={node.socialMedia}>{node.socialMedia}</a></p> 
            <p>{node.summary}</p> 
          </details>
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
