# Sleepy Gallows Portfolio

Sleepy Gallows is a portfolio website showcasing the creative work of Brittney and Crystal Galloway. It was built using Next.js, managed with DatoCMS, and designed in Figma. The project is deployed with Vercel for a smooth and responsive online presence.

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
- [How to contribute](#how-to-contribute)
- [Development](#development)
- [Deploy on Vercel](#deploy-on-vercel)

---

## Meet the Artists

- **Brittney Galloway**: Animator and Web Developer
  - Creates shorts, music videos, and web series
- **Crystal Galloway**: Illustrator and Comic Creator
  - Creates illustrations, character development, and comics

## Usage and Features

Sleepy Gallows provides an engaging platform to explore Brittney and Crystal's artistic work. Visitors can navigate through animations, illustrations, and comics, and a shop will soon be open.

### Animations

This section has three parts.

1. Originals
   - These are original shorts and web series by us. You can watch the content, learn a bit about the project, and see art from the project.
   - The short film *The Elusive Green Elephant* and the web series *For Peace, Love, and Harmony* are in progress.
2. Client Work
   - These are paid, commissioned works.
3. For Fun
   - This section is similar to "Originals," but shorter clips unrelated to more extensive projects are generally showcased here. A few are music videos made for fun of our favorite songs.

### Comics

This section focuses on comics by 2Heroes, which Crystal and Sergio Silva created.

Currently, the only content is for Necahual, their ongoing webcomic.

### Art

This section has two main parts.

1. Crystal's Art

   - A gallery of illustrations created by Crystal.
   - A gallery of visual development by Crystal.

1. Brittney's Art
   - A gallery of sketches and drawings by Brittney.
   - A gallery of collage art by Brittney.

### Shop

This page is just a signup page for joining the Sleepy Gallows newsletter.
In the future, this will allow users to buy art related to the Sleepy Gallows originals. There will be high-end collage art, prints, stickers, and books.
You can now check out the open issues to view the progress in this section.

## Technologies Used

Sleepy Gallows is built using the following technologies and services:

- [Next.js](https://nextjs.org/) (recently migrated from Gatsby)
- [npm](https://www.npmjs.com/)
- TypeScript ( a current issue on the project board )
- [Lottie Files](https://lottiefiles.com/)
- [DatoCMS](https://www.datocms.com/)
- GraphQL
- [Jest](https://jestjs.io/) ( a current issue on the project board )
- [Figma](https://www.figma.com/) (for design)
- [Vercel](https://vercel.com/) (for deployment)

---

## Development
This project was migrated from Gatsby to Next. The primary reason is the increasing number of legacy and depreciated packages. Code maintenance was becoming a hassle. I plan to add unit testing via [Jest](https://nextjs.org/docs/pages/building-your-application/optimizing/testing#jest-and-react-testing-library), Puppeteer, and potentially e2e testing via Cypress. Gatsby is too far behind the current versions of both Jest and Cypress.
Another reason is the routing and layouts. This website has many pages for many different types of art. Between animation and the future shop, I needed to learn how to organize it best, and Next.js provides some benefits in this aspect.

Another reason is the routing and layouts. This website has a lot of pages for a lot of different types of art. Between animation and the future shop, I wasn't sure the best way to organize it.

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

Styles are primarily done with [css modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules) utilizing sass, so I was able to remove styled-components.

## How to contribute

We welcome contributions to the Sleepy Gallows website! Here's how you can get started:
1. Fork the Repository - Fork the repository to your GitHub account by clicking the "Fork" button on the repository page.
2. Clone the Repository - I recommend that you use the Codespace to avoid issues with environment variables. If you do use Codespaces, skip to step 7.
   Alternatively, clone the forked repository to your local machine. Copy the code git clone and 
  ```bash
git clone https://github.com/your-username/SleepyGallows.git
```
3. Create a new branch for your feature or bug fix:
```bash
git checkout -b feature/your-feature-name
```
4. Navigate to the project directory and install the necessary dependencies:
``` bash
cd SleepyGallows
npm install
```
6. Create a .env with these variables:
  - NEXT_DATOCMS_API_TOKEN
  - STRIPE_SECRET_KEY_TEST
  - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST
> You will also need DatoCMS and stripe API keys. For DatoCMS, I can add you as a collaborator ( I only have one open spot, however). Collaborators will sign in here at sleepy-gallows.admin.datocms.com when set up. Alternatively, I can duplicate the DatoCMS project and transfer it to you. You will not have write access if I add you as a collaborator. You can create your own account for Stripe if you do not have one. There will be webhooks and API calls to create Stripe products based on the DatoCMS data, so you won't have to replicate mine directly.
7. Make Your Changes - Make your changes to the codebase. Ensure that your changes are well-documented and follow the project's coding standards.
8. Run Tests - Run the existing tests and add new ones to verify your changes:
``` bash
npm test
```
> Note: Depending on how early you are on this project, there may not be any tests yet. Feel free to add Jest tests for your code.
9. Commit and Push - Commit your changes and push the branch to your forked repository:
 ``` bash
git add .
git commit -m "Description of your changes"
git push origin feature/your-feature-name
```
10. Create a Pull Request - Open a pull request to the main repository. Provide a clear description of your changes and any additional context or information that reviewers should know
    
## Deploy on Vercel

This project is deployed with [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
