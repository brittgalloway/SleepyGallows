import { cinzel_decorative } from '@/app/fonts'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | About',
  description: "About the Sleepy Gallows.",
  keywords: "animation, sleepy gallows, brittney, crystal, galloway, art, for peace love harmony",
}

export default function About() {
  return (
    <main className={styles.main}>
      <article>
        <h1 className={`${cinzel_decorative.className}`}>About the Sleepy Gallows</h1>
        <h3>Hello Dreamers!</h3>
        <p>
          We are spreading the beauty of human nature through whimsical, charming art inspired by cultures from around the world. We want you to see the magic of many cultures in the way only animation can. The Sleepy Gallows Studio makes shows and shorts to give children of color heroes that look like them. Heroes their people have had all along. And to do so in such a way that even adults will be captivated by how much magic is still on earth. We want to broaden what your idea of a fairytale can be.
        </p>
        <p>
          We live in realm of whimsy to bring Native American, African, African American, and Indian mythology, legends; and triumphs to western film and animation in ways we haven’t seen before. We love fairytales/mythology and legends that blur truth and fiction. To tell the untold stories of under represented people. To tell the stories of their gods and legends and victories. That is what the Sleepy Gallows will be known for.
        </p>
        <p>
          Join us in our first dream, <Link href='/animation/originals/plh'>For Peace, Love, and Harmony (PLH)</Link>, a 7 piece drama in the Magnolia Fairy Ring. Follow the lives of 3 poor fay-folk, Harmony; Love; and Tranquility, tangled in the chaos of the royal family.
        </p>
      </article>
      <article className={styles.creators}>
        <h2 className={`${cinzel_decorative.className}`}>About the Creators</h2>
        <h3>
          We are Sisters by blood in sister fields: Animation and Illustration!
        ​​​​​​​</h3>
        <Image 
        src='https://www.datocms-assets.com/53347/1628171501-brit-mio.png' 
        alt='The Galloway Sisters: Crystal (left) and Brittney (right) as drawn in the "For Peace, Love, and Harmony" style. Art by Crystal'
        width={530} 
        height={600}
        />
        <p>
          We were born and raised in the Chicagoland area and went to California College of the Arts (CCA) in the Bay Area. Brittney (right) got her BFA in Animation (2014) while Crystal (left) got her BFA in Illustration(2015). Now both sisters are back in Chicago making art.
        </p>
      </article>
    </main>
  )
}