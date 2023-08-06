require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    flags: {
      DEV_SSR: true
    },
  siteMetadata: {
    siteUrl: "https://github.com/brittgalloway/SleepyGallows",
    title: "Sleepy Gallows Studio",
    description: "Showcase of Animation and Web development by Brittney Galloway and Illustration and Comics by Crystal Galloway.",
    keywords: "animation, sleepy gallows, brittney, crystal, galloway, art, necahual",
    author:"Brittney Galloway",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sass",
    "gatsby-plugin-styled-components",
    "gatsby-transformer-json",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/sgFav.svg",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/", 
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-datocms",
      options: {
        apiToken: process.env.API_TOKEN,
  
        environment: "main",
  
        previewMode: false,
  
        disableLiveReload: false,
  
      },
    },
   
  ],
};
