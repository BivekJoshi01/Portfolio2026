import Digi from "../../assets/Office/Digi.png";
import DigiNaxal from "../../assets/Office/DigiNaxal.png";
import Shankerdev from "../../assets/Office/Shankerdev.png";
import LegalRemit1 from "../../assets/Office/LegalRemit1.png";
import LRLogo from "../../assets/Office/CompanyLogo/LRLogo.svg";
import DGLogo from "../../assets/Office/CompanyLogo/DGLogo.png";
import TU from "../../assets/education/TU.png";

export const experiences = [
  {
    role: "Mid Level Frontend Developer",
    company: "Lumbini Group trading as Legal Remit",
    startDate: "July 2024",
    endDate: "Present",
    description:
      "Designed user interfaces and created interactive prototypes for web and mobile applications. Conducted user research and usability testing to improve product experiences. Collaborated with developers to ensure design implementation fidelity.",
    image: LegalRemit1,
    location:
      "Canberra 87 Anthony Rolfe Ave, Australia (Nepal Office: Kamladi, Kathmandu)",
    skills: [
      "Legal Remit (Remittance Service Provide)",
      "Fly Lumbini (Flight Ticketing)",
    ],
    icon: "L",
    companyLogo: LRLogo,
  },
  {
    role: "Frontend Intern > Associate Jr",
    company: "DG HUB",
    startDate: "Dec 2022",
    endDate: "May 2024",
    description:
      "Designed user interfaces and created interactive prototypes for web and mobile applications. Conducted user research and usability testing to improve product experiences. Collaborated with developers to ensure design implementation fidelity.",
    image: Digi,
    image2: DigiNaxal,
    location: "Dillibazzar, Kathmandu",
    skills: [
      "Clients Portal",
      "Human Resource Management System",
      "KYC System",
    ],
    icon: "D",
    companyLogo: DGLogo,
  },
  {
    role: "Campus Summer Project",
    company: "Tribhuvan University",
    startDate: "March 2021",
    endDate: "April 2024",
    description:
      "Lead the development of responsive web applications using modern technologies like React, Next.js, TypeScript, and Tailwind CSS. Implemented performance optimizations that reduced load times by 40% and improved Lighthouse scores.",
    image: Shankerdev,
    location: "Putalisadak, Kathmandu",
    skills: [
      "Render Education Consultancy (Landing page with login portal)",
      "Pet Care and Adoption E-commerce",
    ],
    icon: "S",
    companyLogo: TU,
  },
];
