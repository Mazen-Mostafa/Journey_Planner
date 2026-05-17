import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { getCityById } from "../../services/dataService";

import PlaceImgs from "../reusable/toDo/PlaceImgs";

const AddPlan = () => {
  const { planid, placeid } = useParams();

  window.scrollTo({ top: 0 });

  const city = useMemo(() => getCityById(placeid), [placeid]);

  const place = useMemo(() => {
    if (!city?.places) return null;
    return city.places.find((entry) => entry.id === parseInt(planid, 10)) ?? null;
  }, [city, planid]);

  if (!place) {
    return <h1>Place not found !</h1>;
  }

  const locationUrl = `https://www.google.com/maps/@${place.location.latitude},${place.location.longitude},16z`;
  const tdUrl = place["3D-Image"] || place["TD-Image"] || "";

  return (
    <section className="">
      <h2 className="text-[35px] font-bold">{place.name}</h2>
      <p className="text-[18px] mb-9 text-dark-green">{place.description}</p>

      <div>
        <h4 className="text-[25px] font-bold mb-4 text-dark-green">
          Images Of {place.name}
        </h4>
        <PlaceImgs data={place["collection-images"]} fallback={city?.img} />
      </div>

      <div>
        <h4 className="text-[25px] font-bold mb-2 mt-20 text-dark-green">
          Check {place.name} location and 3D-model
        </h4>
      </div>
      <div className="flex items-center">
        <a
          className="px-4 py-2   mr-5 w-fit bg-dark-green text-[white] text-[20px]"
          href={locationUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          See Location
        </a>

        {tdUrl ? (
          <a
            className="px-4 py-2 w-fit bg-second-color text-[white] text-[20px]"
            href={tdUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            3D-Model
          </a>
        ) : (
          <span className="px-4 py-2  w-fit  bg-light-green text-[white] text-[20px]">
            3D model is not available
          </span>
        )}
      </div>
      <div className="">
        <h4 className="text-[25px] font-bold  mt-10 text-dark-green">
          Main information Of {place.name}
        </h4>
      </div>

      <div className="pb-10 contacts">
        <p className="text-[18px] m-2">
          Work Days: <br /> From:{" "}
          <span className="font-bold text-light-green">
            {place["work-days"].from}
          </span>{" "}
          - To:
          <span className="font-bold text-light-green">
            {" "}
            {place["work-days"].to}
          </span>
        </p>
        <p className="text-[18px] m-2">
          Work Times: <br /> From:{" "}
          <span className="font-bold text-light-green">
            {place["work-times"].from}
          </span>{" "}
          - To:
          <span className="font-bold text-light-green">
            {" "}
            {place["work-times"].to}
          </span>
        </p>
        <p className="text-[18px] m-2 ">
          Ticket Price: <br /> From:{" "}
          <span className="font-bold text-light-green">
            {place["ticket-price"].from}
          </span>{" "}
          - To:
          <span className="font-bold text-light-green">
            {" "}
            {place["ticket-price"].to}
          </span>
        </p>
        <p className="text-[18px] m-2">
          Contact Number: <br />{" "}
          <span className="font-bold text-light-green">
            {place["contect-us"] || place["contact-us"] || "No Number"}
          </span>
        </p>
      </div>
    </section>
  );
};

export default AddPlan;
