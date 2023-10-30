import * as React from 'react'
import styled from 'styled-components'
import { Footer } from '../../components/footer'
import Layout from '../../components/layout'

const StyledDiv = styled("div")`
h1{
    font-family: var(--brandFont);
    font-size: 2rem;
    text-align: center;
}
main{
    margin-left: 20rem;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-content: center;
    height: 75vh;
    flex-wrap: wrap;
}
`
const ShopHome = () => (
  <StyledDiv>
    <Layout title={'Shop'}/>
    <main>
      <h1>Coming Late 2024</h1>
    </main>
  <Footer/>
  </StyledDiv>
)

export default ShopHome
