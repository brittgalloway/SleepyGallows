

export default function Iframe({title, link}) {
  return (
    <iframe 
        maxwidth={376} 
        maxheight={212}
        src={link} 
        title={`Watch ${title}`} 
        loading="lazy" 
        frameBorder="0" 
        allowFullScreen
        style={{background:'#ccc', borderRadius: '4px'}}
        >
    </iframe>
  )
}

