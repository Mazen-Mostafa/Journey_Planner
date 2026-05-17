import { useState } from "react";
import styles from "../../styles/styles";
import PlanShape from "../reusable/toDo/PlanShape";
import CategorySelect from "./CategorySelect";
import {
  filterTravelPlans,
  getAllCities,
  getCityImage,
} from "../../services/dataService";

const SuggestedPlans = () => {
  const [numDays, setNumDays] = useState("");
  const [categories, setCategories] = useState([]);
  const [city, setCity] = useState("");
  const [plans, setPlans] = useState([]);
  const cities = getAllCities();

  const categoriesOptions = [
    {
      name: "Recreational and Environmental",
      id: "recreational and environmental",
    },
    { name: "Religious", id: "religious" },
    { name: "Cultural and Historical", id: "cultural and historical" },
    { name: "Coastal", id: "coastal" },
  ];

  const handleFilter = (event) => {
    event.preventDefault();
    const filteredPlans = filterTravelPlans({ numDays, categories, city });
    setPlans(filteredPlans);
  };

  return (
    <div>
      <h2 className={`${styles.heading2} my-6`}>Filter our suggested plans</h2>
      <form onSubmit={handleFilter}>
        <section className="flex flex-col max-w-[500px] gap-6 mx-auto">
          <div className="flex flex-col mb-2">
            <label className="font-bold text-[grey]" htmlFor="days">
              Duration of the plan
            </label>
            <select
              id="days"
              className={`${styles.inputStyle}`}
              name="days"
              value={numDays}
              onChange={(e) => setNumDays(e.target.value)}
            >
              <option value="">Select duration</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </div>
          <div className="flex flex-col mb-2">
            <label className="font-bold text-[grey]" htmlFor="categories">
              Categories
            </label>
            <CategorySelect
              options={categoriesOptions}
              selected={categories}
              onChange={setCategories}
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="font-bold text-[grey]" htmlFor="city">
              City
            </label>
            <select
              id="city"
              className={`${styles.inputStyle}`}
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Select city</option>
              {cities.map((entry) => (
                <option key={entry.id} value={entry.name}>
                  {entry.name}
                </option>
              ))}
            </select>
          </div>
        </section>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="px-4 py-2 mt-5 w-fit bg-dark-green transition-all
              hover:bg-light-green text-[white] text-[20px]"
          >
            Filter Plans
          </button>
        </div>
      </form>

      <h3 className="text-[28px] mt-5">Filtered Plans:</h3>
      {plans.length > 0 ? (
        <section className="suggested-cities">
          {plans.map((plan) => (
            <PlanShape
              data={plan}
              key={plan.id}
              img={getCityImage(plan.city)}
            />
          ))}
        </section>
      ) : (
        <p>No plans found try to filter.</p>
      )}
    </div>
  );
};

export default SuggestedPlans;
