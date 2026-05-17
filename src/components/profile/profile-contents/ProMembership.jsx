import React from "react";
import styles from "../../../styles/styles";

const ProMembership = () => {
  return (
    <div id="helloMessage">
      <h3 className="text-[24px] text-dark-green font-bold mb-3">
        Pro membership
      </h3>
      <p className="text-[18px] mb-5">
        Journy Planner Pro gives you access to all of our premium featuresto
        fully maximize your travel planning.
      </p>
      <ol className="names-list">
        <li className="text-[22px]">
          <span className="text-light-green">➔</span> Unlimited plans
        </li>
        <li className="text-[22px]">
          <span className="text-light-green">➔</span> Customize your plans
        </li>
        <li className="text-[22px]">
          <span className="text-light-green">➔</span> No ads
        </li>
      </ol>
      <div className="flex items-center mt-6">
        <button className={`${styles.buttonStyle} bg-dark-green mr-5`}>
          Start Pro
        </button>
        <button className={`${styles.buttonStyle} bg-light-green`}>
          Learn more
        </button>
      </div>
    </div>
  );
};

export default ProMembership;
