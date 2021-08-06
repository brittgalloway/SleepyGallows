import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import {SGFooter} from '../components/footer'
import Layout from "../components/layout"
import '../styles/global.css'

const StyledDiv = styled.div`
  img{
   justify:center;
  }
  p{
    text-indent: 2rem;
  }
  a{
    color: var(--brand-color);
    font-family: var(--linkFont);
    font-weight: bold;
    text-decoration: none;
    &:hover{
      color: var(--pink-highlight);
      text-decoration: underline;
    }
  }
  h1, h2{
    font-family: var(--brandFont);
    font-size: 2rem;
    text-align: center;
  }
  .center{
    text-align: center;
  }
  .narrow{
    width:50%;
    margin:0 auto;
    display:flex;
    flex-direction: column;
  }
`

const AboutPage = () => {
    return (
      <StyledDiv>
          <Layout />
          <main>
            <article>
              <h1>About the Sleepy Gallows</h1>
              <h3>Hello Dreamers!</h3>
              <p>
              We are spreading the beauty of human nature through whimsical, charming art inspired by cultures from around the world. We want you to see the magic of many cultures in the way only animation can. The Sleepy Gallows Studio makes shows and shorts to give children of color heroes that look like them. Heroes their people have had all along. And to do so in such a way that even adults will be captivated by how much magic is still on earth. We want to broaden what your idea of a fairytale can be.
              </p>
              <p>
              We live in realm of whimsy to bring Native American, African, African American, and Indian mythology, legends; and triumphs to western film and animation in ways we haven’t seen before. We love fairytales/mythology and legends that blur truth and fiction. To tell the untold stories of under represented people. To tell the stories of their gods and legends and victories. That is what the Sleepy Gallows will be known for.
              </p>
              <p>
              Join us in our first dream, <Link to='/plh'>For Peace, Love, and Harmony (PLH)</Link>, a 7 piece drama in the Magnolia Fairy Ring. Follow the lives of 3 poor fay-folk, Harmony; Love; and Tranquility, tangled in the chaos of the royal family.
              </p>
            </article>
            <article className="narrow">
              <h2>About the Creators</h2>
              <h3 className="center">We are Sisters by blood in sister fields: Animation and Illustration!​​​​​​​</h3>
              <StaticImage maxWidth={530} src='https://www.datocms-assets.com/53347/1628171501-brit-mio.png' alt='The Galloway Sisters: Crystal (left) and Brittney (right) as drawn in the "For Peace, Love, and Harmony" style. Art by Crystal'/>
              <p>
              We were born and raised in the Chicagoland area and went to California College of the Arts (CCA) in the Bay Area. Brittney (right) got her BFA in Animation (2014) while Crystal (left) got her BFA in Illustration(2015). Now both sisters are back in Chicago making art.
              </p>
            </article>
          </main>
          <SGFooter/>
        </StyledDiv>
    
    )
  }
  
  export default AboutPage