import { Link } from "gatsby"
import React from "react"

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