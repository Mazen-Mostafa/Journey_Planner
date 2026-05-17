import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import { getAllCities } from "../../services/dataService";

const PlanInputs = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [nameAndDays, setNameAndDays] = useState({
    name: "",
    days: 0,
  });

  const [data, setData] = useState(null);
  const [plans, setPlans] = useState([]);

  const { placeid } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setData(getAllCities());

    const storedName = window.sessionStorage.getItem("name") || "";
    const storedDays = parseInt(window.sessionStorage.getItem("days"), 10) || 0;
    const storedDate = window.sessionStorage.getItem("date");
    setNameAndDays({
      name: storedName,
      days: storedDays,
    });
    if (storedDate) {
      const parsedDate = new Date(storedDate);
      if (!isNaN(parsedDate.getTime())) {
        setStartDate(parsedDate);
      } else {
        console.error("Invalid date format in session storage");
      }
    }
  }, []);

  function handleNameAndDays(e) {
    setNameAndDays((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (nameAndDays.name) {
      const planData = {
        name: nameAndDays.name,
        date: startDate.toISOString(),
        days: nameAndDays.days,
        link: `/plans/${placeid}/create-plan/plan-places`,
      };
      setPlans((prev) => [...prev, planData]);
      window.sessionStorage.setItem("name", nameAndDays.name);
      window.sessionStorage.setItem("days", String(nameAndDays.days));
      window.sessionStorage.setItem("date", startDate.toISOString());
    }
  }

  return (
    <section>
      <form>
        <section className="flex flex-col max-w-[500px] gap-6 mx-auto">
          <div className="flex flex-col mb-2">
            <label className="font-bold text-[grey]" htmlFor="name">
              Plan Name
            </label>
            <input
              id="name"
              className={`${styles.inputStyle}`}
              type="text"
              name="name"
              placeholder="Type Your Plan Name"
              maxLength="156"
              value={nameAndDays.name}
              onChange={handleNameAndDays}
              required
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="font-bold text-[grey]" htmlFor="startDate">
              Pick Your Start Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MMMM d, yyyy"
              className={`${styles.inputStyle} w-full`}
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="font-bold text-[grey]" htmlFor="days">
              Duration of the plan
            </label>
            <select
              id="days"
              className={`${styles.inputStyle}`}
              name="days"
              value={nameAndDays.days}
              onChange={handleNameAndDays}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </div>
        </section>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleCreate}
            className="px-4 py-2 mt-5 w-fit bg-dark-green transition-all hover:bg-light-green text-[white] text-[20px]"
          >
            Create Your Plan
          </button>
        </div>
      </form>
      <section>
        <h2 className="text-[35px] font-bold">Your Plans</h2>
        {plans.length > 0 ? (
          <ul>
            {plans.map((plan, index) => (
              <li key={index}>
                <p>Name: {plan.name}</p>
                <p>Date: {new Date(plan.date).toLocaleDateString()}</p>
                <p>Days: {plan.days}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No plans created yet.</p>
        )}
      </section>
    </section>
  );
};

export default PlanInputs;
