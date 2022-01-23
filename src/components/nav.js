import React, {useState} from 'react';
import {useMediaQuery} from 'react-responsive';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { StaticImage } from "gatsby-plugin-image"
import hamburgerIcon from './hamburger.svg';

const Nav = styled("nav")`
 position: fixed;
 height: 100vh;
 width: 20rem;
 text-align: justify;
 z-index: 0;
 background: linear-gradient(
   180deg,
   var(--blue-highlight),
   hsla(0, 0%, 76.9%, 0)
 );
li {
  list-style:none;
  div{
    border:none;
    box-shadow:none;
    padding:0;
    margin:10px;
  }
  &:hover {
    background-color: var(--purple-highlight);
    a {
      text-decoration: none;
      color: white;
    }
  }
  
  a {
    display: block;
    padding: 1.25rem;
    color: var(--brand-color);
    font-family: var(--brandFont);
    text-decoration: none;
    font-size: 1.75rem;
    font-weight: normal;
  }
}
div.mobile-menu{
  border: none;
  box-shadow:none;
  height:0;
  width:0;
  padding:0;
  margin:0;
  z-index:1;
}
@media(max-width: 830px) {
  width: 100%;
  height:fit-content;
  top: 0; 
  position: fixed;
  background: white;
   z-index: 2; //find a way for this to only come after being clicked
 
  }
 
`;

const Hamburger = styled("button")`
  z-index: 3; 
  display: none;
  cursor: pointer;
  top: 1rem; 
  right: 1rem;
  position: fixed;
  width: 80px;
  @media(max-width: 830px) {
    display: inline;
    border: none;
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
          <img src={hamburgerIcon} width={40} alt="hamburger menu"/>
        </Hamburger>
      </div>
      
      {(isOpen || !isMobile) && (
        <nav aria-label="Site Menu" className={isMobile && "mobile" }>
          <ul>
            {isMobile && 
                <li>
                  <Link to="/about">About</Link>
                </li>
            }
            {(!isOpen || !isMobile) &&
            <li>
              <Link to="/about">
                  <StaticImage className="logo" maxWidth={250} src="./sg_logo.svg" alt="logo, click here to learn about the Sleepy Gallows."/>
              </Link>
            </li>
            }
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
          </ul>
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
export function CrystalNav() {
    return (
     <nav aria-label="Crystal's Art Page Navigation">
         <ul>
             <li>
                 <Link to="/crystalsart">Illustration</Link>
             </li>
      
             <li>
                 <Link to="/visdev">Visual Development</Link>
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
  export function OriginalsNav(props) {
    return (
     <nav aria-label="For Peace, Love, and Harmony page Navigation">
         <ul>
             <li>
                <Link to={`../../${props.link}`}>Watch</Link>
             </li>
         
             <li>
                 <Link to={`../../${props.link}/about`}>About</Link>
             </li>
        
             <li>
                 <Link to={`../../${props.link}/art`}>Art</Link>
             </li>
         </ul>
     
     </nav>
    );
  }
  