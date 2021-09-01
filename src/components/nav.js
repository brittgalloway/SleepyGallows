import React, {useState, useEffect} from 'react';
import {useMediaQuery} from 'react-responsive';
import { Link } from 'gatsby';
import styled from 'styled-components';
// import { StaticImage } from "gatsby-plugin-image"
// import hamburgerIcon from './hamburger.svg';

const Nav = styled("nav")`
position: fixed;
height: 100vh;
width: 20rem;
text-align: justify;
background: linear-gradient(
  180deg,
  var(--blue-highlight),
  hsla(0, 0%, 76.9%, 0)
);
li {
  padding: 1.25rem;
  &:hover {
    background-color: var(--purple-highlight);
    a {
      text-decoration: none;
      color: white;
      padding: 0.6em 10em 0.6em 0;
    }
  }
  a {
    color: var(--brand-color);
    font-family: var(--brandFont);
    text-decoration: none;
    font-size: 1.75rem;
    font-weight: normal;
  }
}

  @media(max-width: 830px) {
    width: 100%;
    top: 0; 
    position: fixed;
    background: white;
    z-index: 1; 
  }
`;

const Hamburger = styled("button")`
  z-index: 2; 
  display: none;
  cursor: pointer;
  top: 1rem; 
  right: 1rem;
  position: fixed;
  @media(max-width: 830px) {
    display: inline;
    border: none;
    padding: 16px;
    background: none;
    text-align: center; 
  }
`;

export default function MainNavigation() {

  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMediaQuery({query: `(max-width: 830px)`});

  const toggling = () => setIsOpen(!isOpen);

  
  return(
    <Nav aria-label='Main'>
      <div className="mobile-menu">
        <Hamburger onClick={toggling}>
          SG
          {/* <img src={hamburgerIcon} alt="hamburger menu"/> */}
        </Hamburger>
      </div>
      {(isOpen || !isMobile) && (
        <nav aria-label="Site Menu" className={isMobile && 'mobile siteMenu'}>
          <li>
            <Link to="/about">
                SG
                {/* <StaticImage src="" alt="logo, click here to learn about the Sleepy Gallows."/> */}
            </Link>
          </li>
          <li>
            <Link to="/animation">Animation</Link>
          </li>
          <li>
          <Link to="/comics">Comics</Link>
          </li>
          <li>
          <Link to="/art">Art</Link>
          </li>
          <li>
          <Link to="/webdev">Websites</Link>
          </li>
        </nav>
      )}
      
    </Nav>
  )
}

export function BrittneyNav() {
    return (
     <nav aria-label="Brittney's Art Page Navigation">
         <ul>
             <li>
                 <Link to="/brittneysart">Drawings</Link>
             </li>
      
             <li>
                 <Link to="/papercut">Paper Cutouts</Link>
             </li>
         </ul>
     
     </nav>
    );
  }
  export function AnimationNav() {
    return (
     <nav aria-label="Animation page Navigation">
         <ul>
             <li>
                 <Link to="/originals">Originals</Link>
             </li>
       
             <li>
                 <Link to="/client">Client Work</Link>
             </li>
        
             <li>
                 <Link to="/fun">For Fun</Link>
             </li>
         </ul>
     
     </nav>
    );
  }
  export function OriginalsNav() {
    return (
     <nav aria-label="For Peace, Love, and Harmony page Navigation">
         <ul>
             <li>
                 <Link to="/plh">Watch</Link>
             </li>
         
             <li>
                 <Link to="/plh/about">About</Link>
             </li>
        
             <li>
                 <Link to="/plh/art">Art</Link>
             </li>
         </ul>
     
     </nav>
    );
  }
  