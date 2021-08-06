import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled.div`

`

const AnimationPage = () => {
    return (
      <StyledDiv>
          <Layout />
          <main>
          <h1>Animation</h1>
          <Link to="/originals">
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