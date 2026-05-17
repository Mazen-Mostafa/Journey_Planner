import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { getCityById } from "../../services/dataService";

import SwiperPlan from "./SwiperPlan";

const CreatePlan = () => {
  const { placeid } = useParams();
  const cityData = useMemo(() => getCityById(placeid), [placeid]);

  return (
    <section className="py-3 sm:py-8">
      <h2 className={`${styles.heading2} mb-10`}>
        Create a plan in {cityData?.name}
      </h2>
      <h3 className="text-[35px] text-light-green mt-16">
        Discover places based on categories you want and add it to your plan!
      </h3>
      <SwiperPlan cityData={cityData} />
    </section>
  );
};

export default CreatePlan;
