import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getPlanById,
  saveUserPlan,
  userHasPlan,
} from "../../services/dataService";

const PlanDesign = () => {
  window.scrollTo({ top: 0 });
  const [plan, setPlan] = useState(null);
  const [planExists, setPlanExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const { planDesId } = useParams();

  useEffect(() => {
    if (!planDesId) return;

    const fetchedPlan = getPlanById(planDesId);
    setPlan(fetchedPlan);
    setPlanExists(userHasPlan(planDesId));
    setLoading(false);
  }, [planDesId]);

  const addPlanToUser = () => {
    if (!plan) return;

    saveUserPlan({
      ...plan,
      addedAt: new Date().toISOString(),
    });
    setPlanExists(true);
  };

  return (
    <div>
      <section className="flex justify-center">
        {loading ? (
          <CircularProgress />
        ) : plan ? (
          <div className="flex flex-wrap justify-between gap-5">
            {plan.travelDays.map((day, index) => (
              <div
                key={index}
                className="flex flex-col w-[300px] items-center bg-[white] p-5 shadow-xl rounded-2xl"
              >
                <h3 className="text-[22px]">{day.dayName}</h3>
                <div className="justify-between">
                  {day.places.map((place, placeIndex) => (
                    <Link key={placeIndex} to="">
                      <p className="p-4 mb-3 text-center rounded-3xl font-bold text-[white] bg-light-green">
                        {place}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No plan data available.</p>
        )}
      </section>
      <div className="flex justify-center my-10">
        {planExists ? (
          <p className="text-[20px] text-red-500">This is one of your plans.</p>
        ) : (
          <button
            onClick={addPlanToUser}
            className="px-4 py-2 mt-5 w-fit bg-dark-green transition-all hover:bg-light-green text-[white] text-[20px]"
          >
            Add To my Plans
          </button>
        )}
      </div>
    </div>
  );
};

export default PlanDesign;
