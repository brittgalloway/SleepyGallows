import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import {CrystalNav} from '../components/nav'
import {CrystalFooter} from '../components/footer'
import styled from "styled-components"
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled.div`
.grid {
  column-count: 3;
  column-gap: .1rem;
}
img{
  margin: 1rem;
  &:hover{
    transform: scale(1.05);
    transition: all .2s ease-in-out;
  }
h1, h2{
  font-family: var(--brandFont);
  font-size: 2rem;
  text-align: center;
}
`

//   export default CrystalPage
const VisDevPage = ({ data }) => (
  <StyledDiv>
    <Layout />
    <main>
      <CrystalNav/>
      <section>
        <h1>The Little Mermaid</h1>
        <p>
        I read the Little Mermaid by Hans Cristian Anderson for the first time a couple of years ago and I was very surprised when I read it because in every version of the tale that I saw on film it took place somewhere in Europe, or at least a fantasy place inspired by Europe. However when I read the tale it did not seem like a European setting. It felt eastern. Perhaps it was just the translation from the version that I read, but the fact that they would say palace instead of castle and temple instead of church really had my thinking. I did a lot of research on where it could have taken place and I saw the illustrations that Edmund Dulac did for the tale which have very heavy Eastern influence. I decided that I wanted to redesign the story set in India. It is still a far off idea, but I hope to be able to turn this into a full movie on day.
        </p>
        <h2>Characters</h2>
        <div className="grid">
        {data.allDatoCmsMermaidVisdev.edges.map(({node})=> (
          <div>
          <GatsbyImage image={node.visArt.gatsbyImageData} alt={node.visArt.alt}/>
          </div>
        ))}
        </div>
      </section>
      <section>
        <h2>Visual Design</h2>
        <div className="grid">
        {data.allDatoCmsVisdev.edges.map(({node})=> (
          <div>
          <GatsbyImage image={node.plhVisdev.gatsbyImageData} alt={node.plhVisdev.alt}/>
          </div>
        ))}
        </div>
      </section>
    </main>
    <CrystalFooter/>
  </StyledDiv>
)

  export default VisDevPage

export const query = graphql`
query VisDevQuery {
    allDatoCmsVisdev(sort: {fields: plhVisdev___createdAt}) {
      edges {
        node {
          plhVisdev {
            alt
            gatsbyImageData
            title
          }
        }
      }
    }
    allDatoCmsMermaidVisdev(sort: {fields: visArt___createdAt}) {
      edges {
        node {
          visArt {
            alt
            gatsbyImageData
            title
          }
        }
      }
    }
  }
  
`