import React, { useEffect, useRef, useState } from "react";
import "./Experience.scss";
import { experiences } from "./ExperienceData";
import ExperienceCard from "./ExperienceCard/ExperienceCard";

const Experience = () => {
  const sectionRef = useRef(null);
  const progressRef = useRef(null);
  const itemRefs = useRef([]);
  const [activeIndices, setActiveIndices] = useState([]);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.getAttribute("data-index"));
        if (entry.isIntersecting) {
          setActiveIndices((prev) => [...new Set([...prev, index])]);
        } else {
          setActiveIndices((prev) => prev.filter((i) => i !== index));
        }
      });

      if (progressRef.current && itemRefs.current.length > 0) {
        const firstItemTop = itemRefs.current[0].offsetTop;
        const dotOffset = -32; // adjust this to align with your dot

        if (activeIndices.length > 0) {
          const lastActiveIndex = Math.max(...activeIndices);
          const lastActiveItem = itemRefs.current[lastActiveIndex];
          const lastItemMiddle =
            lastActiveItem.offsetTop + lastActiveItem.offsetHeight / 2;
          const progressHeight = lastItemMiddle - firstItemTop + dotOffset;
          progressRef.current.style.height = `${progressHeight}px`;
        } else {
          progressRef.current.style.height = `0px`;
        }
      }
    },
    {
      threshold: 0.7,
    }
  );

  itemRefs.current.forEach((el) => el && observer.observe(el));

  return () => {
    itemRefs.current.forEach((el) => el && observer.unobserve(el));
  };
}, [activeIndices]);


  return (
    <div
      className="mt-50"
      style={{ minHeight: "90vh", display: "flex", alignItems: "center" }}
    >
      <section className="experience-section" ref={sectionRef} id="experience">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div style={{ fontSize: "32px", fontWeight: "bold" }}>
            My Journey as a Frontend Developer
          </div>
          <div>
            I started my journey at Content Factory and spent 1 years building
            Hotels Nepal, Vacancy Nepal, Lalpurja Nepal. Here's a timeline of my
            journey.
          </div>

          <div className="relative pl-8 md:pl-12 mt-20">
            <div className="timeline-line">
              <div
                ref={progressRef}
                className="timeline-progress"
                style={{ height: "0px" }}
              />
            </div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  data-index={index}
                  ref={(el) => {
                    if (el) itemRefs.current[index] = el;
                  }}
                  className={`timeline-item ${
                    activeIndices.includes(index) ? "active" : ""
                  }`}
                >
                  <ExperienceCard exp={exp} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

      </section>
    </div>
  );
};

export default Experience;
