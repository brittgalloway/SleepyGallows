require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    flags: {
      DEV_SSR: true
    },
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Sleepy Gallows Studio",
    description: `Blazing fast modern site generator for React`,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-json",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/", 
      },
      __key: "images",
    },
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.API_TOKEN,
  
        environment: `main`,
  
           previewMode: false,
  
        disableLiveReload: false,
  
      },
    },
   
  ],
};
