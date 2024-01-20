# Sleepy Gallows Portfolio

Sleepy Gallows is a portfolio website showcasing the creative work of Brittney and Crystal Galloway. This website is built using Next.js, managed with DatoCMS, and designed in Figma. The project is deployed with Vercel, for a smooth and responsive online presence.

---

## Table of Contents

- [Introduction](#sleepy-gallows-portfolio)
- [Table of Contents](#table-of-contents)
- [Meet the Artists](#meet-the-artists)
- [Usage and Features](#usage-and-features)
  - [Animations](#animations)
  - [Comic](#comics)
  - [Art](#art)
  - [Shop](#shop)
- [Technologies Used](#technologies-used)
- [Development](#development)
- [Deploy on Vercel](#deploy-on-vercel)

---

## Meet the Artists

- **Brittney Galloway**: Animator and Web Developer
  - Creates shorts, music videos, and web series
- **Crystal Galloway**: Illustrator and Comic Creator
  - Creates illustrations, character development, and comics

## Usage and Features

Sleepy Gallows provides an engaging platform to explore the artistic work of Brittney and Crystal. Visitors can navigate through animations, illustrations, comics, and will soon have a shop.

### Animations

This section is broken up into 3 parts.

1. Originals
   - These are original shorts and web series by us. You can watch the content, learn a bit about the project, and see art from the project.
   - Currently the short the _Elusive Green Elephant_ and _For Peace, Love, and Harmony_ is in progress
2. Client Work
   - These are paid commissioned works.
3. For Fun
   - This is similar to "Originals", but generally shorter clips that are unrelated to larger projects are showcased here. A few are music videos made for fun of our favorite songs.

### Comics

This section focuses on comics by 2Heroes, which is created by Crystal and Sergio Silva.

Currently the only content is for Necahual, their ongoing webcomic.

### Art

This section is broken into 2 main parts.

1. Crystal's Art

   - A gallery of illustrations created by Crystal.
   - A gallery of visual development by Crystal.

1. Brittney's Art
   - A gallery of sketches and drawings by Brittney.
   - A gallery of collage art by Brittney.

### Shop

Currently this page is just a sign up page to join a newsletter.

In the future, this will allow users to buy art related the Sleepy Gallows originals. There will be high end collage art, prints, and digital downloads.

More info to come as this section is developed.

## Technologies Used

Sleepy Gallows is built using the following technologies and services:

- [Next.js](https://nextjs.org/) (recently migrated from Gatsby)
- [npm](https://www.npmjs.com/)
- [Lottie Files](https://lottiefiles.com/)
- [DatoCMS](https://www.datocms.com/)
- GraphQL
- [Jest](https://jestjs.io/)
- [Figma](https://www.figma.com/) (for design)
- [Vercel](https://vercel.com/) (for deployment)

---

## Development

This project was migrated from Gatsby to Next. The primary reaseon is the increasing amount of legacy and depreciated packages. Code maintance was becoming a hassle and I plan to add unit testing via [Jest](https://nextjs.org/docs/app/building-your-application/testing/jest) and potentially e2e testing via Cypress. Gatsby is too far behind the current versions of both Jest and Cypress.

Another reason is the routing and layouts. This website has a lot of pages for a lot of different types of art. Between animation and the future shop, I wasn't sure the best way to organize it.

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

Styles are primarily done with [css modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules) utilizing sass, so I was able to remove styled components.

In the next iteration I will add dynamic routes.
https://medium.com/@seun.thedeveloper/the-easiest-way-to-handle-animations-in-react-nextjs-5934a689a010

## Deploy on Vercel

This project is deployed with [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
