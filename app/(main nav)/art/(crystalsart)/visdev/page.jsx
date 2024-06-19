import { performRequest } from '@/app/lib/datocms'
import { cinzel_decorative } from '@/app/fonts'
import Grid from '@/app/components/grid'
import ArtNav from '../../nav'
import { Footer } from '@/app/components/footer'
import styles from '../../page.module.scss'

export const metadata = {
  title: 'Sleepy Gallows Studio | Crystal\'s Art',
  description: "Showcase the art of Crystal Galloway.",
  keywords: "crystal galloway, art, necahual, plh, the little mermaid",
}

const PAGE_CONTENT_QUERY = `
query Visdev {
  allVisdevs {
    id
    plhVisdev {
      alt
      height
      title
      url
      width
    }
  }
  allMermaidVisdevs(orderBy: _createdAt_ASC) {
    id
    visArt {
      width
      url
      title
      height
      alt
    }
  }
}
`;
export default async function Visdev() {
  const { data: { allMermaidVisdevs, allVisdevs } } = await performRequest({ query: PAGE_CONTENT_QUERY });
  return (
    <>
      <main className={styles.grid_img}> 
        <ArtNav
        navLabel={'Crystal\'s Art Page Navigation'}
        page1={'illustration'}
        page2={'visdev'}
        />
        <article className={styles.article}>
          <header>
            <h1 className={`${cinzel_decorative.className} ${styles.h1}`}>The Little Mermaid</h1>
            <p>
            I read the Little Mermaid by Hans Cristian Anderson for the first time a couple of years ago and I was very surprised when I read it because in every version of the tale that I saw on film it took place somewhere in Europe, or at least a fantasy place inspired by Europe. However when I read the tale it did not seem like a European setting. It felt eastern. Perhaps it was just the translation from the version that I read, but the fact that they would say palace instead of castle and temple instead of church really had my thinking. I did a lot of research on where it could have taken place and I saw the illustrations that Edmund Dulac did for the tale which have very heavy Eastern influence. I decided that I wanted to redesign the story set in India. It is still a far off idea, but I hope to be able to turn this into a full movie on day.
            </p>
          </header>
          <h2 className={`${cinzel_decorative.className} ${styles.h1}`}>Characters</h2>
          <Grid
          photos={allMermaidVisdevs}
          name={'visArt'}
          />
        </article>
        <article className={styles.article}>
          <h2 className={`${cinzel_decorative.className} ${styles.h1}`}>Visual Development</h2>
          <Grid
          photos={allVisdevs}
          name={'plhVisdev'}
          />
        </article>
      </main>
      <Footer
      name={'Crystal Galloway'}
      />
    </>
  )
}
