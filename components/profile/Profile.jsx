import { useState, useEffect } from "react";

import ProMembership from "./profile-contents/ProMembership";
import Account from "./profile-contents/Account";
import YourPLans from "./profile-contents/YourPlans";

import styles from "../../styles/styles";
import "./contents-styles.css";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("account");
  const [content, setContent] = useState();

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    const renderContent = () => {
      switch (activeSection) {
        case "account":
          return <Account />;
        case "premium":
          return <ProMembership />;
        case "plans":
          return <YourPLans />;
        default:
          return null;
      }
    };
    setContent(renderContent());
  }, [activeSection]);

  return (
    <section className={`${styles.myPadding} max-w-[900px] m-auto`}>
      <h2 className={`${styles.heading2} mb-6 mt-8`}>Profile</h2>
      <div className="sm:flex felx-col">
        <ul className="flex flex-wrap sm:flex-col">
          <li
            onClick={() => handleNavClick("account")}
            className={`${styles.linksStyle2} mx-1 ${
              activeSection === "account" ? "active-link" : ""
            } `}
          >
            Account
          </li>
            
          <li
            onClick={() => handleNavClick("plans")}
            className={`${styles.linksStyle2} mx-1 ${
              activeSection === "plans" ? "active-link" : ""
            } `}
          >
            Plans
          </li>
        </ul>

        <div className="flex-1 sm:ml-10 ml-3 max-w-[450px]">{content}</div>
      </div>
    </section>
  );
};

export default Profile;
