import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import {SGFooter} from '../components/footer'
import styled from "styled-components"
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled.div`

`

const DesignPage = ({data}) => {
    return (
      <StyledDiv>
          <Layout />
          <main>
            <h1>Graphic & Web Design</h1>
            <section>
              {data.allDatoCmsGDesign.edges.map(({node})=> (
                <div>
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
          details
          projectLink
          name
          logo{
            image2 {
              gatsbyImageData
              alt
              title
            }
          }
        }
      }
    }
  }
`