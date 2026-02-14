export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  mode: "Remote" | "Hybrid" | "Onsite";
  experience: "Fresher" | "0-1" | "1-3" | "3-5";
  skills: string[];
  source: "LinkedIn" | "Naukri" | "Indeed";
  postedDaysAgo: number;
  salaryRange: string;
  applyUrl: string;
  description: string;
}

export const jobs: Job[] = [
  {
    id: "j01",
    title: "SDE Intern",
    company: "Infosys",
    location: "Bangalore",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["Java", "SQL", "Spring Boot"],
    source: "Naukri",
    postedDaysAgo: 1,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://careers.infosys.com/sde-intern",
    description:
      "Join Infosys as an SDE Intern and work on enterprise-grade Java applications. You will collaborate with cross-functional teams to design, develop, and test backend microservices.\n\nIdeal candidates are final-year B.Tech/BE students with strong fundamentals in data structures and algorithms. Exposure to Spring Boot and REST APIs is a plus.\n\nThis is a 6-month internship based out of the Bangalore Electronic City campus with potential for a full-time offer."
  },
  {
    id: "j02",
    title: "Graduate Engineer Trainee",
    company: "TCS",
    location: "Mumbai",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["Python", "SQL", "Linux"],
    source: "LinkedIn",
    postedDaysAgo: 0,
    salaryRange: "3–5 LPA",
    applyUrl: "https://careers.tcs.com/get",
    description:
      "TCS is hiring Graduate Engineer Trainees through the National Qualifier Test. Selected candidates undergo an intensive training program covering full-stack development, cloud computing, and agile methodologies.\n\nYou will be assigned to a project team based on your skills and business needs. Strong communication and problem-solving abilities are essential.\n\nOpen to 2024 and 2025 graduates from any engineering branch with 60% or above aggregate."
  },
  {
    id: "j03",
    title: "Frontend Intern",
    company: "Flipkart",
    location: "Bangalore",
    mode: "Hybrid",
    experience: "Fresher",
    skills: ["React", "JavaScript", "CSS", "TypeScript"],
    source: "LinkedIn",
    postedDaysAgo: 2,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://www.flipkartcareers.com/frontend-intern",
    description:
      "Work on Flipkart's customer-facing web applications built with React and TypeScript. You'll contribute to improving page performance, accessibility, and responsive design across millions of daily users.\n\nExpect to participate in code reviews, sprint planning, and design discussions. A portfolio or GitHub profile demonstrating frontend projects is highly valued.\n\nThis hybrid role requires 3 days per week at the Bangalore office."
  },
  {
    id: "j04",
    title: "Junior Backend Developer",
    company: "Razorpay",
    location: "Bangalore",
    mode: "Hybrid",
    experience: "0-1",
    skills: ["Go", "PostgreSQL", "Docker", "Kubernetes"],
    source: "LinkedIn",
    postedDaysAgo: 3,
    salaryRange: "6–10 LPA",
    applyUrl: "https://razorpay.com/jobs/backend-developer",
    description:
      "Razorpay is looking for a Junior Backend Developer to build and maintain payment processing services handling millions of transactions daily. You will work with Go microservices deployed on Kubernetes.\n\nStrong fundamentals in distributed systems, API design, and database optimization are expected. Experience with event-driven architectures is a bonus.\n\nYou'll be part of a small, high-impact team with direct exposure to production systems."
  },
  {
    id: "j05",
    title: "QA Intern",
    company: "Wipro",
    location: "Hyderabad",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["Selenium", "Java", "Manual Testing"],
    source: "Naukri",
    postedDaysAgo: 5,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://careers.wipro.com/qa-intern",
    description:
      "Wipro's QA team is hiring interns to support automated and manual testing of enterprise software products. You will write test cases, execute regression suites, and report defects using JIRA.\n\nFamiliarity with Selenium WebDriver and basic Java programming is required. Understanding of SDLC and Agile testing practices will be advantageous.\n\nThe internship is based in the Hyderabad office with a stipend and certificate upon completion."
  },
  {
    id: "j06",
    title: "Data Analyst Intern",
    company: "Swiggy",
    location: "Bangalore",
    mode: "Remote",
    experience: "Fresher",
    skills: ["Python", "SQL", "Excel", "Tableau"],
    source: "Indeed",
    postedDaysAgo: 1,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://careers.swiggy.com/data-analyst-intern",
    description:
      "Swiggy's analytics team needs an intern to support data-driven decision making across delivery operations. You will build dashboards, write SQL queries, and perform cohort analysis on large datasets.\n\nProficiency in Python and SQL is mandatory. Experience with Tableau or Power BI for visualization is preferred.\n\nThis is a fully remote, 3-month internship with flexible working hours."
  },
  {
    id: "j07",
    title: "Java Developer (0-1)",
    company: "Cognizant",
    location: "Chennai",
    mode: "Onsite",
    experience: "0-1",
    skills: ["Java", "Spring Boot", "Microservices", "AWS"],
    source: "Naukri",
    postedDaysAgo: 4,
    salaryRange: "3–5 LPA",
    applyUrl: "https://careers.cognizant.com/java-developer",
    description:
      "Cognizant is hiring Java Developers with 0-1 years of experience to join their digital engineering practice. You will develop RESTful APIs and microservices for global banking and insurance clients.\n\nA strong foundation in Core Java, Spring Boot, and relational databases is required. Familiarity with AWS services like EC2, S3, and Lambda is a plus.\n\nThe role offers structured mentorship and clear career progression paths."
  },
  {
    id: "j08",
    title: "Python Developer (Fresher)",
    company: "Zoho",
    location: "Chennai",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["Python", "Django", "REST APIs", "MySQL"],
    source: "LinkedIn",
    postedDaysAgo: 2,
    salaryRange: "6–10 LPA",
    applyUrl: "https://www.zoho.com/careers/python-developer",
    description:
      "Zoho is looking for fresh Python developers to join their product engineering team. You will build backend systems powering Zoho's suite of business applications used by millions globally.\n\nStrong Python fundamentals, familiarity with Django or Flask, and understanding of database design are essential. Zoho conducts its own evaluation process focused on problem-solving ability.\n\nCompetitive salary with excellent perks including meals, transportation, and on-campus facilities."
  },
  {
    id: "j09",
    title: "React Developer (1-3)",
    company: "Freshworks",
    location: "Chennai",
    mode: "Hybrid",
    experience: "1-3",
    skills: ["React", "TypeScript", "Redux", "Node.js"],
    source: "LinkedIn",
    postedDaysAgo: 0,
    salaryRange: "10–18 LPA",
    applyUrl: "https://www.freshworks.com/careers/react-developer",
    description:
      "Freshworks is hiring a React Developer to build next-generation customer engagement interfaces. You will own feature development from design to deployment, collaborating closely with product and UX teams.\n\nProficiency in React, TypeScript, and state management libraries is required. Experience with component libraries and design systems is highly valued.\n\nHybrid working model with 2 days per week at the Chennai office."
  },
  {
    id: "j10",
    title: "SDE Intern",
    company: "Amazon",
    location: "Hyderabad",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["Java", "Data Structures", "Algorithms", "AWS"],
    source: "LinkedIn",
    postedDaysAgo: 1,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://www.amazon.jobs/sde-intern-india",
    description:
      "Amazon's SDE Internship offers hands-on experience building scalable systems that serve millions of customers. You will work on real production features with guidance from senior engineers.\n\nStrong knowledge of data structures, algorithms, and object-oriented programming is essential. Familiarity with distributed systems concepts is a plus.\n\nThe internship includes a competitive stipend, relocation support, and a potential full-time return offer."
  },
  {
    id: "j11",
    title: "Junior Backend Developer",
    company: "PhonePe",
    location: "Bangalore",
    mode: "Onsite",
    experience: "0-1",
    skills: ["Java", "Spring Boot", "Kafka", "MySQL"],
    source: "Naukri",
    postedDaysAgo: 6,
    salaryRange: "6–10 LPA",
    applyUrl: "https://www.phonepe.com/careers/backend-dev",
    description:
      "PhonePe processes billions of UPI transactions monthly. As a Junior Backend Developer, you will contribute to building reliable, low-latency payment services using Java and Spring Boot.\n\nExperience with message queues like Kafka and strong SQL skills are preferred. You should be comfortable working in a fast-paced, high-ownership environment.\n\nThe role is based in the Bangalore headquarters with standard benefits."
  },
  {
    id: "j12",
    title: "Frontend Intern",
    company: "CRED",
    location: "Bangalore",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["React", "JavaScript", "Tailwind CSS"],
    source: "LinkedIn",
    postedDaysAgo: 3,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://careers.cred.club/frontend-intern",
    description:
      "CRED is hiring a Frontend Intern to work on its member-facing web platform known for exceptional design quality. You will implement pixel-perfect UI components and optimize rendering performance.\n\nStrong understanding of React, modern CSS, and responsive design is required. An eye for design and attention to detail will set you apart.\n\nBased at CRED's Bangalore office with a design-driven engineering culture."
  },
  {
    id: "j13",
    title: "Data Analyst Intern",
    company: "Paytm",
    location: "Noida",
    mode: "Hybrid",
    experience: "Fresher",
    skills: ["SQL", "Python", "Power BI", "Excel"],
    source: "Indeed",
    postedDaysAgo: 7,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://paytm.com/careers/data-analyst-intern",
    description:
      "Paytm's business intelligence team is looking for a Data Analyst Intern to assist in building reports and dashboards for the payments vertical. You will work with large transactional datasets.\n\nSQL proficiency is mandatory. Familiarity with Python for data wrangling and Power BI for visualization is expected.\n\nHybrid role based out of Noida with 3 days on-site."
  },
  {
    id: "j14",
    title: "Graduate Engineer Trainee",
    company: "Accenture",
    location: "Pune",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["Java", "SQL", "Agile", "Cloud"],
    source: "Naukri",
    postedDaysAgo: 2,
    salaryRange: "3–5 LPA",
    applyUrl: "https://www.accenture.com/in-en/careers/get",
    description:
      "Accenture's GET program is one of the largest fresher hiring initiatives in India. Selected candidates undergo training in full-stack development, cloud platforms, and enterprise software delivery.\n\nOpen to 2024/2025 engineering graduates with minimum 60% aggregate. Strong analytical and communication skills are essential.\n\nPosting locations include Pune, Bangalore, Hyderabad, and Chennai based on project requirements."
  },
  {
    id: "j15",
    title: "React Developer (1-3)",
    company: "Juspay",
    location: "Bangalore",
    mode: "Onsite",
    experience: "1-3",
    skills: ["React", "PureScript", "Haskell", "TypeScript"],
    source: "LinkedIn",
    postedDaysAgo: 4,
    salaryRange: "10–18 LPA",
    applyUrl: "https://juspay.in/careers/react-developer",
    description:
      "Juspay builds payment infrastructure for some of India's largest banks and merchants. As a React Developer, you will create seamless checkout experiences used across multiple banking apps.\n\nExperience with React and TypeScript is required. Exposure to functional programming languages like PureScript or Haskell is a strong advantage.\n\nThe engineering culture emphasizes correctness, type safety, and rigorous code review."
  },
  {
    id: "j16",
    title: "Python Developer (Fresher)",
    company: "IBM",
    location: "Bangalore",
    mode: "Hybrid",
    experience: "Fresher",
    skills: ["Python", "Flask", "MongoDB", "Docker"],
    source: "Naukri",
    postedDaysAgo: 8,
    salaryRange: "3–5 LPA",
    applyUrl: "https://www.ibm.com/careers/python-developer",
    description:
      "IBM India is hiring fresh Python developers for its cloud and cognitive software division. You will build APIs and automation tools that integrate with IBM's enterprise AI platforms.\n\nKnowledge of Python, basic web frameworks like Flask, and version control with Git is required. Experience with containerization using Docker is beneficial.\n\nHybrid working with flexible schedules and access to IBM's global learning platform."
  },
  {
    id: "j17",
    title: "QA Intern",
    company: "Capgemini",
    location: "Pune",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["Manual Testing", "Selenium", "JIRA", "SQL"],
    source: "Indeed",
    postedDaysAgo: 9,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://www.capgemini.com/in-en/careers/qa-intern",
    description:
      "Capgemini's quality engineering team is looking for interns to join their testing practice for a major banking client. You will execute test plans, log defects, and support automation efforts.\n\nBasic understanding of software testing concepts and SQL is required. Hands-on experience with Selenium and JIRA is preferred.\n\nThe internship is based in Pune with a 6-month duration and performance-based conversion."
  },
  {
    id: "j18",
    title: "Java Developer (0-1)",
    company: "Oracle",
    location: "Hyderabad",
    mode: "Onsite",
    experience: "0-1",
    skills: ["Java", "Oracle DB", "PL/SQL", "REST APIs"],
    source: "LinkedIn",
    postedDaysAgo: 5,
    salaryRange: "6–10 LPA",
    applyUrl: "https://www.oracle.com/in/careers/java-developer",
    description:
      "Oracle India is hiring Java Developers to work on its cloud infrastructure products. You will build high-performance services that power Oracle Cloud's global data centers.\n\nDeep understanding of Java, multithreading, and Oracle Database is required. Knowledge of PL/SQL and experience building RESTful services is expected.\n\nThe role offers exposure to large-scale distributed systems and excellent growth opportunities."
  },
  {
    id: "j19",
    title: "SDE Intern",
    company: "Razorpay",
    location: "Bangalore",
    mode: "Hybrid",
    experience: "Fresher",
    skills: ["Go", "Python", "Git", "Linux"],
    source: "LinkedIn",
    postedDaysAgo: 1,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://razorpay.com/jobs/sde-intern",
    description:
      "Razorpay's internship program gives you the chance to work on real fintech infrastructure serving millions of businesses. You will contribute to backend services written in Go and Python.\n\nComfort with Linux environments, Git workflows, and API development is expected. Problem-solving aptitude matters more than specific language experience.\n\nHybrid model with mentorship from experienced engineers and a clear path to a full-time offer."
  },
  {
    id: "j20",
    title: "Frontend Intern",
    company: "Swiggy",
    location: "Bangalore",
    mode: "Remote",
    experience: "Fresher",
    skills: ["React", "Next.js", "CSS", "JavaScript"],
    source: "Naukri",
    postedDaysAgo: 0,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://careers.swiggy.com/frontend-intern",
    description:
      "Swiggy is looking for a Frontend Intern to help build and improve consumer-facing web experiences for food delivery and quick commerce. You will work with React and Next.js.\n\nGood understanding of HTML, CSS, JavaScript, and responsive design principles is essential. Experience with Next.js or similar frameworks is a bonus.\n\nFully remote position with weekly sync calls and structured learning goals."
  },
  {
    id: "j21",
    title: "Junior Backend Developer",
    company: "Zoho",
    location: "Chennai",
    mode: "Onsite",
    experience: "0-1",
    skills: ["Java", "MySQL", "REST APIs", "Linux"],
    source: "Naukri",
    postedDaysAgo: 3,
    salaryRange: "6–10 LPA",
    applyUrl: "https://www.zoho.com/careers/backend-developer",
    description:
      "Zoho is expanding its backend team to build scalable services for its CRM and collaboration products. You will design APIs, optimize database queries, and ensure system reliability.\n\nStrong fundamentals in Java and relational databases are essential. Zoho values problem-solving ability over brand-name experience.\n\nOn-campus role in Chennai with industry-leading perks and zero-politics engineering culture."
  },
  {
    id: "j22",
    title: "React Developer (1-3)",
    company: "Accenture",
    location: "Hyderabad",
    mode: "Hybrid",
    experience: "1-3",
    skills: ["React", "Redux", "JavaScript", "REST APIs"],
    source: "Indeed",
    postedDaysAgo: 6,
    salaryRange: "6–10 LPA",
    applyUrl: "https://www.accenture.com/in-en/careers/react-dev",
    description:
      "Accenture's interactive practice is hiring React Developers for a major e-commerce client engagement. You will build reusable component libraries and implement complex UI workflows.\n\nExperience with React, Redux, and consuming REST APIs is required. Understanding of CI/CD pipelines and unit testing with Jest is preferred.\n\nHybrid work model based out of Hyderabad with client interaction opportunities."
  },
  {
    id: "j23",
    title: "Graduate Engineer Trainee",
    company: "Capgemini",
    location: "Mumbai",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["Java", "Python", "SQL", "Agile"],
    source: "Naukri",
    postedDaysAgo: 10,
    salaryRange: "3–5 LPA",
    applyUrl: "https://www.capgemini.com/in-en/careers/get",
    description:
      "Capgemini's GET program provides structured training and project placement for fresh engineering graduates. Training covers Java, Python, SQL, and Agile methodologies over 8 weeks.\n\nCandidates must have a BE/B.Tech degree with 60% or above. Strong analytical thinking and eagerness to learn are key selection criteria.\n\nPosting locations include Mumbai, Pune, and Bangalore."
  },
  {
    id: "j24",
    title: "Data Analyst Intern",
    company: "Flipkart",
    location: "Bangalore",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["SQL", "Python", "Pandas", "Matplotlib"],
    source: "LinkedIn",
    postedDaysAgo: 4,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://www.flipkartcareers.com/data-analyst-intern",
    description:
      "Flipkart's data science team is hiring interns to analyze customer behavior, supply chain metrics, and marketplace trends. You will write SQL queries and build Python-based analysis pipelines.\n\nStrong SQL skills and familiarity with Pandas and Matplotlib are required. Statistical thinking and clear data storytelling ability are valued.\n\nOn-site at Flipkart's Bangalore campus with exposure to India's largest e-commerce dataset."
  },
  {
    id: "j25",
    title: "Java Developer (0-1)",
    company: "TCS",
    location: "Pune",
    mode: "Onsite",
    experience: "0-1",
    skills: ["Java", "Spring", "Hibernate", "SQL"],
    source: "Naukri",
    postedDaysAgo: 7,
    salaryRange: "3–5 LPA",
    applyUrl: "https://careers.tcs.com/java-developer",
    description:
      "TCS Digital is hiring Java Developers for its product engineering unit. You will work on internal platforms and client-facing applications built with Spring and Hibernate.\n\nKnowledge of Core Java, OOP principles, and SQL is mandatory. Spring framework experience and understanding of build tools like Maven is preferred.\n\nBased in TCS Pune with standard IT industry benefits and structured learning paths."
  },
  {
    id: "j26",
    title: "Python Developer (Fresher)",
    company: "Infosys",
    location: "Mysore",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["Python", "Django", "PostgreSQL", "Git"],
    source: "Naukri",
    postedDaysAgo: 3,
    salaryRange: "3–5 LPA",
    applyUrl: "https://careers.infosys.com/python-developer",
    description:
      "Infosys BPM's digital unit is hiring Python Developers for automation and web development projects. Training will be provided at the Mysore campus before project assignment.\n\nBasic Python skills and understanding of web frameworks like Django are expected. Familiarity with PostgreSQL and version control using Git is beneficial.\n\nComprehensive onboarding with accommodation and meals at the Mysore training center."
  },
  {
    id: "j27",
    title: "SDE Intern",
    company: "PhonePe",
    location: "Bangalore",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["Java", "Kotlin", "Android", "Git"],
    source: "LinkedIn",
    postedDaysAgo: 2,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://www.phonepe.com/careers/sde-intern",
    description:
      "PhonePe is offering SDE internships focused on Android development for its consumer payments app. You will work on features used by hundreds of millions of users.\n\nProficiency in Java or Kotlin and understanding of Android SDK is required. Experience with version control and CI/CD pipelines is a plus.\n\nFull-time on-site at PhonePe's Bangalore office with a competitive stipend."
  },
  {
    id: "j28",
    title: "QA Intern",
    company: "Freshworks",
    location: "Chennai",
    mode: "Hybrid",
    experience: "Fresher",
    skills: ["Cypress", "JavaScript", "API Testing", "Git"],
    source: "Indeed",
    postedDaysAgo: 5,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://www.freshworks.com/careers/qa-intern",
    description:
      "Freshworks is hiring QA Interns to strengthen test automation for its SaaS products. You will write Cypress tests, perform API testing, and maintain test documentation.\n\nBasic JavaScript knowledge and understanding of testing fundamentals are required. Familiarity with Cypress or similar e2e frameworks is a strong advantage.\n\nHybrid role in Chennai with a supportive, learning-focused team environment."
  },
  {
    id: "j29",
    title: "Frontend Intern",
    company: "Juspay",
    location: "Bangalore",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["React", "TypeScript", "CSS", "Figma"],
    source: "LinkedIn",
    postedDaysAgo: 1,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://juspay.in/careers/frontend-intern",
    description:
      "Juspay needs a Frontend Intern to build payment checkout interfaces used by major banks. You will translate Figma designs into production-ready React components with pixel-perfect accuracy.\n\nProficiency in React and TypeScript is required. An appreciation for clean code, design systems, and accessibility standards will set you apart.\n\nOn-site at Juspay's Bangalore office with a strong mentorship program."
  },
  {
    id: "j30",
    title: "Junior Backend Developer",
    company: "Dell",
    location: "Hyderabad",
    mode: "Hybrid",
    experience: "0-1",
    skills: ["Python", "Django", "PostgreSQL", "Docker"],
    source: "Naukri",
    postedDaysAgo: 8,
    salaryRange: "6–10 LPA",
    applyUrl: "https://jobs.dell.com/backend-developer-india",
    description:
      "Dell Technologies is hiring Junior Backend Developers for its IT infrastructure management platform. You will build APIs and internal tools using Python and Django.\n\nExperience with PostgreSQL, Docker, and RESTful API design is preferred. Strong debugging skills and comfort with command-line tools are expected.\n\nHybrid role based in Hyderabad with global team collaboration opportunities."
  },
  {
    id: "j31",
    title: "React Developer (1-3)",
    company: "Razorpay",
    location: "Bangalore",
    mode: "Hybrid",
    experience: "1-3",
    skills: ["React", "TypeScript", "GraphQL", "Webpack"],
    source: "LinkedIn",
    postedDaysAgo: 0,
    salaryRange: "10–18 LPA",
    applyUrl: "https://razorpay.com/jobs/react-developer",
    description:
      "Razorpay is looking for a React Developer to build merchant-facing dashboards and analytics tools. You will work on complex data visualizations and real-time transaction monitoring interfaces.\n\nProficiency in React, TypeScript, and experience with GraphQL or REST APIs is required. Knowledge of build tools like Webpack and performance optimization techniques is valued.\n\nHybrid model with a collaborative, engineering-first culture."
  },
  {
    id: "j32",
    title: "Graduate Engineer Trainee",
    company: "Wipro",
    location: "Bangalore",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["Java", "C++", "SQL", "Problem Solving"],
    source: "Naukri",
    postedDaysAgo: 9,
    salaryRange: "3–5 LPA",
    applyUrl: "https://careers.wipro.com/get",
    description:
      "Wipro's Elite NLTH program hires freshers through an aptitude and coding assessment. Selected candidates receive 3 months of training before being assigned to client projects.\n\nOpen to BE/B.Tech graduates from 2024/2025 batches with 60% or above. Strong problem-solving skills and willingness to relocate are required.\n\nTraining is conducted at Wipro's Bangalore campus with accommodation provided."
  },
  {
    id: "j33",
    title: "SDE Intern",
    company: "Paytm",
    location: "Noida",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["Java", "Spring Boot", "MongoDB", "Git"],
    source: "Indeed",
    postedDaysAgo: 4,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://paytm.com/careers/sde-intern",
    description:
      "Paytm is hiring SDE Interns to work on its financial services backend. You will develop features for lending, insurance, and investment products using Java and Spring Boot.\n\nKnowledge of Java, MongoDB, and Git is required. Understanding of financial domain concepts is a bonus but not mandatory.\n\nBased at Paytm's Noida headquarters with a fast-paced startup-like culture."
  },
  {
    id: "j34",
    title: "Java Developer (0-1)",
    company: "SAP",
    location: "Bangalore",
    mode: "Hybrid",
    experience: "0-1",
    skills: ["Java", "SAP HANA", "REST APIs", "JUnit"],
    source: "LinkedIn",
    postedDaysAgo: 6,
    salaryRange: "6–10 LPA",
    applyUrl: "https://jobs.sap.com/java-developer-india",
    description:
      "SAP Labs India is hiring Java Developers to work on its business technology platform. You will build enterprise-grade services integrated with SAP HANA's in-memory database.\n\nSolid Java fundamentals, experience with JUnit testing, and understanding of REST API design are required. Exposure to SAP technologies is helpful but not mandatory.\n\nHybrid role at SAP's Bangalore campus with world-class facilities and benefits."
  },
  {
    id: "j35",
    title: "Python Developer (Fresher)",
    company: "Accenture",
    location: "Hyderabad",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["Python", "FastAPI", "AWS", "SQL"],
    source: "Naukri",
    postedDaysAgo: 2,
    salaryRange: "3–5 LPA",
    applyUrl: "https://www.accenture.com/in-en/careers/python-dev",
    description:
      "Accenture's AI and analytics practice is hiring Python Developers to build data processing pipelines and API services. You will work with FastAPI and deploy solutions on AWS.\n\nPython proficiency and SQL knowledge are essential. Familiarity with cloud services and basic DevOps concepts is preferred.\n\nBased in Hyderabad with opportunities to rotate across projects and domains."
  },
  {
    id: "j36",
    title: "Frontend Intern",
    company: "Cognizant",
    location: "Chennai",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["Angular", "TypeScript", "HTML", "SCSS"],
    source: "Indeed",
    postedDaysAgo: 7,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://careers.cognizant.com/frontend-intern",
    description:
      "Cognizant's digital experience team is hiring Frontend Interns to work on Angular-based enterprise applications for a healthcare client. You will implement UI designs and integrate with backend APIs.\n\nBasic knowledge of Angular, TypeScript, and CSS preprocessors is required. Understanding of responsive design and accessibility guidelines is valued.\n\nOn-site in Chennai with a 4-month duration and potential for full-time conversion."
  },
  {
    id: "j37",
    title: "Data Analyst Intern",
    company: "Amazon",
    location: "Hyderabad",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["SQL", "Python", "AWS QuickSight", "Excel"],
    source: "LinkedIn",
    postedDaysAgo: 3,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://www.amazon.jobs/data-analyst-intern-india",
    description:
      "Amazon's operations analytics team is hiring Data Analyst Interns to support supply chain optimization. You will analyze fulfillment center data and build operational dashboards.\n\nAdvanced SQL skills and Python proficiency are mandatory. Experience with visualization tools, especially AWS QuickSight, is a strong advantage.\n\nOn-site at Amazon's Hyderabad campus with exposure to world-class data infrastructure."
  },
  {
    id: "j38",
    title: "Junior Backend Developer",
    company: "CRED",
    location: "Bangalore",
    mode: "Onsite",
    experience: "0-1",
    skills: ["Kotlin", "Spring Boot", "PostgreSQL", "Redis"],
    source: "LinkedIn",
    postedDaysAgo: 1,
    salaryRange: "10–18 LPA",
    applyUrl: "https://careers.cred.club/backend-developer",
    description:
      "CRED is building India's most trusted credit platform. As a Junior Backend Developer, you will work on high-scale services handling credit card payments and reward systems.\n\nExperience with Kotlin or Java, Spring Boot, and PostgreSQL is required. Understanding of caching with Redis and event-driven architecture is preferred.\n\nCRED is known for its design-driven culture, high engineering bar, and premium office experience."
  },
  {
    id: "j39",
    title: "React Developer (1-3)",
    company: "Flipkart",
    location: "Bangalore",
    mode: "Onsite",
    experience: "1-3",
    skills: ["React", "JavaScript", "Node.js", "Performance"],
    source: "Naukri",
    postedDaysAgo: 5,
    salaryRange: "10–18 LPA",
    applyUrl: "https://www.flipkartcareers.com/react-developer",
    description:
      "Flipkart's web platform team needs React Developers to optimize the shopping experience for millions of daily users. You will work on server-side rendering, code splitting, and performance profiling.\n\nStrong React and JavaScript skills with understanding of web performance metrics are essential. Node.js experience for BFF layer development is a plus.\n\nOn-site role in Bangalore with competitive compensation and ESOPs."
  },
  {
    id: "j40",
    title: "QA Intern",
    company: "TCS",
    location: "Kolkata",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["Manual Testing", "TestNG", "Java", "JIRA"],
    source: "Naukri",
    postedDaysAgo: 10,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://careers.tcs.com/qa-intern",
    description:
      "TCS Quality Engineering team is hiring interns for their Kolkata delivery center. You will support test execution for a large banking transformation project.\n\nUnderstanding of manual testing processes and basic automation with TestNG is required. Defect management experience with JIRA is preferred.\n\nSix-month internship with certificate and potential pre-placement offer."
  },
  {
    id: "j41",
    title: "SDE Intern",
    company: "Tekmetric",
    location: "Bangalore",
    mode: "Remote",
    experience: "Fresher",
    skills: ["React", "Node.js", "PostgreSQL", "Git"],
    source: "LinkedIn",
    postedDaysAgo: 0,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://tekmetric.com/careers/sde-intern",
    description:
      "Tekmetric is a US-based SaaS company hiring remote SDE Interns from India to work on its auto repair shop management platform. You will build full-stack features using React and Node.js.\n\nComfort with JavaScript, PostgreSQL, and Git is required. Self-motivation and strong communication skills are essential for remote collaboration.\n\nFully remote with flexible hours and a supportive mentorship program."
  },
  {
    id: "j42",
    title: "Java Developer (0-1)",
    company: "Infosys",
    location: "Pune",
    mode: "Onsite",
    experience: "0-1",
    skills: ["Java", "Spring Boot", "Microservices", "Jenkins"],
    source: "Naukri",
    postedDaysAgo: 4,
    salaryRange: "3–5 LPA",
    applyUrl: "https://careers.infosys.com/java-developer-pune",
    description:
      "Infosys Digital is hiring Java Developers for its Pune delivery center to work on cloud-native microservices for a European telecom client.\n\nJava, Spring Boot, and basic DevOps knowledge with Jenkins are required. Understanding of microservice patterns and containerization is beneficial.\n\nStandard Infosys benefits with opportunity for international project exposure."
  },
  {
    id: "j43",
    title: "Frontend Intern",
    company: "Spinny",
    location: "Gurgaon",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["React", "JavaScript", "REST APIs", "CSS"],
    source: "LinkedIn",
    postedDaysAgo: 2,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://www.spinny.com/careers/frontend-intern",
    description:
      "Spinny, India's leading used car platform, is hiring a Frontend Intern to improve its vehicle listing and booking experience. You will build React components and integrate with backend APIs.\n\nFamiliarity with React, JavaScript, and CSS is required. Understanding of user experience principles and mobile-first design is valued.\n\nBased at Spinny's Gurgaon headquarters with a dynamic startup environment."
  },
  {
    id: "j44",
    title: "Python Developer (Fresher)",
    company: "Wipro",
    location: "Hyderabad",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["Python", "Django", "MySQL", "AWS"],
    source: "Naukri",
    postedDaysAgo: 6,
    salaryRange: "3–5 LPA",
    applyUrl: "https://careers.wipro.com/python-developer",
    description:
      "Wipro is expanding its Python development team in Hyderabad for cloud migration and automation projects. Freshers will undergo a 6-week training program before project assignment.\n\nBasic Python skills, familiarity with web frameworks, and understanding of databases are expected. AWS cloud fundamentals knowledge is a plus.\n\nStandard Wipro compensation with structured career progression."
  },
  {
    id: "j45",
    title: "Graduate Engineer Trainee",
    company: "Cognizant",
    location: "Chennai",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["Java", "SQL", "HTML", "CSS"],
    source: "Naukri",
    postedDaysAgo: 8,
    salaryRange: "3–5 LPA",
    applyUrl: "https://careers.cognizant.com/get",
    description:
      "Cognizant's GenC program hires freshers through an online assessment covering coding, aptitude, and communication. Training covers Java, web development, and database management.\n\nOpen to 2024/2025 graduates with 60% or above aggregate. Consistent academic record without standing arrears is mandatory.\n\nPosting in Chennai with potential relocation to other cities based on project needs."
  },
  {
    id: "j46",
    title: "Junior Backend Developer",
    company: "Meesho",
    location: "Bangalore",
    mode: "Onsite",
    experience: "0-1",
    skills: ["Python", "Flask", "Redis", "MySQL"],
    source: "LinkedIn",
    postedDaysAgo: 3,
    salaryRange: "6–10 LPA",
    applyUrl: "https://meesho.io/careers/backend-developer",
    description:
      "Meesho is India's fastest-growing social commerce platform. As a Junior Backend Developer, you will build catalog management and order processing services using Python and Flask.\n\nExperience with Redis for caching, MySQL for persistence, and understanding of REST API patterns is required. Comfort with high-scale systems is preferred.\n\nOn-site in Bangalore with competitive pay, ESOPs, and rapid career growth."
  },
  {
    id: "j47",
    title: "Data Analyst Intern",
    company: "Razorpay",
    location: "Bangalore",
    mode: "Hybrid",
    experience: "Fresher",
    skills: ["SQL", "Python", "Looker", "Statistics"],
    source: "LinkedIn",
    postedDaysAgo: 1,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://razorpay.com/jobs/data-analyst-intern",
    description:
      "Razorpay's growth analytics team is hiring an intern to analyze merchant onboarding funnels and payment success rates. You will build Looker dashboards and run A/B test analyses.\n\nStrong SQL and Python skills are mandatory. Understanding of statistical concepts and experimentation frameworks is highly valued.\n\nHybrid role with 3 days on-site at Razorpay's Bangalore office."
  },
  {
    id: "j48",
    title: "React Developer (1-3)",
    company: "Swiggy",
    location: "Bangalore",
    mode: "Remote",
    experience: "1-3",
    skills: ["React", "Next.js", "TypeScript", "Storybook"],
    source: "LinkedIn",
    postedDaysAgo: 2,
    salaryRange: "10–18 LPA",
    applyUrl: "https://careers.swiggy.com/react-developer",
    description:
      "Swiggy is hiring React Developers to build its next-generation web experiences for food, grocery, and quick commerce. You will own the design system implementation and component library.\n\nProficiency in React, TypeScript, and Next.js is required. Experience with Storybook for component documentation and visual testing is highly valued.\n\nFully remote role with quarterly team meetups and excellent remote work support."
  },
  {
    id: "j49",
    title: "SDE Intern",
    company: "Atlassian",
    location: "Bangalore",
    mode: "Hybrid",
    experience: "Fresher",
    skills: ["Java", "React", "Git", "Agile"],
    source: "LinkedIn",
    postedDaysAgo: 0,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://www.atlassian.com/company/careers/sde-intern-india",
    description:
      "Atlassian's internship program in Bangalore offers the opportunity to work on products like Jira, Confluence, and Trello used by millions of teams worldwide. Interns work on real features shipped to production.\n\nStrong problem-solving skills, knowledge of Java or React, and familiarity with Agile practices are expected. Team collaboration and communication skills are essential.\n\nHybrid model with world-class office, benefits, and a high intern-to-hire conversion rate."
  },
  {
    id: "j50",
    title: "Python Developer (Fresher)",
    company: "Capgemini",
    location: "Pune",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["Python", "Flask", "SQL", "Git"],
    source: "Indeed",
    postedDaysAgo: 5,
    salaryRange: "3–5 LPA",
    applyUrl: "https://www.capgemini.com/in-en/careers/python-dev",
    description:
      "Capgemini is hiring Python Developers in Pune for its data engineering and automation practice. Fresh graduates will receive project-specific training before joining their delivery teams.\n\nPython fundamentals, basic SQL, and familiarity with Flask or Django are required. Git workflow knowledge is expected.\n\nStandard benefits with structured career growth and option for international relocation."
  },
  {
    id: "j51",
    title: "Java Developer (0-1)",
    company: "Flipkart",
    location: "Bangalore",
    mode: "Onsite",
    experience: "0-1",
    skills: ["Java", "Spring Boot", "Kafka", "Elasticsearch"],
    source: "LinkedIn",
    postedDaysAgo: 4,
    salaryRange: "10–18 LPA",
    applyUrl: "https://www.flipkartcareers.com/java-developer",
    description:
      "Flipkart's search and discovery team is hiring Java Developers to build the platform's product search and recommendation engine. You will work with Kafka for event streaming and Elasticsearch for search indexing.\n\nStrong Java skills, understanding of distributed systems, and experience with Spring Boot are required. Knowledge of search technologies is a plus.\n\nOn-site in Bangalore with highly competitive compensation and ESOPs."
  },
  {
    id: "j52",
    title: "QA Intern",
    company: "Amazon",
    location: "Chennai",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["Selenium", "Python", "API Testing", "Linux"],
    source: "LinkedIn",
    postedDaysAgo: 7,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://www.amazon.jobs/qa-intern-india",
    description:
      "Amazon's quality assurance team is hiring interns to automate testing for its Alexa voice services platform. You will write Selenium scripts, test APIs, and validate voice interaction scenarios.\n\nPython proficiency, basic Selenium experience, and comfort with Linux environments are required. Understanding of API testing with Postman or similar tools is valued.\n\nOn-site at Amazon's Chennai development center with competitive internship stipend."
  },
  {
    id: "j53",
    title: "Frontend Intern",
    company: "Groww",
    location: "Bangalore",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["React", "TypeScript", "Tailwind CSS", "Git"],
    source: "LinkedIn",
    postedDaysAgo: 1,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://groww.in/careers/frontend-intern",
    description:
      "Groww, India's leading investment platform, is hiring Frontend Interns to build intuitive interfaces for mutual fund and stock trading features. You will work closely with the design team to implement clean, responsive UIs.\n\nReact and TypeScript proficiency is required. Experience with Tailwind CSS and an understanding of financial product UX is a bonus.\n\nOn-site at Groww's Bangalore office with mentorship from senior engineers."
  },
  {
    id: "j54",
    title: "Junior Backend Developer",
    company: "Ola",
    location: "Bangalore",
    mode: "Hybrid",
    experience: "0-1",
    skills: ["Go", "gRPC", "PostgreSQL", "Docker"],
    source: "Naukri",
    postedDaysAgo: 9,
    salaryRange: "6–10 LPA",
    applyUrl: "https://www.olacabs.com/careers/backend-developer",
    description:
      "Ola's ride-hailing platform is hiring Junior Backend Developers to build real-time matching and dispatch services using Go. You will work on latency-critical systems processing millions of ride requests.\n\nExperience with Go, gRPC, and PostgreSQL is preferred. Understanding of containerized deployments with Docker and Kubernetes is beneficial.\n\nHybrid role in Bangalore with exposure to large-scale distributed systems."
  },
  {
    id: "j55",
    title: "React Developer (1-3)",
    company: "Paytm",
    location: "Noida",
    mode: "Onsite",
    experience: "1-3",
    skills: ["React", "JavaScript", "Redux", "Webpack"],
    source: "Naukri",
    postedDaysAgo: 3,
    salaryRange: "6–10 LPA",
    applyUrl: "https://paytm.com/careers/react-developer",
    description:
      "Paytm is hiring React Developers to build and maintain its merchant dashboard and financial services web applications. You will implement complex forms, data tables, and real-time notifications.\n\nReact, Redux, and JavaScript proficiency is required. Experience with build tools like Webpack and testing with Jest is preferred.\n\nOn-site at Paytm's Noida headquarters with a fast-paced fintech environment."
  },
  {
    id: "j56",
    title: "Graduate Engineer Trainee",
    company: "IBM",
    location: "Bangalore",
    mode: "Hybrid",
    experience: "Fresher",
    skills: ["Java", "Python", "Cloud", "AI/ML Basics"],
    source: "LinkedIn",
    postedDaysAgo: 6,
    salaryRange: "3–5 LPA",
    applyUrl: "https://www.ibm.com/careers/get-india",
    description:
      "IBM's Associate Program hires fresh graduates for roles across cloud computing, AI, and enterprise software. You will receive 3 months of structured training with IBM's global learning resources.\n\nEngineering graduates from any branch with 65% or above are eligible. Strong aptitude, communication skills, and interest in technology are key selection criteria.\n\nHybrid model in Bangalore with access to IBM's research labs and innovation centers."
  },
  {
    id: "j57",
    title: "Data Analyst Intern",
    company: "Zerodha",
    location: "Bangalore",
    mode: "Remote",
    experience: "Fresher",
    skills: ["SQL", "Python", "Pandas", "Financial Data"],
    source: "LinkedIn",
    postedDaysAgo: 2,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://zerodha.com/careers/data-analyst-intern",
    description:
      "Zerodha, India's largest stock broker, is hiring a Data Analyst Intern to analyze trading patterns and market data. You will write SQL queries on large datasets and build analytical reports using Python.\n\nStrong SQL skills and Python proficiency with Pandas are mandatory. Interest in financial markets and basic statistical knowledge is highly valued.\n\nFully remote role with direct mentorship from Zerodha's data team."
  },
  {
    id: "j58",
    title: "SDE Intern",
    company: "Darwinbox",
    location: "Hyderabad",
    mode: "Onsite",
    experience: "Fresher",
    skills: ["Java", "React", "MySQL", "REST APIs"],
    source: "LinkedIn",
    postedDaysAgo: 4,
    salaryRange: "₹15k–₹40k/month Internship",
    applyUrl: "https://darwinbox.com/careers/sde-intern",
    description:
      "Darwinbox, a leading HR tech platform, is hiring SDE Interns to work on its core HRMS product used by enterprises across Asia. You will build features spanning payroll, attendance, and performance management.\n\nKnowledge of Java, React, and MySQL is required. Understanding of REST API design and basic system design concepts is preferred.\n\nOn-site at Darwinbox's Hyderabad office with a product-driven engineering culture."
  },
  {
    id: "j59",
    title: "Python Developer (Fresher)",
    company: "Dell",
    location: "Bangalore",
    mode: "Hybrid",
    experience: "Fresher",
    skills: ["Python", "FastAPI", "PostgreSQL", "AWS"],
    source: "Indeed",
    postedDaysAgo: 3,
    salaryRange: "3–5 LPA",
    applyUrl: "https://jobs.dell.com/python-developer-india",
    description:
      "Dell's cloud infrastructure team is hiring Python Developers to build automation tools and monitoring services. You will work with FastAPI, PostgreSQL, and deploy on AWS.\n\nPython fundamentals and understanding of web APIs are required. Exposure to cloud platforms and containerization is a plus.\n\nHybrid role in Bangalore with comprehensive benefits and global career opportunities."
  },
  {
    id: "j60",
    title: "Junior Backend Developer",
    company: "Zeta",
    location: "Hyderabad",
    mode: "Onsite",
    experience: "0-1",
    skills: ["Java", "Spring Boot", "Kubernetes", "gRPC"],
    source: "LinkedIn",
    postedDaysAgo: 1,
    salaryRange: "10–18 LPA",
    applyUrl: "https://www.zeta.tech/careers/backend-developer",
    description:
      "Zeta is a modern banking technology company building infrastructure for next-gen credit and debit processing. As a Junior Backend Developer, you will work on high-throughput transaction processing systems.\n\nJava, Spring Boot, and understanding of microservice architecture are required. Experience with Kubernetes and gRPC is preferred.\n\nZeta offers a premium work environment in Hyderabad with strong engineering culture and competitive compensation."
  }
];
