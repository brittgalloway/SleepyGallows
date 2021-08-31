import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import {AnimationNav} from '../components/nav'
import {SGFooter} from '../components/footer'
import styled from "styled-components"
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled.div`
text-align: center;
section {
  padding-top: 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: masonry;
  grid-gap:1rem;
}
div{
  justify-self: center;
  &:hover{
    transform: scale(1.05);
    transition: all .2s ease-in-out;
    box-shadow: 1px 1px 7px var(--brand-color);
  }
}
h1{
  font-family: var(--brandFont);
    font-size: 2rem;
}
h2, p{
  font-size: 1.5rem;
  padding:none;
}
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
          <div>
            <Link to={node.link}> 
              <GatsbyImage image={node.thumb.gatsbyImageData} alt={node.thumb.alt}/>
            </Link>
          </div>
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