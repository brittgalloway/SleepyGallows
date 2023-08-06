import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
            siteUrl
            title
            description
            keywords
            author
        }
      }
    }
  `)

  return data.site.siteMetadata
}