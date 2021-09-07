import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import '../styles/global.css'

const StyledDiv = styled.div`

background: linear-gradient(155.85deg, #f7cade 11.48%, #cde7ff 67.04%);
width: 100vw;
height: 100vh;
overflow-y: hidden;
overflow-x: hidden;
display:flex;
flex-direction: row;
flex-wrap: wrap;


a{
  width: 50vw;
  height: 50vh;
  p{
    position: absolute;
    font-family: var(--brandFont);
    font-size: 3.25em;
    color: white;
    text-shadow: 3px 3px 0px var(--brand-color);
    font-weight: bold;
    background-color: var(--pink-highlight);
    line-height: 1em;
    z-index: 1;  
    margin: auto ;
    @media(max-width:830px){
      align-self: center;
      justify-self:center;
    }
  }
  @media(max-width: 830px){
    width: 100vw;
    height: 25vh;

   }
}

img {
    width: 50vw;
    height: 50vh;
    object-fit:cover;
    mix-blend-mode: multiply;
    margin: 0;
    &:hover{
      animation: blurry 2s;
     }
     @media(max-width: 830px){
      width: 100vw;
      height: 25vh;
     }
  }
  @keyframes blurry{
    0% { -webkit-filter: blur(0px);}
    50% { -webkit-filter: blur(5px);}
  }
 
  a[href*="animation"] p{
      top: 20%;
      left:25%;
      margin-left: -204px;
      @media(max-width: 830px){
        left:50%;
        top:10%;
        margin-left: -125px;
        font-size: 2em;
      }
    }
  }
  a[href*="comics"] {
    img{

      object-position: top;
    }
    p{
      top: 20%;
      right:25%;
      margin-right:-142px;
      @media(max-width: 830px){
        top:35%;
        right:50%;
        margin-right:-88px;
        font-size: 2em;
      }
    }
  }
  a[href*="art"]{
    p{
      bottom: 20%;
      left:25%;
      margin-left: -68px;
      @media(max-width: 830px){
        bottom:35%;
        left:50%;
        font-size: 2em;
        margin-left: -40px;
      }
    }
  }
  a[href*="webdev"]{
    img{
      object-position: top;
    }
    p{
      bottom: 20%;
      right: 25%;
      margin-right: -166px;
      @media(max-width: 830px){
        bottom: 10%;
        right:50%;
        margin-right:-101.5px;
        font-size: 2em;
      }
    }

  }
`

const IndexPage = () => {
  return (
  <StyledDiv>
      <Link to="/animation">
        <p>Animation</p>
        <img  src="https://www.datocms-assets.com/53347/1628108199-rectangle1animation.png" alt="Drawing of Harmony, Love, and Tranquility from PLH jumping over an earth attch from Damhan. Clicking here directs you to the animation page."/>
      </Link>
      <Link to="/comics">
        <p>comicS</p>
        <img src="https://www.datocms-assets.com/53347/1628108650-rectangle3comics.png" alt="Close up on the surprised faces of Anacoana, Necahual, and Quetzalli's face's (characters from the Comic Necahual) Clicking here directs you to the Comics page."/>
      </Link>
      <Link to="/art" >
        <p>Art</p>
        <img  src="https://www.datocms-assets.com/53347/1628108278-rectangle2art.png" alt="Drawing of man floating in space with a ouroboros dragon behind him. Clicking here directs you to the art page."/>
      </Link>
      <Link to="/webdev">
        <p>Websites</p>
        <img  src="https://www.datocms-assets.com/53347/1628108742-rectangle4web.png" alt="Screenshot of the web page 'Space Chasers' with light cyan blues and purlpes as the primary colors and shpes. Clicking here directs you to the Web Development page."/>
      </Link>
  </StyledDiv>
  )
}

export default IndexPage

