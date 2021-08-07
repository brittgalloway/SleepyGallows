import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import {CrystalNav} from '../components/nav'
import {CrystalFooter} from '../components/footer'
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
}
`

const IllustrationPage = ({ data }) => (
  <StyledDiv>
    <Layout />
    <main>
      <CrystalNav/>
      <section>
        {data.allDatoCmsIllustraion.edges.map(({node})=> (
          <div>
          <GatsbyImage image={node.art.gatsbyImageData} alt={node.art.alt}/>
          </div>
        ))}
      </section>
    </main>
    <CrystalFooter/>
  </StyledDiv>
)

  export default IllustrationPage

export const query = graphql`
query ArtQuery {
  allDatoCmsIllustraion {
    edges {
      node {
        art {
          gatsbyImageData(placeholder: BLURRED)
          alt
          title
        }
      }
    }
  }
}
`