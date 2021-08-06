import * as React from "react"
import {ComicFooter} from '../components/footer'
import styled from "styled-components"
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled.div`

`

const ComicsPage = () => {
    return (
      <StyledDiv>
          <Layout />
          <main>
            <h1>Comics</h1>
          </main>
          <ComicFooter/>
      </StyledDiv>
    )
  }
  
  export default ComicsPage