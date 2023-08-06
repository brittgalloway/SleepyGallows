import * as React from "react";
import {Footer} from "../components/footer";
import styled from "styled-components";
import Layout from "../components/layout";
import "../styles/global.css";

const StyledDiv = styled("div")`
text-align: center;
h1{
  font-family: var(--brandFont);
  font-size: 2rem;
}

.links, .image{
  border: solid 2px var(--seagreen-highlight);
  margin: 1rem;
}
p{
  @media (max-width: 830px){
    text-align: justify;
  }
}
section{
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (max-width: 830px){
    flex-direction: column-reverse;
  }
  h2{
    text-decoration: solid underline var(--seagreen-highlight);
    text-underline-offset: 1.5em;
  }
  .image{
    max-width: 550px;
    img {
      max-width: 545px;
      padding: 5px;
    }
  }
  .links{
    align-self: center;
    width:20rem;
    height: fit-content;
    ul{
      padding:3em;
      font-size: 1.5rem;
    }
  }
}
.products{
  margin: 2rem;
  width: 100%;
  img{
    margin:1rem 3rem;
  }
  @media (max-width: 1300px){
    margin: 1rem;
    img{
      margin:1rem 1rem;
    }
  @media (max-width: 830px){
    margin: 0;
    padding:0;
    
  }
}
`

const ComicsPage = () => {
    return (
      <StyledDiv>
          <Layout title={"2Heros"} />
          <main>
              <article>
                <h1>2Heroes</h1>
                <p>
                  Come join us on our first journey with Necahual, Quetzalli, and Anacoana as they discover their destiny and help save their people. <a href="https://www.webtoons.com/en/challenge/necahual/a-peaceful-day/viewer?title_no=216820&episode_no=1">NECAHUAL</a> is a new and refreshing take on the magical trope that also honors Meso-American cultures. Subscribe to the <a href="https://www.webtoons.com/en/challenge/necahual/a-peaceful-day/viewer?title_no=216820&episode_no=1">WEBTOON</a> and never miss an update!
                </p>
                <section>
                  <div className="links">
                    <h2>Find Us On</h2>
                    <ul>
                      <li>
                        <a href="https://www.instagram.com/2.heroes/">Instagram</a>
                      </li>
                      <li>
                        <a href="https://twitter.com/2Heroes1">Twitter</a>
                      </li>
                      <li>
                        <a href="https://www.patreon.com/2heroes">Patreon</a>
                      </li>
                    </ul>
                  </div>
                  <div className="image">
                    <img src='https://www.datocms-assets.com/53347/1628172359-necahualimg.webp' alt='Necahual, Quetzalli, and Anacaona become warriors for the 1st time'/>
                  </div>
                </section>
              </article>
              <article>
                <h3>Already a Fan?</h3>
                <p>
                  Find Stickers, Buttons, Charms, and Prints at <a href="https://candyfluffs.com/2heroes">CandyFluffs.com</a>
                </p>
                <small>
                  Patreon supporters get 15% off everything in the store
                </small>
                <div className="products">
                <img src='https://www.datocms-assets.com/53347/1628171910-necacharms.jpg' alt='Small product photo of Necahual  Charms found at candyfluffs.com/2heroes'/>
                <img src='https://www.datocms-assets.com/53347/1628171809-necaminicomics.jpg' alt='Small product photo of the handmade Necahual  Art book  found at candyfluffs.com/2heroes'/>
                <img src='https://www.datocms-assets.com/53347/1628171977-necastickers.jpg' alt='Small product photo of the handmade Necahual  Stickers found at candyfluffs.com/2heroes'/>
                </div>
              </article>
              <article>
                <h2>The Creators</h2>
                <p>
                  Serigio (the writer) and Crystal (the artist) met at a networking session at C2E2 in Chicago 2017. They became fast friends and have been working together ever since.
                </p>
              </article>
          </main>
          <Footer footer={"2Heroes"}/>
      </StyledDiv>
    )
  }
  
  export default ComicsPage;