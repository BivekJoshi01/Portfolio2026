import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

export const socials = [
  { name: "facebook", icon: <FaFacebookF />, link: "https://facebook.com" },
  { name: "instagram", icon: <FaInstagram />, link: "https://instagram.com" },
  { name: "linkedin", icon: <FaLinkedinIn />, link: "https://linkedin.com" },
  { name: "github", icon: <FaGithub />, link: "https://github.com" },
  { name: "twitter", icon: <FaTwitter />, link: "https://twitter.com" },
].slice(0, 5);

export const socialColors = {
  facebook: { main: "#1877F2", light: "#E8F0FE" },
  instagram: { main: "#E4405F", light: "#FDEBF0" },
  linkedin: { main: "#0A66C2", light: "#DCEEFB" },
  github: { main: "#171515", light: "#EAEAEA" },
  twitter: { main: "#1DA1F2", light: "#E5F4FD" },
};