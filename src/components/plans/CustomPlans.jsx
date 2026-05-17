import React from "react";
import { useState } from "react";

import SugCity from "../reusable/toDo/SugCity";
import { getAllCities } from "../../services/dataService";

import { CircularProgress } from "@mui/material";
import "./plansStyles.css";
import Places from "../places/Places";

const CustomPlans = () => {
  const [plansData] = useState(() => {
    const allCities = getAllCities();
    return [allCities[1], allCities[4], allCities[0]].filter(Boolean);
  });

  return (
    <section>
      {" "}
      <h4 className="text-[26px] mt-10 mb-5">
        Check the most famous citeies:{" "}
      </h4>
      {plansData ? (
        <section>
          <div className="suggested-cities ">
            {plansData.map((city) => {
              return <SugCity data={city} key={city.id} />;
            })}
          </div>
          <Places />
        </section>
      ) : (
        <CircularProgress sx={{ color: "#869a90" }} size={"60px"} />
      )}
    </section>
  );
};

export default CustomPlans;
