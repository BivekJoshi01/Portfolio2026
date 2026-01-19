import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

export const socials = [
  {
    name: "facebook",
    icon: <FaFacebookF />,
    link: "https://www.facebook.com/bivek.joshi.56",
  },
  {
    name: "instagram",
    icon: <FaInstagram />,
    link: "https://www.instagram.com/bivek.joshi.56/",
  },
  {
    name: "linkedin",
    icon: <FaLinkedinIn />,
    link: "https://www.linkedin.com/in/bivek-joshi-68b02b239/",
  },
  { name: "github", icon: <FaGithub />, link: "https://github.com/BivekJoshi" },
  { name: "twitter", icon: <FaTwitter />, link: "https://x.com/Bvkjosi03Joshi" },
].slice(0, 5);

export const socialColors = {
  facebook: { main: "#1877F2", light: "#E8F0FE" },
  instagram: { main: "#E4405F", light: "#FDEBF0" },
  linkedin: { main: "#0A66C2", light: "#DCEEFB" },
  github: { main: "#171515", light: "#EAEAEA" },
  twitter: { main: "#1DA1F2", light: "#E5F4FD" },
};
