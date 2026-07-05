import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getFirestore,
} from "firebase/firestore";
import { db } from "../../firebase/fire"; // Adjust the import path to your Firebase config
import { auth } from "../../firebase/fire"; // Adjust the import path to your Firebase config

const PlanDesign2 = ({ data }) => {
  const [plan, setPlan] = useState(null);
  const [planExists, setPlanExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const { planDesId } = useParams();

  useEffect(() => {
    const fetchPlanAndCheckExistence = async () => {
      if (!planDesId) return;
      setLoading(true);

      try {
        const planRef = doc(db, "TravelPlans", planDesId);
        const planSnap = await getDoc(planRef);

        if (planSnap.exists()) {
          const fetchedPlan = { id: planSnap.id, ...planSnap.data() };
          setPlan(fetchedPlan);

          const user = auth.currentUser;
          if (!user) {
            console.log("No user signed in.");
            setLoading(false);
            return;
          }

          const userId = user.uid;
          const userPlanRef = doc(
            db,
            "UserPlans",
            userId,
            "MyPlans",
            planDesId
          );
          const userPlanSnap = await getDoc(userPlanRef);

          if (userPlanSnap.exists()) {
            setPlanExists(true);
          } else {
            setPlanExists(false);
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanAndCheckExistence();
  }, [planDesId]);

  const addPlanToUser = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("No user signed in.");
        return;
      }

      const userId = user.uid;
      const userDocRef = doc(db, "UserPlans", userId);
      const myPlansRef = collection(userDocRef, "MyPlans");

      if (plan) {
        const newPlan = {
          ...plan,
          addedAt: new Date(),
          addedBy: userId,
        };
        await setDoc(doc(myPlansRef, planDesId), newPlan);
        setPlanExists(true); // Update state to reflect the plan has been added
        console.log("Plan added to MyPlans collection.");
      } else {
        console.error("No plan data to add.");
      }
    } catch (error) {
      console.error("Error adding plan:", error);
    }
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
                  {day.places.map((place, index) => (
                    <Link key={index} to={""}>
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

export default PlanDesign2;
