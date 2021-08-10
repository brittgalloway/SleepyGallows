import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import styled from 'styled-components'
import {OriginalsNav ,AnimationNav} from '../../components/nav'
import {SGFooter} from '../../components/footer'
import Layout from '../../components/layout'

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

const PlhArtPage = ({ data }) => (
  <StyledDiv>
    <Layout />
    <main>
    <AnimationNav/>
    <OriginalsNav/>
    <h1>Art of {data.datoCmsOriginal.name}</h1>
    <section>
    {data.datoCmsOriginal.art.map(({image2})=> (
          <div>
            <GatsbyImage image={image2.gatsbyImageData} alt={image2.alt}/>
          </div>
        ))}
    </section>
    </main>
  <SGFooter/>
  </StyledDiv>
)

  export default PlhArtPage

export const query = graphql`
query PlhArtQuery {
  datoCmsOriginal {
    name
    art {
      image2 {
        title
        alt
        gatsbyImageData
      }
    }
  }
}

`