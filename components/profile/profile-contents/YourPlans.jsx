import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteUserPlan,
  getUserPlans,
} from "../../../services/dataService";

const YourPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPlans(getUserPlans());
    setLoading(false);
  }, []);

  const deletePlanFromUser = (planId) => {
    setPlans(deleteUserPlan(planId));
  };

  if (loading) {
    return <div>Loading plans...</div>;
  }

  return plans.length > 0 ? (
    <div>
      {plans.map((plan, index) => (
        <div
          key={plan.id}
          className="bg-[white] p-4 rounded-2xl mb-2 flex items-center justify-between transition-all hover:border-l-8 border-l-dark-green"
        >
          <p>
            <Link to={`/plans/suggested-plans/${plan.id}`}>
              Plan {index + 1} in{" "}
              <span className="font-bold text-light-green">{plan.city}</span>
            </Link>
          </p>
          <button
            onClick={() => deletePlanFromUser(plan.id)}
            className="px-3 py-1 rounded-3xl bg-light-green"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  ) : (
    <div>You Have No Plans</div>
  );
};

export default YourPlans;
