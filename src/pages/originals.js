import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { AnimationNav } from '../components/nav'
import { Footer } from '../components/footer'
import styled from 'styled-components'
import Layout from '../components/layout'
import '../styles/global.css'

const StyledDiv = styled("div")`
text-align: center;
section {
  padding-top: 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap:1.5rem;
  @media (max-width: 830px){
    grid-template-columns: repeat(1, 1fr);
  }
}
div{
  justify-self: center;
  &:hover{
    transform: scale(1.05);
    transition: all .2s ease-in-out;
    box-shadow: 1px 1px 7px var(--brand-color);
  }
  &.logo{
    &:hover{
      transform: scale(1);
      transition: none;
      box-shadow: 0px 0px 0px var(--brand-color);
    }

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
    <Layout title={"Originals"}/>
    <main>
      <AnimationNav/>
      <h1>Originals</h1>
      <h2>SG Shorts and Webseries</h2>
      <section>
        {data.allDatoCmsOriginal.edges.map(({node})=> (
          <div>
            <Link to={`/${node.link}`}> 
              <GatsbyImage key={node.id} image={node.thumb.gatsbyImageData} alt={node.thumb.alt}/>
            </Link>
          </div>
        ))}
      </section>
    </main>
    <Footer/>
    </StyledDiv>
  )
  
    export default OriginalsPage
  
  export const query = graphql`
  query OgQuery {
    allDatoCmsOriginal(sort: {id: ASC})  {
        edges {
          node {
            thumb {
              alt
              gatsbyImageData
            }
            link
            id
          }
        }
      }
    }
    
  `