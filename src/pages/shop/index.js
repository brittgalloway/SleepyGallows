import * as React from 'react'
import styled from 'styled-components'
import { Footer } from '../../components/footer'
import Layout from '../../components/layout'

const Main = styled("main")`

  padding: 2rem;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 75vh;
  flex-direction: column;
  flex-wrap: wrap;

`
const H1= styled("h1")`

  font-family: var(--brandFont);
  font-size: 2rem;
  text-align: center;

`
const Iframe= styled("iframe")`

  width: 60%;

`
const H2 = styled("h2")`

  border-radius: 0px;

`
const ShopHome = () => (
  <>
    <Layout title={'Shop'}/>
    <Main>
      <H1>Coming Late 2024</H1>
      <H2>Don't miss the launch!</H2>
      <Iframe src='https://embeds.beehiiv.com/3178b493-940a-49e7-a1e0-c7095d94b9db?slim=true' frameBorder={0} data-test-id='beehiiv-embed' ></Iframe>
    </Main>
    <Footer/>
  </>
)

export default ShopHome
