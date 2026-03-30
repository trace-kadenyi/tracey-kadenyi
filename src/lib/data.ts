// ─── PROJECTS ──────────────────────────────────────────────────────────────

export const projects = [
  {
    id: 1,
    title: "MetriQ",
    description:
      "An interactive web performance analysis platform for visualizing PageSpeed results, comparing competitors, and generating AI-powered insights.",
    tags: ["MERN", "Tailwind", "AI", "Recharts"],
    liveUrl: "https://metri-q.vercel.app/",
    sourceUrl: "https://github.com/trace-kadenyi/MetriQ.git",
    // Replace with your actual screenshot path in /public/images/
    image: "/images/metriq.png",
    featured: true,
  },
  {
    id: 2,
    title: "Imagine",
    description:
      "An interactive application for creatives — readers and writers. Users publish original stories and read stories by others.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    liveUrl: "https://imagine-tellmeastory.vercel.app/",
    sourceUrl: "https://github.com/trace-kadenyi/storybrooke-frontend",
    image: "/images/imagine.png",
    featured: true,
  },
];

// ─── SKILLS ────────────────────────────────────────────────────────────────

export const skillGroups = [
  {
    label: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "Ruby", "HTML", "CSS"],
  },
  {
    label: "Frontend",
    skills: [
      "React",
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
    ],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express", "Ruby on Rails", "REST APIs"],
  },
  {
    label: "Databases",
    skills: ["MongoDB", "PostgreSQL", "Firebase"],
  },
  {
    label: "Tools",
    skills: ["Git", "GitHub", "Vercel", "Netlify", "Postman", "VS Code"],
  },
];

export const featuredSkills = [
  { name: "React / Next.js", level: 92 },
  { name: "Node.js / Express", level: 85 },
  { name: "MongoDB", level: 80 },
  { name: "TypeScript", level: 74 },
  { name: "Python", level: 65 },
  { name: "Ruby on Rails", level: 68 },
];

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────

export const testimonials = [
  {
    id: 1,
    name: "Charles Okoye",
    origin: "Abuja, Nigeria",
    image: "/images/testimonials/charles.png",
    text: "Tracey and I worked together on several projects, and I was lucky to call her my team member. She consistently gave 100 percent effort to the team and played a significant role in ensuring that we completed assignments on time. She has excellent time management skills and a knack for keeping everyone calm and productive during intense crunch periods.",
  },
  {
    id: 2,
    name: "Mohamed Aachour",
    origin: "Kenitra, Morocco",
    image: "/images/testimonials/aachour.png",
    text: "Tracey Kadenyi is a kind and hard-working developer. Her ability to quickly analyze and solve data structures and algorithms is amazing. She has good knowledge of HTML, JavaScript, React, and Redux and she's a good communicator. I totally recommend her.",
  },
  {
    id: 3,
    name: "Sire Clifford",
    origin: "Accra, Ghana",
    image: "/images/testimonials/clifford.png",
    text: "Tracey is an amazing person. She is a great communicator and a very hard worker. I have always appreciated the thoughtfulness she brings to her tasks and the level of experience she is willing to share with the team. She is definitely the asset your company and team have been hunting for.",
  },
  {
    id: 4,
    name: "Eyasu Teshome",
    origin: "Jiangsu, China",
    image: "/images/testimonials/eyasu.png",
    text: "We've joined our hands on several projects and Tracey is one of the best people I had as a partner. Her ability to tackle any problem with a warm smile is remarkable. Tracey would be an appreciated member of any team.",
  },
  {
    id: 5,
    name: "Tarek Yosry",
    origin: "Cairo, Egypt",
    image: "/images/testimonials/tarek.png",
    text: "Tracey is a great developer. Apart from being on time, she always thinks out of the box and provides creative solutions. We worked together on one project, but I hope we will have the chance to work together again.",
  },
];

// ─── SOCIAL LINKS ──────────────────────────────────────────────────────────

export const socials = [
  {
    label: "GitHub",
    url: "https://github.com/trace-kadenyi",
    handle: "@trace-kadenyi",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/tracey-kadenyi/",
    handle: "Tracey Kadenyi",
  },
  {
    label: "Medium",
    url: "https://medium.com/@tracekadenyi",
    handle: "@tracekadenyi",
  },
  {
    label: "Email",
    url: "mailto:treykadenyi@gmail.com",
    handle: "treykadenyi@gmail.com",
  },
];

// ─── META ───────────────────────────────────────────────────────────────────

export const meta = {
  name: "Tracey Kadenyi",
  shortName: "TK",
  title: "Software Developer",
  status: "JavaScript/TypeScript",
  email: "treykadenyi@gmail.com",
  resumeUrl:
    "https://docs.google.com/document/d/1bzoeJz-HpSqfjInOUQuz1AT2de0feeBd_JN4oA8CPNM/edit?usp=sharing",
  mediumUrl: "https://medium.com/@tracekadenyi",
  bio: "JavaScript/TypeScript dev with 4+ years building SaaS platforms and scalable web apps. I specialize in the MERN stack with strong expertise in multi-tenant architecture, RBAC, and RESTful API design.",
};
