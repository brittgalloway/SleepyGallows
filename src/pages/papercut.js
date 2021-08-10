import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import {BrittneyNav} from '../components/nav'
import {BrittFooter} from '../components/footer'
import styled from "styled-components"
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled.div`
section {
  column-count: 3;
  column-gap: .1rem;
}
img{
  margin: 1rem;
  &:hover{
    transform: scale(1.05);
    transition: all .2s ease-in-out;
  }
`
const PaperPage = ({ data }) => (
  <StyledDiv>
    <Layout />
    <main>
      <BrittneyNav/>
      <section>
        {data.allDatoCmsPaperCutout.edges.map(({node})=> (
          <div>
          <GatsbyImage image={node.paperArt.gatsbyImageData} alt={node.paperArt.alt}/>
          </div>
        ))}
      </section>
    </main>
    <BrittFooter/>
  </StyledDiv>
)
  
  export default PaperPage

  export const query = graphql`
query PaperQuery {
    allDatoCmsPaperCutout {
        edges {
          node {
            paperArt {
              alt
              gatsbyImageData
              title
            }
          }
        }
      }
    }
    

`