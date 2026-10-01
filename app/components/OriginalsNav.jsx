import Link from 'next/link'

export default function OriginalsNav({navLabel}) {

  return(
    <nav aria-label={`Minor Page Navigation`}>
        <ul>
            <li>
                <Link href={`/animation/originals/${navLabel}`}>watch</Link>
            </li>
            <li>
                <Link href={`/animation/originals/${navLabel}/about`}>about</Link>
            </li>
            <li>
                <Link href={`/animation/originals/${navLabel}/art`}>art</Link>
            </li>
        </ul>
    </nav>
  )
} 
