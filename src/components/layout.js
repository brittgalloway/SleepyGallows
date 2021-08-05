import React from "react";
import { Helmet } from "react-helmet"
import MainNavigation from "./nav"




export default function Layout(props) {
  return(
  <>
      <Helmet htmlAttributes={{lang: 'en',}}>
        <meta charSet="utf-8" />
        <title>Sleepy Gallows Studio</title>
        <meta name="description" content="Sleepy Gallows Art Showcase" />
        <link rel="canonical" href="https://sleepygallows.com" />
      </Helmet>
      <MainNavigation />
</>
  )
}