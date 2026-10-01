import { cinzel_decorative } from '@/fonts'
import Link from 'next/link'

export default function Support() {
  return (
    <div>
      <h1 className={`${cinzel_decorative.className}`}>Ways to support us!</h1>
      <p><Link href='https://sleepygallows.beehiiv.com/' rel="noopener noreferrer">Join Our Newsletter</Link></p>
      <p>Consider becoming a <Link href='/shop/patron'>Patron</Link> (not a Patreon) or buying a Ko-fi!</p>
      <iframe id='kofiframe' 
        src='https://ko-fi.com/sleepygallows/?hidefeed=true&widget=true&embed=true&preview=true' 
        style={{border:'none', width:'60%', minWidth:'300px', maxWidth:'540px', padding:'4px', background:'#fff'}}
        height='712' title='sleepygallows'>
      </iframe>
    </div>
  )
}