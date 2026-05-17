import React from "react";
import { useState, useEffect } from "react";

import SugCity from "../reusable/toDo/SugCity";

import { CircularProgress } from "@mui/material";
import styles from "../../styles/styles";
import "./plansStyles.css";
import Places from "../places/Places";

import { Link } from "react-router-dom";

const Plans = () => {
  return (
    <section className="py-3 mt-16 sm:py-8">
      <h3 className={`${styles.heading2} mb-10`}>Plans</h3>

      <p className="text-[20px] mb-4">
        Now there’s two ways to plan your Journey by choosing from suggested
        plans or create your own. Either way, you’ve got more than 200 place to
        discover, with descriptions, information and opinions to guide you.
      </p>
      <div className="p-5 w-fit border-[3px] border-solid border-light-green rounded-md">
        <h3 className="text-[25px] text-dark-green font-bold">
          How to create a plan? It's simple!
        </h3>
        <ol type="1" className="px-5 mt-2 list-disc ">
          <li>Choose The city.</li>
          <li>Select how many days you planning to stay in this city.</li>
          <li>Select the places you are interested to visit!.</li>
        </ol>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-6 mt-10">
        <Link
          to="/plans/suggested-plans"
          className="bg-[white] text-center p-4 max-w-[600px] min-h-[150px] rounded-lg transition-all hover:-translate-y-1 hover shadow-lg"
        >
          <h4 className="text-[22px] font-bold text-dark-green">
            Suggested Plans
          </h4>
          <p className="text-light-green">
            You pick on of our plans that we suggested for you based on what you
            like.
          </p>
        </Link>
        <Link
          to="/plans/generated-plans"
          className="bg-[white] text-center p-4 max-w-[600px] min-h-[150px] rounded-lg transition-all hover:-translate-y-1 hover shadow-lg"
        >
          <h4 className="text-[22px] font-bold text-dark-green">
            Generated Plans
          </h4>
          <p className="text-light-green">
            Generate plans in the city based on what you select like number of
            days, categories and city.
          </p>
        </Link>
      </div>
    </section>
  );
};

export default Plans;
