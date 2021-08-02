import React from "react"
import { Link } from "gatsby"

export default function MainNavigation() {
  return (
   <nav>
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
  )
}