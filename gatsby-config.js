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
    description: `Showcase of Animation and Web development by Brittney Galloway and Illustration and Comics by Crystal Galloway.`,
    keywords: `animation, sleepy gallows, brittney, crystal, galloway, art, necahual`
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    `gatsby-plugin-styled-components`,
    
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/sgFav.svg",
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
