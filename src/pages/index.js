import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}


// markup
const IndexPage = () => {
  return (
  <div className="container">
      <Link to="/animation" id="animation">
        <p>Animation</p>
        <StaticImage src="../images/HomePage/Rectangle_1animation.png" alt="animation"/>
      </Link>
      
      <Link to="/comics" id="comics">
        <p>comics</p>
        <StaticImage src="../images/HomePage/Rectangle_3Comics.png" alt="animation"/>
      </Link>
      <Link to="/art" id="art">
        <p>art</p>
        <StaticImage src="../images/HomePage/Rectangle_2art.png" alt="animation"/>
      </Link>
      <Link to="/design" id="design">
        <p>design</p>
        <StaticImage src="../images/HomePage/Rectangle_4web.png" alt="animation"/>
      </Link>
  </div>
  )
}

export default IndexPage
