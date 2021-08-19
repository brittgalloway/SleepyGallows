import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled.div`
width: 100vw;
height: 100vh;
overflow-y: hidden;
overflow-x: hidden;
main{
  padding:0;
}
main > a{ 
  display:block;
  height: 33.33vh;
  font-family: var(--brandFont);
  text-align: center;
  font-size: 2.5em;
  color: white;
  text-shadow: 3px 3px 0px var(--brand-color);
  padding-top: 10vh;
  &:hover{
    text-decoration:none;
    // animation: blurry 2s;
  }
}
@keyframes blurry{
  0% { -webkit-filter: blur(0px);}
  50% { -webkit-filter: blur(5px);}
}
a[href*="plh"]{
  background-color: var(--purple-highlight); 
}
a[href*="client"]{
  background-color: var(--seagreen-highlight); 
}
a[href*="fun"]{
  background-color: var(--blue-highlight); 
}
`

const AnimationPage = () => {
    return (
      <StyledDiv>
          <Layout />
          <main>
          <Link to="/plh">
            Originals
          </Link>
          <Link to="/client">
            Client Work
          </Link>
          <Link to="/fun">
            For Fun
          </Link>
       </main>
       </StyledDiv>
    )
  }
  
  export default AnimationPage