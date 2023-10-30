import * as React from 'react'
import { graphql } from 'gatsby'
import { Footer } from '../components/footer'
import styled from 'styled-components'
import { Head } from '../components/head'
import '../styles/global.css'

const StyledDiv = styled("div")`
text-align: center;
h1{
  font-family: var(--brandFont);
    font-size: 2rem;
}

main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0;
  @media(max-width: 830px){
    flex-direction: column;
    margin:0;
    p{
      text-align: justify;
    }
  }

}
#tools{
  justify-content: center;
  span{
    padding: 1rem;
  }
}
main > div:first-child{

  border: none;
  box-shadow: none;
  @media(max-width: 830px){
    padding:0;
  }
}
footer{
  margin:0;
}
`
const Projects = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width:75%;
  @media(max-width: 830px){
    width: 100%;
  }
  `
  const Project = styled("div")`
  border: .5px solid var(--brand-color);
  border-radius: 15px;
  box-shadow: var(--text-shadow);
  width: 45%;
  padding: 2rem;
  margin: 1rem;
  @media(max-width: 830px){
    width: 100%;
  }
`
const Info = styled("section")`
  margin: 0;
`

const WebDevPage = ({data}) => {

    return (
      <StyledDiv>
          <Head title={ "Brittney's Web Development" } />
          <header>
            <h1>Brittney Galloway</h1>
            <p>Frontend Web Developer</p>
          </header>
          <main>
            <Projects>
              {data.allDatoCmsWebProject.edges.map(({node})=> (
                <Project key={node.id}>
                    <h2>{node.projectName}</h2>
                    <p>{node.tools}</p> 
                    <p><a href={node.liveApp}>See it here</a></p> 
                    <p><a href={node.github}>Github</a></p> 
                    <div dangerouslySetInnerHTML={{ __html: node.description }}/>
                </Project>
              ))}
              </Projects>
              <Info>
                <div id='tools'>
                  <span>
                    <h2>
                      Favorite Tools
                    </h2>
                    <ul>
                      <li>
                        HTML5
                      </li>
                      <li>
                        Sass
                      </li>
                      <li>
                        Javascript
                      </li>
                      <li>
                        CSS3
                      </li>
                      <li>
                        Flexbox
                      </li>
                      <li>
                        Gatsby
                      </li>
                      <li>
                        Dato CMS
                      </li>
                      <li>
                        Figma
                      </li>
                    </ul>
                    </span>
                    <span>
                    <h2>
                      Familar Tools
                    </h2>
                    <ul>
                      <li>
                        JQuery
                      </li>
                      <li>
                        Bootstrap
                      </li>
                      <li>
                        CSS Grid
                      </li>
                      <li>
                        Handlebars
                      </li>
                      <li>
                        React
                      </li>
                    </ul>
                  </span>
                </div>
                <div id='social'>
                  <h2>Find Me</h2>
                  <span>
                    <ul>
                      <li>
                        <a href="https://github.com/brittgalloway">Github</a>
                      </li>
                      <li>
                        <a href="https://www.linkedin.com/in/brittneygalloway/">LinkedIn</a>
                      </li>
                    </ul>
                  </span>
                </div>
            </Info>  
          </main>
            <Footer footer={"Brittney Galloway"} />
      </StyledDiv>
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
        }
      }
    }
  }
  
`