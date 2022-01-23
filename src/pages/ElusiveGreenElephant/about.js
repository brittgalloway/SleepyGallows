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
main img{
  // margin: 1rem 2rem;
  // max-width: 450px;
  min-height:300px;
  @media (max-width: 830px){
    margin: 1rem 0;
  }
}
main div{
  width:300px;
}
h1, h2{
  font-family: var(--brandFont);
    font-size: 2rem;
    text-align: center;
}
p{
  font-size: 1rem;
  padding:none;
}
`

const EleAboutPage = ({ data }) => (
  
  <StyledDiv>
    <Layout />
    <main>
    <AnimationNav/>
    <OriginalsNav
      link={data.datoCmsOriginal.link}
    />
    <h1>What is {data.datoCmsOriginal.name}?</h1>
      <p dangerouslySetInnerHTML={{ __html: data.datoCmsOriginal.summary }}/>
      <h2>
        Characters
      </h2>
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

  export default EleAboutPage

export const query = graphql`
query EleAboutQuery {
  datoCmsOriginal(name: {eq: "The Elusive Green Elephant"}) {
    name
    summary
    link
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