import { useState } from "react";

import SugCity from "../reusable/toDo/SugCity";
import { getAllCities } from "../../services/dataService";

import styles from "../../styles/styles";
import "./PlacesStyles.css";
import { Pagination, CircularProgress } from "@mui/material";

const Places = () => {
  const [cities] = useState(() => getAllCities());

  //pagination part
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;
  const totalPages = cities && Math.ceil(cities.length / itemsPerPage);

  const lastIndexofCities = currentPage * itemsPerPage;
  const firstIndexofCities = lastIndexofCities - itemsPerPage;

  const dataPerPage =
    cities && cities.slice(firstIndexofCities, lastIndexofCities);
  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 900, behavior: "smooth" });
  };

  return (
    <section className="py-3 mt-16 sm:py-8">
      <h3 className={`${styles.heading2} mb-10`}>Popular Cities In Egypt</h3>
      <p className="text-[20px] mb-4">
        Learn about Egypt's great cities and get to know their culture, customs,
        best places.
      </p>
      {cities ? (
        <section>
          <div className="layout">
            {dataPerPage.map((city) => {
              return <SugCity data={city} key={city.id} />;
            })}
          </div>
          <div className="flex justify-center p-5 mt-10">
            <Pagination
              color="standard"
              shape="rounded"
              defaultPage={1}
              count={totalPages}
              page={currentPage}
              size="large"
              onChange={paginate}
            />
          </div>
        </section>
      ) : (
        <CircularProgress sx={{ color: "#869a90" }} size={"60px"} />
      )}
    </section>
  );
};

export default Places;
