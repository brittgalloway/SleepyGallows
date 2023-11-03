import * as React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import {OriginalsNav ,AnimationNav} from '../../components/nav'
import {Footer} from '../../components/footer'
import Layout from '../../components/layout'

const StyledDiv = styled("div")`
section {
  // display: flex;
  // flex-direction: row;
  // flex-wrap: wrap;
  // justify-content:center;
  text-align:center;
}
div{
  max-width:600px;
  height:auto;
  margin:1rem;
}
img{
  max-height: 300px;
}
h1{
  font-family: var(--brandFont);
    font-size: 2rem;
    text-align: center;
    display:block;
}
h2, p{
  display:block;
  font-size: 1rem;
  padding:none;
}
`
const ElePage = ({ data }) => (
  <StyledDiv>
    <Layout title={data.datoCmsOriginal.name} />
    <main>
    <AnimationNav/>
    <OriginalsNav
      name={data.datoCmsOriginal.name}
      link={data.datoCmsOriginal.link}
    />
    <h1>{data.datoCmsOriginal.name}</h1>
    <section>
      <h3>
        In Production!
      </h3>
      <h2>
        Coming Soon
      </h2>
      <img src = "https://www.datocms-assets.com/53347/1698974110-turnaroundjoey.gif" alt="360 view of the character Joey."/>
      {/* {data.datoCmsOriginal.watch.map((video)=> (
        <div>
          <iframe maxwidth={376} maxHeight={212} src={video.link} title={"Watch "+ video.title} frameBorder="0" allowFullScreen></iframe>
            <h2>
              {video.title}
            </h2> 
            <p>{video.year}</p> 
        </div>
      ))} */}
    </section>
    </main>
  <Footer/>
  </StyledDiv>
)

  export default ElePage

export const query = graphql`
query EleQuery {
  datoCmsOriginal(name: {eq: "The Elusive Green Elephant"}) {
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