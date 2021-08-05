import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import '../styles/global.css'

const StyledDiv = styled.div`
    background: linear-gradient(180deg,#b5dbff,#d0c1f4);
    width: 100vw;
    height:100vh;

    section{
        text-align:center;
    }
    nav{
        font-family: var(--linkFont);
        font-size: 2rem;
        ul{
            list-style:none;
            padding:0;
            li{
                padding: 1rem;
                @media (max-width: 480px){
                    font-size: 2rem;
                }
                a{
                    text-decoration: none;
                    color: var(--brand-color);
                    &:hover{
                        color: var(--pink-highlight);
                    }
                }
            }
        }
    }
  
    h1{
        font-family: var(--brandFont);
        font-size: 3rem;
        color: var(--brand-color);
        margin: 0;
        padding: 2rem;
        @media (max-width: 780px){
            font-size: 2rem;
        }
    }


`
  
const Links = () => {
    return (
    <StyledDiv>
        <section>
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
        </section>
    </StyledDiv>
    )
  }
  
  export default Links