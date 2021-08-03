import * as React from "react"
import { Link } from "gatsby"

const AnimationPage = () => {
    return (
      <div className="container">
          <h1>Animation</h1>
          <Link to="/originals">
            Originals
          </Link>
          <Link to="/client">
            Client Work
          </Link>
          <Link to="/fun">
            For Fun
          </Link>
      </div>
    )
  }
  
  export default AnimationPage