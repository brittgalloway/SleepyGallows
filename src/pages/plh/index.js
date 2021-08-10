import * as React from 'react'
import { graphql } from 'gatsby'
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
}
div{
  max-width:600px;
  height:auto;
  margin:1rem;
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
    <h1>{data.datoCmsOriginal.name}</h1>
    <section>
      {data.datoCmsOriginal.watch.map((video)=> (
        <div>
          <iframe width={376} height={212} src={video.link}  frameBorder="0" allowFullScreen></iframe>
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
    watch {
      link
      title
      year
    }
  }
}
`