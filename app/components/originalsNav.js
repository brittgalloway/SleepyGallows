import Link from 'next/link'

export default function OriginalsNav({navLabel}) {
    const links = [['', 'watch'], ['/about', 'about'], ['/art', 'art']];
  return(
    <nav aria-label={`Minor Page Navigation`}>
        <ul>
            {links.map((link, index)=> (
                <li key={index}>
                    <Link href={`/animation/originals/${navLabel}${link[0]}`}>{link[1]}</Link>
                </li>
            ))}
        </ul>
    </nav>
  )
} 