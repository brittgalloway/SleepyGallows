import { client } from 'b/sanityLib/client'
import Animation from '@/components/rive'

type RiveAsset = {
  rive: string
}

const POSTS_QUERY = `*[
  Header == "FE Header"
  ]{
    "rive": rive.asset->url
}`;
export default async function BrittneyAvitar() {
  const rive = await client.fetch<RiveAsset[]>(POSTS_QUERY, {});
  return (
    <div style={{'height': '400px', 'mixBlendMode':'multiply'}}>
      <Animation
        src={rive[0].rive}
        />
    </div>
  )
}