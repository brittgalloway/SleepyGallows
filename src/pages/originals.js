import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import {AnimationNav} from '../components/nav'
import {SGFooter} from '../components/footer'
import styled from "styled-components"
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled.div`

`

const OriginalsPage = ({ data }) => (
  <StyledDiv>
    <Layout />
    <main>
      <AnimationNav/>
      <h1>Originals</h1>
      <h2>SG Shorts and Webseries</h2>
      <section>
        {data.allDatoCmsOriginal.edges.map(({node})=> (
          <Link to={node.link}> 
            <GatsbyImage image={node.thumb.gatsbyImageData} alt={node.thumb.alt}/>
          </Link>
        ))}
      </section>
      </main>
      <SGFooter/>
    </StyledDiv>
  )
  
    export default OriginalsPage
  
  export const query = graphql`
  query OgQuery {
    allDatoCmsOriginal {
        edges {
          node {
            thumb {
              alt
              gatsbyImageData
            }
            link
          }
        }
      }
    }
    
  `