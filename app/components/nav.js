'use client'
import Link from 'next/link'

export default function AnimationNav() {
    return (
     <nav aria-label="Animation page Navigation">
         <ul>
             <li>
                 <Link href="/animation/originals">originals</Link>
             </li>
       
             <li>
                 <Link href="/animation/client">client Work</Link>
             </li>
        
             <li>
                 <Link href="/animation/fun">for fun</Link>
             </li>
         </ul>
     
     </nav>
    );
  }