import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled.div`
height: 100vh;
overflow-y: hidden;
overflow-x: hidden;
main{
  padding:0; 
  display:flex;
  flex-direction:row;
  height: 100%;
}
main > a{ 
  display: flex;
  justify-content: center;
  width:50%;
  height: 100%;
  p{
    font-family: var(--brandFont);
    font-size: 2.5em;
    color: white;
    text-shadow: 3px 3px 0px var(--brand-color);
    text-align: center;
    align-self: center;

  }
  &:hover{
    text-decoration:none;
    // animation: blurry 2s;
  }
}
@keyframes blurry{
  0% { -webkit-filter: blur(0px);}
  50% { -webkit-filter: blur(5px);}
}
a[href*="crystal"]{
  background-color: var(--pink-highlight); 
}
a[href*="brittney"]{
  background-color: var(--seagreen-highlight); 
}
`

const ArtPage = () => {
    return (
      <StyledDiv>
          <Layout />
          <main>
          <Link to="/crystalsart"><p>Crystal</p></Link>
          <Link to="/brittneysart"><p>brittney</p></Link>
          </main>
      </StyledDiv>
    )
  }
  
  export default ArtPage