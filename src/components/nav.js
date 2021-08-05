import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import '../styles/global.css'


export default function MainNavigation() {
  return (
        <nav className="siteMenu" aria-label="Site Menu">
            <ul>
                <li>
                    <Link to="/about">
                        SG
                        <StaticImage src="" alt="logo, click here to learn about the Sleepy Gallows."/>
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
                    <Link to="/design">Design</Link>
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
               <Link to="/aboutplh">About</Link>
           </li>
      
           <li>
               <Link to="/plhart">Art</Link>
           </li>
       </ul>
   
   </nav>
  );
}
