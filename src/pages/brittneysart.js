import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import {BrittneyNav} from '../components/nav'
import {BrittFooter} from '../components/footer'
import styled from "styled-components"
import Layout from "../components/layout"
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
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
}
imageList: {
  width: 500,
  
},
`
const SketchPage = ({ data }) => (
  <StyledDiv>
    <Layout />
    <main>
      <BrittneyNav/>
      <section>
     
        {data.allDatoCmsSketchImg.edges.map(({node})=> (
            <GatsbyImage image={node.sketchImg.gatsbyImageData} alt={node.sketchImg.alt}/>
        ))}

      </section>
    </main>
    <BrittFooter/>
  </StyledDiv>
)
  
  export default SketchPage

  export const query = graphql`
query SketchQuery {
  allDatoCmsSketchImg {
    edges {
      node {
        sketchImg {
          gatsbyImageData(placeholder: BLURRED)
          title
          alt
          originalId
        }
      }
    }
  }
}

`