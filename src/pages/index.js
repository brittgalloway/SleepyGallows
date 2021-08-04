import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import '../styles/global.css'

const StyledDiv = styled.div`

background: linear-gradient(155.85deg, #f7cade 11.48%, #cde7ff 67.04%);
width: 100vw;
height: 100vh;
overflow-y: hidden;
overflow-x: hidden;


a p{
  position: fixed;
  font-family: var(--brandFont);
  font-size: 3.25em;
  color: white;
  text-shadow: 3px 3px 0px var(--brand-color);
  font-weight: bold;
  background-color: #FC79B4;
  width: fit-content;
  height: fit-content;
  line-height: 1em;
  z-index: 1;  
  margin: auto ;
}
a{
  width: fit-content;
  position: absolute;
}

img {
    width: 50vw;
    height: 50vh;
    mix-blend-mode: multiply;
    object-fit:fill;
    &:hover{
      animation: blurry 2s;
     }
  }
  @keyframes blurry{
    0% { -webkit-filter: blur(0px);}
    50% { -webkit-filter: blur(5px);}
  }
 
  a#comics {
    left: 50vw;
  }
  a#art{
    top: 50vh;
  }
  a#design {
    left: 50vw;
    top: 50vh;
  }
`

const IndexPage = () => {
  return (
  <StyledDiv>
      <Link to="/animation" id="animation">
        <p>Animation</p>
        <StaticImage width={"50vw"} src="https://www.datocms-assets.com/53347/1628108199-rectangle1animation.png" alt="animation"/>
      </Link>
      
      <Link to="/comics" id="comics">
        <p>comics</p>
        <StaticImage width={"50vw"}src="https://www.datocms-assets.com/53347/1628108650-rectangle3comics.png" alt="animation"/>
      </Link>
      <Link to="/art" id="art">
        <p>art</p>
        <StaticImage width={"50vw"} src="https://www.datocms-assets.com/53347/1628108278-rectangle2art.png" alt="animation"/>
      </Link>
      <Link to="/design" id="design">
        <p>design</p>
        <StaticImage width={"50vw"} src="https://www.datocms-assets.com/53347/1628108742-rectangle4web.png" alt="animation"/>
      </Link>
  </StyledDiv>
  )
}

export default IndexPage

