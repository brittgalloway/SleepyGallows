import React from "react"
import { Link } from "gatsby"

export default function MainNavigation() {
  return (
   <nav aria-label="Site Menu">
       <ul>
           <li>
               <Link to="/Animation">Animation</Link>
           </li>
       </ul>
       <ul>
           <li>
               <Link to="/Comics">Comics</Link>
           </li>
       </ul>
       <ul>
           <li>
               <Link to="/Art">Art</Link>
           </li>
       </ul>
       <ul>
           <li>
               <Link to="/Design">Graphic Design</Link>
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
       </ul>
       <ul>
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
       </ul>
       <ul>
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
       </ul>
       <ul>
           <li>
               <Link to="/client">Client Work</Link>
           </li>
       </ul>
       <ul>
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
       </ul>
       <ul>
           <li>
               <Link to="/aboutplh">About</Link>
           </li>
       </ul>
       <ul>
           <li>
               <Link to="/plhart">Art</Link>
           </li>
       </ul>
   
   </nav>
  );
}
