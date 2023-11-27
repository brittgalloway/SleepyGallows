import * as React from 'react'
import { graphql } from 'gatsby'
import { Footer } from '../components/footer'
import styled from 'styled-components'
import { WebLayout } from '../components/layout'
import WebProjects from '../components/webProjects'
import WebTools from '../components/webTools'
import WebContact from '../components/webContact'
import '../styles/webStyles.css'
import BrittneyAvitar from '../lottie/headerAnimation'

const Wrapper = styled("div")`
text-align: center;
h1, 
h2,
h3 {
  font-family: var(--webHeader);
  color: var(--purple);
}
footer{
  margin:0;
  font-family: var(--webText);
  padding-top: 2em;
  em {
    font-style:normal;
  }
}
`
const Div = styled("div")`
  border: 3px solid var(--light-purple);
  border-radius: 34px;
  margin: 30px auto;
  width: 75%;
  @media (width <= 450px) {
    margin: 10px auto;
    width: 90%;
    border: none;
    border-bottom: 3px solid var(--light-purple);
  }
`
const Graphic = styled("a")`
  width: 80%;
  margin: 20px auto;
  @media (width <= 450px) {
    width: 90%;
  }
`
const P = styled("p")`
  font-family: var(--webText);
  color: var(--textColor);
  text-align: left;
`
const Main = styled("main")`
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  @media (width <= 450px){
    width: 100%;
    margin:0;
    p{
      text-align: justify;
    }
  }

`
const Projects = styled("section")`
  display: flex;
  flex-wrap: wrap;
  gap: 10%;
  justify-content: center;
  @media (width <= 450px){
    width: 100%;
  }
`
const OneMore = styled("aside")`
  background: var(--light-green);
  padding: 20px 20px 70px 20px;
  border-bottom: 3px solid var(--green);
  border-radius: 0 0 50% 50%;
  p {
    margin: auto;
    width: 75%;
    text-align: justify;
    @media (width <= 450px){
      text-align: center;
    }
  }
`

const WebDevPage = ({data}) => {

    return (
      <Wrapper>
          <WebLayout title={ "Brittney's Web Development" } />
          <header>
            <Div>
              <h1>Brittney Galloway</h1>
              <h2>Frontend Web Developer</h2>
              <Graphic href='#connect'>
                <BrittneyAvitar/>
              </Graphic>
            </Div>
          </header>
          <Main>
            <section id='aboutMe'>
              <P>I’m a front-end web developer with a background in animation. I learned web development to build an art portfolio for my sister and myself. Then I built an e-commerce store for my sister’s art.</P>
              <P>Now I’m a professional front-end developer fixing bugs and matching mockups for an e-commerce company.</P>
              <P>Based in the Chicagoland area.</P>
            </section> 
            <h2>Projects</h2>
            <Projects> {/* the height is wonky on Firefox*/}
              {data.allDatoCmsWebProject.edges.map(({node})=> (
                <WebProjects
                key={node.id}
                id={node.id}
                icon={node.icon}
                projectName={node.projectName}
                screenshot={node.screenshot}
                description={node.description}
                liveApp={node.liveApp}
                github={node.github}
                />
              ))}
            </Projects>
            <WebTools/>
            <WebContact/>
          </Main>
          <OneMore>
            <h2>One more thing!</h2>
            <P>Art helps my coding and coding helps my art.</P>
            <P>Learning JavaScript has helped me with my 2D animations via Adobe After Effects Expressions. Similarly Python scripts have been helpful in Blender, even using Grease Pencil. Here, I also created my own Lottie files with Adobe After Effects.
I can’t wait to make cool stuff as I learn to mix these 2 passions more and more.</P>
          </OneMore>
          <Footer footer={"Brittney Galloway"} />
      </Wrapper>
    )
  }
  
export default WebDevPage

export const query = graphql`
  query WebQuery {
    allDatoCmsWebProject(sort: {projectName: ASC}) {
      edges {
        node {
          projectName
          liveApp
          github
          tools
          description
          id
          screenshot {
            url
          }
          icon {
            title
          }
        }
      }
    }
  } 
`