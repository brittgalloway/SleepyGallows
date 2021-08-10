import * as React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import {OriginalsNav ,AnimationNav} from '../../components/nav'
import {SGFooter} from '../../components/footer'
import Layout from '../../components/layout'

const StyledDiv = styled.div`
section {
  padding-top: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-gap:1rem;
  justify-items:center;
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
const PlhPage = ({ data }) => (
  <StyledDiv>
    <Layout />
    <main>
    <AnimationNav/>
    <OriginalsNav/>
    <h1>Watch {data.datoCmsOriginal.name}</h1>
    <section>
      {data.datoCmsOriginal.watch.map((video)=> (
        <div>
          <iframe width="300" src={video.link}  frameborder="0" allowfullscreen></iframe>
            <h2>
              {video.title}
              </h2> 
           
            <p>{video.year}</p> 
          
         
        </div>
      ))}
    </section>
    </main>
  <SGFooter/>
  </StyledDiv>
)

  export default PlhPage

export const query = graphql`
query PlhQuery {
  datoCmsOriginal {
    name
    link
    summary
    watch {
      link
      title
      year
    }
  }
}
`