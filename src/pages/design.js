import * as React from 'react'
import { graphql } from 'gatsby'
import {SGFooter} from '../components/footer'
import styled from "styled-components"
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled.div`

section {
  display:flex;
  flex-direction: row-reverse;
  flex-wrap: wrap-reverse;
  width: 70%;
}
#tools{
  display: flex;
  justify-content: center;
  span{
    padding: 1rem;
  }
}
div{
  border: .5px solid var(--brand-color);
  border-radius: 15px;
  box-shadow: var(--text-shadow);
  width: 70%;
  padding: 2rem;
  margin: 1rem;
}
summary{
  font-weight: bold;
}
summary::marker{
  color: var(--brand-color);
  transition: .25s transform ease;
}

`

const DesignPage = ({data}) => {

  
  
    return (
      <StyledDiv>
          <Layout />
          <main>
            <h1>Web Development</h1>
            <p>Brittney Galloway is also a Frontend Web Developer. Below are a few of her best projects.</p>
            <section>
              {data.allDatoCmsWebProject.edges.map(({node})=> (
                <div>
                  <details>
                    <summary>
                    {node.projectName}
                    </summary>
                    <p>{node.tools}</p> 
                    <p><a href={node.liveApp}>See it here.</a></p> 
                    <p><a href={node.github}>Github</a></p> 
                    <p>{node.description}</p> 
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
            </section>
          </main>
            <SGFooter/>
      </StyledDiv>
    )
  }
  
  export default DesignPage

  export const query = graphql`
  query WebQuery {
    allDatoCmsWebProject(sort: {fields: projectName}) {
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