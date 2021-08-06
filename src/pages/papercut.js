import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import {BrittneyNav} from '../components/nav'
import {BrittFooter} from '../components/footer'
import styled from "styled-components"
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled.div`

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
          <p>{node.paperArt.title}</p> 
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