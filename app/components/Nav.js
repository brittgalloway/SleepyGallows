import Link from 'next/link'

export default function AnimationNav() {
    const links = [['originals', 'originials'], ['client', 'client work'], ['fun', 'for fun']];
    return (
     <nav aria-label="Animation page Navigation">
         <ul className='animation'>
            {links.map((link, index)=> (
             <li key={index}>
                 <Link href={`/animation/${link[0]}`}>{link[1]}</Link>
             </li>
            ))}
         </ul>
     
     </nav>
    ); 
  }
