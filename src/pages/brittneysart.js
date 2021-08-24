import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import {BrittneyNav} from '../components/nav'
import {BrittFooter} from '../components/footer'
import {Lightbox}  from 'react-lightbox-pack'
import styled from 'styled-components'
import Layout from '../components/layout'
import "react-lightbox-pack/dist/index.css"
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
`
//https://simple-react-lightbox.dev/documentation
// https://reactjsexample.com/a-minimal-lightbox-package-for-react/
// https://codesandbox.io/s/5vn3lvz2n4?file=/package.json:3-52
const SketchPage = ({ data }) => {
  // State
	const [toggle, setToggle] =  React.useState(false);
	const [sIndex, setSIndex] =  React.useState(0);

	// Handler
	const  lightBoxHandler  = (state, sIndex) => {
		setToggle(state);
		setSIndex(sIndex);
	};
  return(

  <StyledDiv>
    <Layout />
    <main>
      <BrittneyNav/>
      <section>
     
        {data.allDatoCmsSketchImg.edges.map(({node, index})=> (
            <GatsbyImage 
            image={node.sketchImg.gatsbyImageData} 
            alt={node.sketchImg.alt}
            key= {node.sketchImg.originalId}
            onClick={() => {
              lightBoxHandler(true, index);
              }}
             
            />
        ))}
			<LightBox
				state={toggle}
        event={lightBoxHandler}
        data={data}
        imageWidth="60vw"
        imageHeight="70vh"
        thumbnailHeight={50}
        thumbnailWidth={50}
        setImageIndex={setSIndex}
        imageIndex={sIndex}
			/>
      </section>
    </main>
    <BrittFooter/>
  </StyledDiv>
)}
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