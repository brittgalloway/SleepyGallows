import { type SanityDocument } from 'next-sanity'
import { client } from 'b/sanityLib/client'
import Animation from '@/components/rive'

const POSTS_QUERY = `*[
  Header == "FE Header"
  ]{
    "rive": rive.asset->url
}`;
export default async function BrittneyAvitar() {
  const rive = await client.fetch<SanityDocument[]>(POSTS_QUERY, {});
  return (
    <div style={{'height': '400px', 'mixBlendMode':'multiply'}}>
      <Animation
        src={rive[0].rive}
        />
    </div>
  )
}
