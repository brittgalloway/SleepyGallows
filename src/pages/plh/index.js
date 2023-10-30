import * as React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { OriginalsNav, AnimationNav } from '../../components/nav'
import { Footer } from '../../components/footer'
import Layout from '../../components/layout'

const StyledDiv = styled("div")`
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
    <Layout title={data.datoCmsOriginal.name}/>
    <main>
    <AnimationNav/>
    <OriginalsNav
      name={data.datoCmsOriginal.name}
      link={data.datoCmsOriginal.link}
    />
    <h1>{data.datoCmsOriginal.name}</h1>
    <section>
      {data.datoCmsOriginal.watch.map((video)=> (
        <div>
          <iframe maxwidth={376} maxHeight={212} src={video.link} title={"Watch "+ video.title} frameBorder="0" allowFullScreen></iframe>
            <h2>
              {video.title}
              </h2> 
           
            <p>{video.year}</p>        
        </div>
      ))}
    </section>
    </main>
  <Footer/>
  </StyledDiv>
)

  export default PlhPage

export const query = graphql`
query PlhQuery {
  datoCmsOriginal(name: {eq: "For Peace, Love, & Harmony"})  {
    name
    link
    watch {
      link
      title
      year
    }
  }
}
`