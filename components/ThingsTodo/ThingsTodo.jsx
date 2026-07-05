import React from "react";
import { useState } from "react";
import ToDo from "../reusable/toDo/ToDo";
import { getTodoItems } from "../../services/dataService";

import { CircularProgress } from "@mui/material";
import "./ThingsStyles.css";
import styles from "../../styles/styles";
const ThingsTodo = () => {
  const [activities] = useState(() => getTodoItems());

  return (
    <section className="py-3 mt-16 sm:py-8">
      <h3 className={`${styles.heading2} mb-10`}>Things To Do In Egypt</h3>
      <p className="text-[20px] mb-4">
        Here is some of the places, activities, experiences that you can
        discover through your journey.
      </p>

      <div className="layout">
        {activities ? (
          activities.map((el) => {
            return <ToDo data={el} key={el.name} />;
          })
        ) : (
          <CircularProgress sx={{ color: "#869a90" }} size={"60px"} />
        )}
      </div>
    </section>
  );
};

export default ThingsTodo;
