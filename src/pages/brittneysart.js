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
  display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
   
}
img{
  // margin: 1rem;
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
      <ImageList rowHeight={1}  cols={3}>
        {data.allDatoCmsSketchImg.edges.map(({node})=> (
          <ImageListItem key={node.sketchImg.gatsbyImageData} cols={node.cols || 1}>
            <GatsbyImage id={node.originalId} image={node.sketchImg.gatsbyImageData} alt={node.sketchImg.alt}/>
          </ImageListItem>
        ))}
        </ImageList>
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