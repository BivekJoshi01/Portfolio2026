  import SEE10 from "../../assets/Me/SEE/SEE10.jpg";

  import twelve1 from "../../assets/Me/+2/migration certificate.jpeg"
  import twelve2 from "../../assets/Me/+2/provincial certificate.jpeg"
  import twelve3 from "../../assets/Me/+2/SLC11.jpg"
  import twelve4 from "../../assets/Me/+2/transclip 12.jpeg"
  import twelve5 from "../../assets/Me/+2/concernletter 12.jpg"
  import twelve6 from "../../assets/Me/+2/character certificate 12.jpeg"



  
  export const documents = [
    {
      id: "profile",
      title: "Personal Photos",
      icon: "👤",
      color: "bg-blue-100",
      images: ["/api/placeholder/400/600", "/api/placeholder/400/600"],
      msg: "The evolution of me.",
    },
    {
      id: "10th",
      title: "10th Grade",
      icon: "📜",
      color: "bg-green-100",
      images: [SEE10],
      msg: "Where it all began.",
    },
    {
      id: "12th",
      title: "12th Grade",
      icon: "🎓",
      color: "bg-purple-100",
      images: [twelve1, twelve2, twelve3, twelve4, twelve5, twelve6],
      msg: "The high school hustle.",
    },
    {
      id: "bachelors",
      title: "Bachelors Degree",
      icon: "🏛️",
      color: "bg-orange-100",
      images: ["/api/placeholder/400/600", "/api/placeholder/400/600"],
      msg: "Deep diving into the craft.",
    },
    {
      id: "masters",
      title: "Masters Degree",
      icon: "🧠",
      color: "bg-red-100",
      images: ["/api/placeholder/400/600"],
      msg: "Mastering the domain.",
    },
  ];