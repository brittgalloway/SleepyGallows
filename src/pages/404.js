import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import '../styles/global.css'

const StyledDiv = styled.div`
  background: linear-gradient(180deg,#b5dbff,#d0c1f4);
  width: 100vw;
  height:100vh;
  color: var(--text-color);
  font-family: var(--textFont);
  font-size: 1.5rem;
  text-align:center;

  a{

      font-weight:bold;
      text-decoration: none;
      color: var(--brand-color);
      &:hover{
          color: var(--pink-highlight);
      }
  }
  h1{
      font-family: var(--brandFont);
      font-size: 3rem;
      color: var(--brand-color);
      margin: 0;
      padding: 2rem;
      @media (max-width: 480px){
          font-size: 2rem;
      }
  }
`

const NotFoundPage = () => {
  return (
    <StyledDiv >
      <title>Not found</title>
      <h1 >Page not found</h1>
      <p>
        Sorry
        <br/>
        we couldn’t find what you were looking for.
        <br/>
        <Link to="/">Return Home</Link>.
      </p>
    </StyledDiv>
  )
}

export default NotFoundPage
