import React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"

export const Seo = ({ title, children }) => {
  const { title: defaultTitle, description, siteUrl, keywords, author, viewport} = useSiteMetadata()

  const seo = {
    title: `${defaultTitle} | ${title}` || defaultTitle,
    description: description,
    siteUrl: siteUrl,
    keywords: keywords,
    author: author,
    viewport: viewport
  }

  return (
    <>
      <title>{seo.title}</title>
      <link rel="canonical" href={seo.siteUrl} />
      <meta charSet="utf-8" />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content={seo.author} />
      {children}
    </>
  )
}