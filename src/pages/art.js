import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled.div`

`

const ArtPage = () => {
    return (
      <StyledDiv>
          <Layout />
          <main>
          <h1>Art</h1>
          <Link to="/crystalsart">Crystal</Link>
          <Link to="/brittneysart">brittney</Link>
          </main>
      </StyledDiv>
    )
  }
  
  export default ArtPage