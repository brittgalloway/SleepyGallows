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
  display:flex;
  height: 33.33vh;
  justify-content: center;
  p{
    font-family: var(--brandFont);
    font-size: 2em;
    color: white;
    text-shadow: 3px 3px 10px var(--text-color);
    align-self: center;
    z-index:1;
    position: absolute;
  }
  img{
   object-fit: cover;
   width:100%;
  }
  img[src*="original"]{
    object-position: 0 -100px;
    @media(max-width: 400px){
      object-position: center;
    }
 }

  &:hover{
    text-decoration:none;
    img{
      animation: blurry 2s;
      overflow: hidden;
      }
    }
}
@keyframes blurry{
  0% { -webkit-filter: blur(0px);}
  50% { -webkit-filter: blur(5px);}
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
           <p>Originals</p>
            <img src="https://www.datocms-assets.com/53347/1629471501-originals.jpg" alt="Link to Original animations page. Nirvana sitting on the branch" />
          </Link>
          <Link to="/client">
            <p>Client Work</p>
            <img src="https://www.datocms-assets.com/53347/1630809861-doublemindsm.png" alt="Link to Client animation page. Still from Double Mind music video" />
          </Link>
          <Link to="/fun">
            <p>For Fun</p>
            <img src="https://www.datocms-assets.com/53347/1630810673-crushsm.png" alt="Link to page of short fun animations. This is a drawing of Yuna inspired by her Chapters album visuals" />
          </Link>
       </main>
       </StyledDiv>
    )
  }
  
  export default AnimationPage