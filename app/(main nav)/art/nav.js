'use client'
import Link from 'next/link'

export default function ArtNav({navLabel, page1, page2}) {

  return(
    <nav aria-label={navLabel}>
        <ul>
            <li>
                <Link href={`/art/${page1}`}
                >{page1}</Link>
            </li>
    
            <li>
                <Link href={`/art/${page2}`}
                >{page2}</Link>
            </li>
        </ul>
    </nav>
  )
}