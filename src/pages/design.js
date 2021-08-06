import * as React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled.div`

`

const DesignPage = () => {
    return (
      <StyledDiv>
          <Layout />
          <main>
            <h1>Graphic Design</h1>
          </main>
      </StyledDiv>
    )
  }
  
  export default DesignPage