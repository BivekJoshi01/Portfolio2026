import "./ExperienceCard.scss";

const ExperienceCard = ({ exp }) => {
  return (
    <div>
      <h3>
        {exp.role} <span className="text-blue-500">@ {exp.company}</span>
      </h3>
      <div className="timeline-dot">
        <span className="text-xs">{exp.icon}</span>
      </div>
      <div className="timeline-duration">
        <span className="text-lg">{exp?.startDate}</span> {" - "}
        <span className="text-lg">{exp?.endDate}</span>
        <div className="w-[50px] h-[50px] mt-2">
          <img
            src={exp?.companyLogo}
            alt={exp?.company}
            className="w-full h-full"
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div className="timeline-image" data-alt={`${exp?.role} illustration`}>
          {exp.image ? (
            <img
              src={exp.image}
              alt={exp.role}
              onError={(e) => {
                const target = e.target;
                target.style.display = "none";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">
              {exp.icon}
            </div>
          )}
        </div>
        <div className="timeline-image2" data-alt={`${exp?.role} illustration`}>
          {exp?.image2 ? (
            <img
              src={exp.image2}
              alt={exp.role}
              onError={(e) => {
                const target = e.target;
                target.style.display = "none";
              }}
            />
          ) : null}
        </div>
      </div>
      <div className="timeline-content">
        <div className="timeline-text">
          <div className="text-blue-500">{exp?.location}</div>
          <p>{exp.description}</p>
          <div className="timeline-skills">
            {exp.skills.map((skill, i) => (
              <span key={i}>{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
