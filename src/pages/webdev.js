import * as React from 'react'
import { graphql } from 'gatsby'
import {Footer} from '../components/footer'
import styled from "styled-components"
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled("div")`
text-align: center;

main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  @media(max-width: 830px){
    flex-direction: column;
    margin:0;
    p{
      text-align: justify;
    }
  }

}
section{
  width:50%;
  @media(max-width: 830px){
    width: 100%;
  }
}
h1{
  font-family: var(--brandFont);
    font-size: 2rem;
}
#tools{
  display: flex;
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
div{
  border: .5px solid var(--brand-color);
  border-radius: 15px;
  box-shadow: var(--text-shadow);
  width: 90%;
  padding: 2rem;
  margin: 1rem;
}
summary{
  font-weight: bold;
  &:hover{
    cursor: pointer;
  }
}
summary::marker{
  font-size:0;
}

`

const WebDevPage = ({data}) => {

    return (
      <StyledDiv>
          <Layout title={"Brittney's Web Development"}/>
          <main>
            <div>
              <h1>Web Development</h1>
              <p>Brittney Galloway is also a Frontend Web Developer. Below are a few of her best projects.</p>
            </div>
            <section>
              {data.allDatoCmsWebProject.edges.map(({node})=> (
                <div>
                  <details>
                    <summary key = {node.projectName}>
                    {node.projectName}
                    </summary>
                    <p>{node.tools}</p> 
                    <p><a href={node.liveApp}>See it here.</a></p> 
                    <p><a href={node.github}>Github</a></p> 
                    <p dangerouslySetInnerHTML={{ __html: node.description }}/>
                  </details>
                </div>
              ))}
              </section>
              <section>
              <div id='tools'>
                <span>
                  <h2>
                    Favorite Tools
                  </h2>
                  <ul>
                    <li>
                      Gatsby
                    </li>
                    <li>
                      Dato CMS
                    </li>
                    <li>
                      Sass
                    </li>
                    <li>
                      HTML5
                    </li>
                    <li>
                      CSS3
                    </li>
                    <li>
                      Flexbox
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
                      Javascript
                    </li>
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
                    <li>
                      Firebase
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
            </section>  
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
        }
      }
    }
  }
  
`