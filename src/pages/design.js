import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import {SGFooter} from '../components/footer'
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
            {/* loop here */}
            {/* image */}
            <details>
              <summary>
                Title
              </summary>
              <p>some info and maybe a link</p>
            </details>
            {/* end loop */}
            <SGFooter/>
          </main>
      </StyledDiv>
    )
  }
  
  export default DesignPage