/* =====================================================================
   PORTFOLIO DATA — the ONLY file you need to edit.
   Every section of the site is rendered from this object.
   - Empty arrays hide their section (e.g. certifications: []).
   - Skill "years" are calculated automatically from the tech stacks
     listed in your experience, so keep those accurate.
   ===================================================================== */
window.PORTFOLIO = {
  /* ---------------- Basic details ---------------- */
  profile: {
    name: "Anil Kumar",
    initials: "AK",
    headline: "Senior Software Engineer (Java)",
    roles: [
      "Senior Software Engineer (Java)",
      "Spring Boot & Microservices",
      "Kafka & Event-Driven Systems",
      "Technical Lead @ RxLogix"
    ],
    tagline: "I build Spring Boot back ends, REST APIs and event-driven microservices — taking products from concept to production with a focus on performance, reliability and code quality.",
    location: "Noida, India",
    relocation: "Open to relocation worldwide",
    email: "anilkaushik1211@gmail.com",
    phone: "+91 82953 65957",            // set "" to hide your phone number
    avatar: "",                          // e.g. "assets/img/profile.jpg" — empty shows initials
    resumeUrl: "assets/Anil_Kumar_Resume.pdf",
    careerStart: "2018-10",              // used to compute total years of experience
    socials: [
      { label: "LinkedIn", icon: "fa-brands fa-linkedin-in", url: "https://www.linkedin.com/in/anilkaushik1211" },
      // { label: "GitHub", icon: "fa-brands fa-github", url: "https://github.com/your-handle" },
      { label: "Email", icon: "fa-solid fa-envelope", url: "mailto:anilkaushik1211@gmail.com" }
    ],
    summary: [
      "Senior Java engineer with 8 years of experience building REST APIs, web services and microservices with Spring Boot and PostgreSQL. I'm now a Technical Lead at RxLogix. Previously, at AllGoVision, I led a team of 5 developers and 2 testers on Analytics Center, a real-time analytics and monitoring platform built on distributed services with Kafka, Docker and AWS.",
      "Product-minded engineer who takes features from concept to delivery, leads technical design discussions, mentors engineers and owns production issues through root-cause analysis — always with scalable, maintainable code and the end user in mind."
    ],
    highlights: [
      "Led a team of 5 developers & 2 testers",
      "Event-driven architecture with Kafka",
      "Real-time alerting over WebSockets",
      "CI/CD with Jenkins, Docker & AWS",
      "Owner of production RCA & troubleshooting",
      "AI-assisted development (Cursor, Copilot)"
    ]
  },

  /* ---------------- Open-to-work banner ---------------- */
  openToWork: {
    enabled: true,
    headline: "Open to global opportunities",
    roles: ["Senior Software Engineer (Java)", "Lead / Senior Backend Engineer", "Senior Full Stack Engineer (Java + Angular)"],
    workModes: ["Relocation", "Remote", "Hybrid", "On-site"],
    regions: ["Worldwide", "Netherlands", "Ireland", "Europe", "UK", "India", "Remote"],
    workAuthorization: "",                  // e.g. "Visa sponsorship required" — empty hides it
    noticePeriod: ""                       // e.g. "60 days" — empty hides it
  },

  /* ---------------- Tech → icon map (devicon or Font Awesome classes) ----------------
     Browse icons: https://devicon.dev · https://fontawesome.com/search?o=r&m=free */
  techIcons: {
    "Java": "devicon-java-plain colored",
    "Spring Boot": "devicon-spring-plain colored",
    "Spring": "devicon-spring-plain colored",
    "Hibernate/JPA": "devicon-hibernate-plain colored",
    "Maven": "devicon-maven-plain colored",
    "NestJS": "devicon-nestjs-plain colored",
    "Node.js": "devicon-nodejs-plain colored",
    "REST APIs": "fa-solid fa-plug",
    "Web Services": "fa-solid fa-globe",
    "WebSockets": "fa-solid fa-tower-broadcast",
    "Microservices": "fa-solid fa-cubes",
    "JWT Auth": "fa-solid fa-key",
    "Kafka": "devicon-apachekafka-original colored",
    "PostgreSQL": "devicon-postgresql-plain colored",
    "MongoDB": "devicon-mongodb-plain colored",
    "MySQL": "devicon-mysql-plain colored",
    "SQL Server": "devicon-microsoftsqlserver-plain colored",
    "SQL": "fa-solid fa-table",
    "Docker": "devicon-docker-plain colored",
    "Jenkins": "devicon-jenkins-line colored",
    "Git": "devicon-git-plain colored",
    "CI/CD": "fa-solid fa-infinity",
    "AWS": "devicon-amazonwebservices-plain-wordmark colored",
    "Nginx": "devicon-nginx-original colored",
    "Linux": "devicon-linux-plain",
    "React": "devicon-react-original colored",
    "React Native": "devicon-react-original colored",
    "TypeScript": "devicon-typescript-plain colored",
    "Angular": "devicon-angularjs-plain colored",
    "JavaScript": "devicon-javascript-plain colored",
    "HTML5": "devicon-html5-plain colored",
    "CSS3": "devicon-css3-plain colored",
    "SCSS": "devicon-sass-original colored",
    "Angular Material": "devicon-angularmaterial-plain colored",
    "Bootstrap": "devicon-bootstrap-plain colored",
    "Distributed Systems": "fa-solid fa-circle-nodes",
    "Event-Driven Architecture": "fa-solid fa-bolt",
    "System Design": "fa-solid fa-diagram-project",
    "Design Patterns": "fa-solid fa-shapes",
    "OOP": "fa-solid fa-object-group",
    "API Integration": "fa-solid fa-link",
    "Performance Optimization": "fa-solid fa-gauge-high",
    "Cursor AI IDE": "fa-solid fa-wand-magic-sparkles",
    "GitHub Copilot": "fa-brands fa-github",
    "Code Reviews": "fa-solid fa-code-pull-request",
    "Unit Testing": "fa-solid fa-vial-circle-check",
    "Agile/Scrum": "fa-solid fa-arrows-rotate",
    "Production Support": "fa-solid fa-life-ring",
    "Root-Cause Analysis": "fa-solid fa-magnifying-glass-chart",
    "Mentoring": "fa-solid fa-people-group"
  },

  /* ---------------- Technical skills ---------------- */
  skills: [
    { category: "Backend", icon: "fa-solid fa-server", items: ["Java", "Spring Boot", "Spring", "Hibernate/JPA", "REST APIs", "Web Services", "WebSockets", "Microservices", "NestJS", "Node.js", "JWT Auth"] },
    { category: "Data & Messaging", icon: "fa-solid fa-database", items: ["Kafka", "PostgreSQL", "MongoDB", "MySQL", "SQL Server", "SQL"] },
    { category: "DevOps & Cloud", icon: "fa-solid fa-cloud", items: ["Docker", "Jenkins", "Maven", "Git", "CI/CD", "AWS", "Nginx", "Linux"] },
    { category: "Frontend", icon: "fa-solid fa-palette", items: ["TypeScript", "Angular", "JavaScript", "HTML5", "CSS3", "SCSS", "Angular Material", "Bootstrap"] },
    { category: "Architecture", icon: "fa-solid fa-sitemap", items: ["Distributed Systems", "Event-Driven Architecture", "System Design", "Design Patterns", "OOP", "API Integration", "Performance Optimization"] },
    { category: "Practices & AI Tools", icon: "fa-solid fa-screwdriver-wrench", items: ["Cursor AI IDE", "GitHub Copilot", "Code Reviews", "Unit Testing", "Agile/Scrum", "Production Support", "Root-Cause Analysis", "Mentoring"] }
  ],

  /* ---------------- Professional experience (newest first) ----------------
     logo: image path/URL. Leave "" to try the company website's icon (domain),
     and if that fails a coloured initials badge is shown. */
  experience: [
    {
      id: "exp-rxlogix",
      company: "RxLogix",
      short: "RxLogix",
      logo: "", domain: "rxlogix.com",
      role: "Technical Lead",
      location: "Noida, India",
      start: "2026-11", end: "Present",
      dates: "16 Nov 2026 – Present",
      summary: "Joined RxLogix as Technical Lead in November 2026.",
      achievements: [],
      tech: [],
      projects: []
    },
    {
      id: "exp-allgovision",
      company: "AllGoVision Technologies Pvt. Ltd.",
      short: "AllGoVision",
      logo: "", domain: "allgovision.com",
      role: "Lead Engineer",
      location: "Bangalore, India",
      start: "2023-08", end: "2026-11",
      dates: "Aug 2023 – 13 Nov 2026",
      summary: "Owned Java Spring Boot and NestJS services for Analytics Center, a real-time analytics and monitoring platform for alarm management and data analysis — and led a team of 5 developers and 2 testers.",
      achievements: [
        "Built and owned Spring Boot and NestJS services and REST APIs for Analytics Center, from requirements through production.",
        "Designed scalable distributed services using Kafka and PostgreSQL, leading technical decisions on architecture and API design.",
        "Delivered interactive dashboards and real-time alerting, pushing new alerts to the UI over WebSockets so operators could act immediately.",
        "Automated builds with Jenkins, containerized services with Docker and deployed on AWS.",
        "Led and mentored 5 developers and 2 testers: code reviews, coaching, and testing & CI/CD practices that kept releases on schedule.",
        "Resolved complex production issues through structured troubleshooting and root-cause analysis.",
        "Used Cursor AI IDE and GitHub Copilot to speed up coding and tests, reviewing every change."
      ],
      tech: ["Java", "Spring Boot", "Hibernate/JPA", "Maven", "NestJS", "PostgreSQL", "Kafka", "WebSockets", "Docker", "Jenkins", "AWS", "Angular"],
      projects: ["proj-analytics"]
    },
    {
      id: "exp-itc",
      company: "ITC Infotech India Pvt. Ltd.",
      short: "ITC Infotech",
      logo: "", domain: "itcinfotech.com",
      role: "Associate IT Consultant",
      location: "Gurugram, India",
      start: "2022-04", end: "2023-07",
      summary: "Designed and built RESTful APIs and reporting features for Insight, a financial analytics platform delivering analyses and performance metrics.",
      achievements: [
        "Designed and developed RESTful APIs with Java Spring Boot and NestJS for the Insight platform.",
        "Built data visualizations and reporting features that supported analyst decision-making.",
        "Improved front-end responsiveness with lazy loading, caching and modular reusable Angular components.",
        "Integrated front-end and back-end layers for reliable data flow and a consistent user experience.",
        "Maintained the web portal, ensuring accuracy and reliability of financial data."
      ],
      tech: ["Java", "Spring Boot", "Hibernate/JPA", "Maven", "NestJS", "SQL Server", "Angular"],
      projects: ["proj-insight"]
    },
    {
      id: "exp-virtusa",
      company: "Virtusa Consulting Services Pvt. Ltd.",
      short: "Virtusa",
      logo: "", domain: "virtusa.com",
      role: "Associate Consultant – Technology",
      location: "Bangalore, India",
      start: "2021-05", end: "2022-04",
      summary: "Developed secure REST APIs and reusable Angular components for EAP, a health-insurance assistance platform.",
      achievements: [
        "Developed RESTful APIs in Java Spring Boot for core CRUD operations and reusable Angular components.",
        "Implemented authentication and authorization to protect user data.",
        "Automated the build process with Jenkins and containerized the application with Docker.",
        "Maintained and refactored existing features and resolved defects, improving code quality and stability."
      ],
      tech: ["Java", "Spring Boot", "Hibernate/JPA", "Maven", "MongoDB", "JWT Auth", "Docker", "Jenkins", "Angular"],
      projects: ["proj-eap", "proj-eab"]
    },
    {
      id: "exp-codeinsight",
      company: "CodeInsight Technologies Pvt. Ltd.",
      short: "CodeInsight",
      logo: "", domain: "",
      role: "Software Engineer",
      location: "Mohali, India",
      start: "2018-10", end: "2021-04",
      summary: "Built RPM, a credit/debit card program-management web application, and supported the company's internal cloud infrastructure.",
      achievements: [
        "Developed RPM using Java, Spring Boot, Angular and MySQL.",
        "Deployed the application for seamless management of distributor information and automated builds with Jenkins.",
        "Optimized existing code paths to improve performance and scalability as user demand grew.",
        "Supported and maintained the company's internal cloud infrastructure."
      ],
      tech: ["Java", "Spring Boot", "Hibernate/JPA", "Maven", "MySQL", "Jenkins", "Angular"],
      projects: ["proj-rpm", "proj-snapcrescent", "proj-alpha", "proj-campaign", "proj-smartparking", "proj-talenthunt"]
    },
    {
      id: "exp-codeinsight-intern",
      company: "CodeInsight Technologies Pvt. Ltd.",
      short: "CodeInsight",
      logo: "", domain: "",
      role: "Software Engineer Intern",
      type: "Internship",
      location: "Mohali, India",
      start: "2018-07", end: "2018-09",
      dates: "2 Jul 2018 – 30 Sep 2018",   // optional exact dates shown instead of month/year
      summary: "Software engineering internship at CodeInsight Technologies before joining full-time as a Software Engineer in October 2018.",
      achievements: [],
      tech: [],
      projects: []
    }
  ],

  /* ---------------- Key projects (newest first) ----------------
     category → category filter chips; tech → tech-stack filter chips.
     start/end use "YYYY-MM" (or "Present"). highlights and links are optional.
     Resume projects (Analytics Center, Insight, EAP, RPM) use resume data; the rest
     come from the earlier portfolio site. */
  projects: [
    {
      id: "proj-analytics", title: "Analytics Center", role: "Lead Engineer", company: "AllGoVision Technologies",
      experienceId: "exp-allgovision", category: "Analytics & Monitoring", icon: "fa-solid fa-chart-line", featured: true,
      start: "2023-08", end: "2026-11",
      description: "Unified web platform for managing alarms and data analytics with modular, customizable features.",
      highlights: [
        "Led development and deployment, ensuring high performance and reliability.",
        "Implemented real-time monitoring and alerting to improve incident response times.",
        "Kafka-based messaging between services; alerts pushed to the UI over WebSockets."
      ],
      tech: ["Java", "Spring Boot", "Hibernate/JPA", "Maven", "NestJS", "PostgreSQL", "Kafka", "WebSockets", "Docker", "Jenkins", "AWS", "Angular"],
      links: { live: "", github: "" }
    },
    {
      id: "proj-insight", title: "Insight", role: "Senior Analyst Programmer", company: "ITC Infotech",
      experienceId: "exp-itc", category: "FinTech", icon: "fa-solid fa-magnifying-glass-dollar", featured: true,
      start: "2022-04", end: "2023-07",
      description: "Web platform delivering detailed financial analyses and performance metrics, built on 20+ microservices.",
      highlights: [
        "Maintained the web portal, ensuring accuracy and reliability of financial data.",
        "Built data visualizations and reporting features for analyst decision-making.",
        "Lazy loading, caching and reusable Angular components for a faster UI."
      ],
      tech: ["Java", "Spring Boot", "Hibernate/JPA", "Maven", "NestJS", "SQL Server", "Angular"],
      links: { live: "", github: "" }
    },
    {
      id: "proj-eap", title: "EAP — Employee Assistance Program", role: "Senior Engineer", company: "Virtusa",
      experienceId: "exp-virtusa", category: "HealthTech", icon: "fa-solid fa-heart-pulse", featured: true,
      start: "2021-07", end: "2022-04",
      description: "Health-insurance assistance platform for employees.",
      highlights: [
        "Built and maintained the application, ensuring secure, efficient access to services.",
        "Implemented authentication and authorization to protect user data.",
        "Dockerized builds automated through Jenkins."
      ],
      tech: ["Java", "Spring Boot", "MongoDB", "JWT Auth", "Docker", "Jenkins", "Angular"],
      links: { live: "", github: "" }
    },
    {
      id: "proj-eab", title: "EAB — Enterprise Admin Builder", role: "Full-Stack Developer", company: "Virtusa",
      experienceId: "exp-virtusa", category: "Enterprise Apps", icon: "fa-solid fa-user-shield", featured: false,
      start: "2021-05", end: "2021-06",
      description: "Enterprise admin builder application.",
      highlights: [],
      tech: ["Java", "Spring Boot", "MongoDB", "Angular"],
      links: { live: "", github: "" }
    },
    {
      id: "proj-rpm", title: "RPM — Registered Program Manager", role: "Software Engineer", company: "CodeInsight Technologies",
      experienceId: "exp-codeinsight", category: "FinTech", icon: "fa-solid fa-credit-card", featured: true,
      start: "2019-02", end: "2021-04",
      description: "Credit/debit card management system for distributor programs.",
      highlights: [
        "Deployed the application for seamless management of distributor information.",
        "Enhanced system performance and scalability for growing user demand.",
        "Automated the build pipeline with Jenkins."
      ],
      tech: ["Java", "Spring Boot", "Hibernate/JPA", "Maven", "MySQL", "Jenkins", "Angular"],
      links: { live: "", github: "" }
    },
    {
      id: "proj-snapcrescent", title: "Snap-Crescent", role: "Full-Stack & Android Developer", company: "CodeInsight Technologies",
      experienceId: "exp-codeinsight", category: "Mobile & Storage", icon: "fa-solid fa-images", featured: false,
      start: "2020-12", end: "2021-04",
      description: "Image and video backup storage application with web and Android clients.",
      highlights: [],
      tech: ["React", "React Native", "Java", "Spring Boot", "MySQL"],
      links: { live: "", github: "" }
    },
    {
      id: "proj-alpha", title: "ALPHA", role: "Front-End Developer", company: "CodeInsight Technologies",
      experienceId: "exp-codeinsight", category: "Enterprise Apps", icon: "fa-solid fa-font", featured: false,
      start: "2020-09", end: "2021-03",
      description: "Front-end development of the ALPHA web application in Angular.",
      highlights: [],
      tech: ["Angular"],
      links: { live: "", github: "" }
    },
    {
      id: "proj-campaign", title: "Campaign Solution", role: "Front-End Developer", company: "CodeInsight Technologies",
      experienceId: "exp-codeinsight", category: "Enterprise Apps", icon: "fa-solid fa-bullhorn", featured: false,
      start: "2020-02", end: "2020-08",
      description: "Campaign management system.",
      highlights: [],
      tech: ["Angular"],
      links: { live: "", github: "" }
    },
    {
      id: "proj-smartparking", title: "Smart Parking", role: "Full-Stack Developer", company: "CodeInsight Technologies",
      experienceId: "exp-codeinsight", category: "IoT", icon: "fa-solid fa-square-parking", featured: false,
      start: "2019-12", end: "2020-01",
      description: "IoT-based smart parking system.",
      highlights: [],
      tech: ["Angular", "Java", "Spring", "Hibernate/JPA", "MySQL"],
      links: { live: "", github: "" }
    },
    {
      id: "proj-talenthunt", title: "Talent-Hunt", role: "Full-Stack Developer", company: "CodeInsight Technologies",
      experienceId: "exp-codeinsight", category: "EdTech", icon: "fa-solid fa-user-graduate", featured: false,
      start: "2018-10", end: "2019-02",
      description: "Online aptitude test portal.",
      highlights: [],
      tech: ["Angular", "Java", "Spring", "Hibernate/JPA", "MySQL"],
      links: { live: "https://talenthunt.thecodeinsight.com", github: "" }
    }
  ],

  /* ---------------- Education ---------------- */
  education: [
    {
      degree: "Bachelor of Technology, Computer Science and Engineering",
      school: "Guru Jambheshwar University of Science and Technology",
      location: "Hisar, Haryana, India",
      start: "Jul 2014", end: "Jun 2018",
      grade: "",                      // e.g. "CGPA 8.0 / 10"
      icon: "fa-solid fa-graduation-cap",
      details: []                     // e.g. ["Final-year project: ..."]
    }
  ],

  /* ---------------- Optional sections (empty = hidden) ----------------
     Add entries and the section appears automatically. Examples in comments. */
  certifications: [
    { name: "Software Engineer – IT Services", issuer: "AMCAT (Aspiring Minds)", validity: "Valid Jan 2017 – Jan 2018", icon: "fa-solid fa-laptop-code",
      url: "https://www.myamcat.com/certificate/4677503/software-engineer---it-services/259" },
    { name: "Node.js Training", issuer: "Xebia Academy Global (Fidelity International)", validity: "Issued Dec 2022 · No expiry", icon: "fa-brands fa-node-js", url: "" }
  ],
  achievements: [
    { title: "Pat On The Back", org: "ITC Infotech India Pvt. Ltd.", year: "Recognition · No expiry", icon: "fa-solid fa-hands-clapping" }
  ],
  testimonials: [
    // { quote: "…", name: "Manager Name", title: "Engineering Manager, AllGoVision" }  — copy from LinkedIn recommendations
  ],

  languages: [ { name: "English", level: "Professional working proficiency" } ],
  interests: [],                      // e.g. ["Open source", "Chess", "Travel"]

  /* ---------------- Contact form → Google Form ----------------
     Paste the Google Form "pre-filled link" (see README → Contact form). When making
     it, type each question's key as its answer:
       name, email, company, phone, linkedin, job_title, job_location,
       work_mode, employment_type, salary, jd_link, job_description, message */
  contact: {
    googleFormPrefilledUrl: "https://docs.google.com/forms/d/e/1FAIpQLSc4BoL0wgSowgHir7uoAJI2EAs95NEnXAswCxFeMcPtBUsLzQ/viewform?usp=pp_url&entry.215384723=name&entry.222045321=email&entry.1877487010=company&entry.1144140003=phone&entry.434752395=linkedin&entry.384483192=job_title&entry.106552750=job_location&entry.305157300=work_mode&entry.1279567420=employment_type&entry.894816270=salary&entry.1922705606=jd_link&entry.1248630744=job_description&entry.1621411282=message",
    subjectPrefix: "New opportunity via portfolio"   // used for the email-app fallback
  }
};
