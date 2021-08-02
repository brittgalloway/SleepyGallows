import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
// import '../styles/global.css'

const StyledDiv = styled.div`
      nav{
        font-family: var(--textFont);
    }
    h1{
        font-family: var(--brandFont);
    }


`
  
const Links = () => {
    return (
    <StyledDiv>
        <h1>Sleepy Gallows Links</h1>
        <nav>
            <ul>
                <li>
                    <Link to="/">Offical Website</Link>
                </li>
                <li>
                    <a className="linkList" href="https://ko-fi.com/sleepygallows">Ko-fi</a>
                </li>
                <li>
                    <a className="linkList" href="https://brittgalloway.github.io/SG_Blog/">Blog</a>
                </li>
                <li>
                    <a className="linkList" href="https://brittgalloway.github.io/memory_game/">PLH Memory Game</a>
                </li>
                <li>
                    <a className="linkList" href="https://www.patreon.com/2heroes">2Heroes Patreon</a>
                </li>
                <li>
                    <a className="linkList" href="https://www.candyfluffs.com/2heroes">2Heroes Necahual</a>
                </li>
            </ul>
        </nav>
    </StyledDiv>
    )
  }
  
  export default Links