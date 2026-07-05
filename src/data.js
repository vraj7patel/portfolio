// import heroVisual from './assets/Gemini_Generated_Image_ma7ct3ma7ct3ma7c (1).png';
import heroVisual from './assets/vraj.png';

import projectLiya from './assets/project_liya.png';
import projectVyaparii from './assets/project_vyaparii.png';

export const portfolioData = {
  personal: {
    name: "Vraj Rabadiya",
    title: "Frontend Developer",
    tagline: "Building responsive, user-friendly, and high-performance web interfaces.",
    heroVisual: heroVisual,
    cvUrl: "/vraj_rabadiya_resume.pdf", // Resume PDF served from public/
    bio: [
      "I am a Frontend Developer with hands-on experience in building responsive web applications using HTML, CSS, and JavaScript.",
      "I am currently learning the MERN/MEAN stack to develop scalable full-stack applications and integrate modern AI-powered APIs.",
      "I am passionate about creating user-friendly, high-performance interfaces that solve real-world business challenges."
    ]
  },
  education: [
    {
      degree: "Bachelor of Computer Application (BCA)",
      institution: "Sutex Bank College, Surat",
      period: "Jan 2023 - Apr 2026",
      details: "Major in programming. Focused on software development, logic building, and database management. Graduated with a final CGPA of 7.30."
    },
    {
      degree: "12th Science (PCB)",
      institution: "Gurukul Vidhyalaya",
      period: "Jan 2021 - Dec 2023",
      details: "Completed higher secondary education in science stream with a final CGPA of 5.4."
    }
  ],
  experience: [
    {
      role: "Frontend Developer Intern",
      company: "Liya Creation",
      period: "Dec 2025 - Jan 2026",
      points: [
        "Developed and customized responsive e-commerce websites using HTML, CSS, JavaScript, and Shopify Liquid, managing products and improving UI.",
        "Created and edited engaging video content with effects and motion graphics to enhance brand presence and user engagement."
      ]
    }
  ],
  projects: [
    {
      title: "Liya Creation Store",
      category: "E-Commerce Store",
      description: "Developed e-commerce storefront projects with modern tools and APIs (Amazon Q, Blackbox, ChatGPT). Built custom login/signup workflows using Google Cloud Console, integrated Stripe payment gateway, and handled store inventory operations.",
      image: projectLiya,
      techStack: ["HTML5", "CSS3", "JavaScript", "Shopify Liquid", "Stripe API"],
      liveLink: "#",
      codeLink: "#"
    },
    {
      title: "vyaparii Inventory",
      category: "Inventory Management System",
      description: "Created a full-featured inventory management tool including customer, supplier, invoice, and staff CRUD operations. Integrated modern APIs (Amazon Q, Blackbox, Kiro, Antigravity, Perplexity) and designed an analysis page to track business growth.",
      image: projectVyaparii,
      techStack: ["JavaScript", "MongoDB", "Node.js", "Express.js", "AI APIs"],
      liveLink: "https://vyapari-omega.vercel.app/",
      codeLink: "https://github.com/vnsinfo-tech/vyapari.git"
    }
  ],
  skills: [
    { name: "React.js", icon: "react" },
    { name: "Next.js", icon: "nextjs" },
    { name: "Node.js", icon: "nodejs" },
    { name: "MongoDB", icon: "mongodb" },
    { name: "Express.js", icon: "express" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "Socket.io", icon: "socketio" },
    { name: "WordPress", icon: "wordpress" },
    { name: "GitHub", icon: "github" },
    { name: "Vercel", icon: "vercel" },
    { name: "Firebase", icon: "firebase" },
    { name: "SEO", icon: "seo" }
  ],
  contact: {
    email: "rabadiyavraj0@gmail.com",
    phone: "+91 9512798680",
    location: "Surat, Gujarat, India",
    address: "B-1104, brahmand residency, katargam, surat",
    github: "https://github.com/vrajrabadiya",
    linkedin: "https://linkedin.com/in/vrajrabadiya"
  }
};
