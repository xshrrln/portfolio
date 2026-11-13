
import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Sherralene",
  lastName: "Edusma",
  name: "Sherralene Edusma",
  role: "IT Student • UI/UX Designer • Creative Technologist",
  avatar: "/images/avatar.png",
  email: "sherraleneedusma@gmail.com",
  location: "Asia/Manila",
  languages: ["English", "Filipino"],
  locale: "en",
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Updates about my creative work and projects.</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/xshrrln",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} — Portfolio`,
  description: "Portfolio of Sherralene Edusma — an IT student, UI/UX designer, and creative technologist building thoughtful digital experiences.",
  headline: <>I design ideas into meaningful digital experiences.</>,
  featured: {
    display: false,
    title: null,
    href: "/work",
  },
  subline: (
    <>
      Hi, I’m {person.firstName} — an IT student with a passion for{" "}
      <Text as="span" size="xl" weight="strong">
        design, technology, and creative problem-solving.
      </Text>{" "}
      I love turning ideas into experiences that feel useful, beautiful, and human.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Learn more about ${person.name}, my background, creativity, and the ideas I’m building through design and technology.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "A Little About Me",
    description: (
      <>
        I’m Sherralene, an Information Technology student at Bukidnon State
        University who enjoys blending creativity with technology. I’m drawn to
        design, problem-solving, and building experiences that are visually
        engaging, functional, and thoughtful. Outside of tech, I also find
        inspiration in art, music, and poetry, and I carry that creative lens
        into everything I build.
      </>
    ),
  },
  work: {
    display: false,
    title: "Work Experience",
    experiences: [],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Bukidnon State University",
        description: <>Information Technology student with a focus on creative and digital problem-solving.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Interests & Skills",
    skills: [
      {
        title: "UI/UX Design",
        description: <>I enjoy crafting user-centered interfaces, organizing layouts, and creating experiences that feel intuitive and polished.</>,
        tags: [
          {
            name: "UI Design",
            icon: "figma",
          },
          {
            name: "UX Design",
            icon: "figma",
          },
        ],
        images: [],
      },
      {
        title: "Web Design & Development",
        description: <>I like building clean, responsive websites that balance design, usability, and functionality.</>,
        tags: [
          {
            name: "Web",
            icon: "globe",
          },
          {
            name: "Design",
            icon: "document",
          },
          {
            name: "JavaScript",
            icon: "javascript",
          },
        ],
        images: [],
      },
      {
        title: "Traditional Sketches & Creative Expression",
        description: <>I work through visual storytelling, hand-drawn sketches, and creative exploration as part of how I think and design.</>,
        tags: [
          {
            name: "Sketches",
            icon: "gallery",
          },
          {
            name: "Creative",
            icon: "book",
          },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Notes & Thoughts",
  description: `Creative notes and updates from ${person.name}.`,
};

const work: Work = {
  path: "/work",
  label: "Projects",
  title: `Selected Projects – ${person.name}`,
  description: `A collection of creative and technology projects by ${person.name}.`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Gallery – ${person.name}`,
  description: `A visual collection by ${person.name}.`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };
