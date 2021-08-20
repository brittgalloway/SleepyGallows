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
  background-color: var(--purple-highlight); 
  p{
    font-family: var(--brandFont);
    font-size: 2.5em;
    color: white;
    text-shadow: 3px 3px 10px var(--brand-color);
    text-align: center;
    align-self: center;
    z-index:1;
    position: absolute;
  }
  img{
   object-fit: cover;
   width:100%;
  }
  img[src*="brittney"]{
     object-position: top;
  }
&:hover{
  text-decoration:none;
  img{
    animation: blurry 2s;
    }
  }
}
@keyframes blurry{
  0% { -webkit-filter: blur(0px);}
  50% { -webkit-filter: blur(5px);}
}
`

const ArtPage = () => {
    return (
      <StyledDiv>
          <Layout />
          <main>
          <Link to="/crystalsart">
            <p>Crystal</p>
            <img src="https://www.datocms-assets.com/53347/1629472253-crystalsart.svg" alt="Link to Crystal's art. Drawing of Baby Harmony and His Parents" />
          </Link>
          <Link to="/brittneysart">
            <p>Brittney</p>
            <img src="https://www.datocms-assets.com/53347/1629472435-brittneysart.svg" alt="Link to Brittney's art. Drawing of a woman in a blue patterned dress and a headwrap"/>
          </Link>
          </main>
      </StyledDiv>
    )
  }
  
  export default ArtPage