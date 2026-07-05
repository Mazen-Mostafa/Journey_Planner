import React from "react";

import { CircularProgress } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import SwiperCore from "swiper/core";
import { Navigation, Pagination } from "swiper/modules";

import PlanPlace from "../reusable/toDo/PlanPlace";
// Install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const SwiperPlan = ({ cityData }) => {
  function categorizePlaces(data) {
    if (!data || !data.places) return {};

    const categorizedPlaces = {};
    data.places.forEach((place) => {
      const category = place.category;
      if (!categorizedPlaces[category]) {
        categorizedPlaces[category] = [];
      }
      categorizedPlaces[category].push(place);
    });
    return categorizedPlaces;
  }

  const categorizedPlaces = categorizePlaces(cityData);

  return (
    <section className="py-8">
      {cityData ? (
        Object.entries(categorizedPlaces).map(([category, places]) => (
          <div key={category} className="mb-16">
            <h3 className="mb-4 text-2xl font-bold text-dark-green">
              {category}:
            </h3>
            <section className="suggested-cities">
              {places.map((place) => (
                <PlanPlace data={place} />
              ))}
            </section>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-64">
          <CircularProgress />
        </div>
      )}
    </section>
  );
};

export default SwiperPlan;
