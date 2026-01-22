import TULogo from "../../assets/education/TU.png";
import Moonlight from "../../assets/education/Moonlight.png";
import PragatiLogo from "../../assets/education/PragatiLogo.svg";
import { useTranslation } from "react-i18next";

const useEducationData = () => {
  const { t } = useTranslation();

  const EducationList = [
    {
      degree: t("whatIStudiedUni"),
      school: t("myUniversity"),
      year: t("uniyear"),
      desc: t("universityName"),
      featured: true,
      logo: TULogo,
    },
    {
      degree: t("whatIStudied12"),
      school: t("collegeName"),
      year: t("higherYear"),
      desc: t("collegeLocation"),
      logo: Moonlight,
    },
    {
      degree: t("whatIStudiedSEE"),
      school: t("schoolName"),
      year: t("secondaryYear"),
      desc: t("schoolLocation"),
      logo: PragatiLogo,
    },
  ];

  const strengthsList = [
    t("Full-Stack Web Development"),
    t("UI/UX Engineering"),
    t("API & Database Design"),
    t("Clean Code & Architecture"),
  ];

  return { EducationList, strengthsList };
};

export default useEducationData;
