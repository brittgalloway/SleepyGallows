import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import styled from 'styled-components'
import {OriginalsNav ,AnimationNav} from '../../components/nav'
import {SGFooter} from '../../components/footer'
import Layout from '../../components/layout'

const StyledDiv = styled.div`
section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:center;
  padding: 2rem;
}
img{
  margin: 1rem 2rem;
  max-width: 450px;
  height:auto;

}
div{
  width:300px;
}
h1{
  font-family: var(--brandFont);
    font-size: 2rem;
    text-align: center;
}
h2, p{
  font-size: 1rem;
  padding:none;
}
`

const PlhAboutPage = ({ data }) => (
  
  <StyledDiv>
    <Layout />
    <main>
    <AnimationNav/>
    <OriginalsNav/>
    <h1>What is {data.datoCmsOriginal.name}?</h1>
      <p>
        {data.datoCmsOriginal.summary}
      </p>
    <section>
    {data.datoCmsOriginal.about.map(({character})=> (
          <div>
            <GatsbyImage image={character.gatsbyImageData} alt={character.alt}/>
          </div>
        ))}
    </section>
    </main>
  <SGFooter/>
 

 
  </StyledDiv>
)

  export default PlhAboutPage

export const query = graphql`
query PlhAboutQuery {
  datoCmsOriginal {
    name
    summary
    about {
      character {
        title
        alt
        gatsbyImageData
      }
    }
  }
}

`