import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import {SGFooter} from '../components/footer'
import styled from "styled-components"
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled.div`

div.card:first-child{
  display: none;
  visibility:hidden;
  opacity: 0;
}

section {
  display:flex;
  flex-direction: row-reverse;
  flex-wrap: wrap-reverse;
  width: 70%;
}
div.card{
  margin: 1rem;
  width: 20rem; 
  height: 520px;
}
summary::marker{
  color: var(--brand-color);
  transition: .25s transform ease;
}
details[open] > summary::marker {
  transform: rotate(90deg);
}
`

const DesignPage = ({data}) => {

  
  
    return (
      <StyledDiv>
          <Layout />
          <main>
            <h1>Graphic & Web Design</h1>
            <section>
              {data.allDatoCmsGDesign.edges.map(({node})=> (
                <div className="card">
                  <GatsbyImage image={node.logo.gatsbyImageData} alt={node.logo.alt}/>
                  <details>
                    <summary>
                      {node.name}
                    </summary>
                    <p>{node.details}</p>
                    <p><a href={node.projectLink}>Find it here.</a></p>
                  </details>
                </div>
              ))}

            </section>
        
            <SGFooter/>
          </main>
      </StyledDiv>
    )
  }
  
  export default DesignPage

  export const query = graphql`
  query DesignQuery {
    allDatoCmsGDesign {
      edges {
        node {
          name
          projectLink
          details
          logo {
            gatsbyImageData
            title
            alt
          }
          image2 {
            gatsbyImageData
            alt
            title
          }
          image3 {
            gatsbyImageData
            alt
            title
          }
          image4 {
            gatsbyImageData
            alt
            title
          }
          image5 {
            gatsbyImageData
            alt
            title
          }
        }
      }
    }
  }
`