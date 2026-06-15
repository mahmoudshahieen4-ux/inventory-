import ecommerceImage from "../assets/ecommerce.png";
import steamGamesImage from "../assets/steamgames.png";
import satrEduImage from "../assets/satrEdu.png";

const projectsData = [
  {
    id: 1,
    title: "Ecommerce Store",
    description:
      "A minimal ecommerce storefront built with React, Tailwind CSS and modern UI interactions.",
    image: ecommerceImage,
    tags: ["React", "Tailwind", "Vite"],
    demoLink: "https://ecommerce-store-eight-teal.vercel.app/",
    githubLink: "https://github.com/username/ecommerce-store",
  },
  {
    id: 2,
    title: "Steam Games UI",
    description:
      "A playful game discovery UI inspired by Steam, built with responsive layout and clean branding.",
    image: steamGamesImage,
    tags: ["React", "Tailwind", "Responsive"],
    demoLink: "https://steam-games-psi.vercel.app/",
    githubLink: "https://github.com/username/steam-games-ui",
  },
  {
    id: 3,
    title: "Satr Edu",
    description:
      "An education platform landing page with polished visuals and modern content sections.",
    image: satrEduImage,
    tags: ["React", "Tailwind", "UX Design"],
    demoLink: "https://udemy-1fcmyf0ja-mahmoud-shahieens-projects.vercel.app/",
    githubLink: "https://github.com/username/satr-edu",
  },
];

export default projectsData;
