export default function Iframe({title, link}) {
  return (
    <iframe
        src={link}
        title={`Watch ${title}`}
        loading="lazy"
        frameBorder="0"
        allowFullScreen
        style={{
          background: '#ccc',
          borderRadius: '4px',
          maxWidth: '376px',
          maxHeight: '212px',
          width: '100%',
        }}
        >
    </iframe>
  )
}