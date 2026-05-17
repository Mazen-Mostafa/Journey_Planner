import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { getCityById } from "../../services/dataService";
import ResolvedImage from "../reusable/ResolvedImage";
import { PLACEHOLDER_IMAGE } from "../../constants/images";
import styles from "../../styles/styles";
import "./detail.css";

const PlaceDetails = () => {
  const { placeid } = useParams();
  window.scrollTo({ top: 0 });

  const detail = useMemo(() => getCityById(placeid), [placeid]);

  const locationUrl = detail
    ? `https://www.google.com/maps/@${detail.location.latitude},${detail.location.longitude},12z`
    : "";

  if (!detail) {
    return <p>City not found.</p>;
  }

  return (
    <section className="py-3 sm:py-8">
      <div>
        <div className="flex flex-col justify-between xl:flex-row">
          <div className="bgImg max-w-[600px] h-auto rounded-xl p-2 bg-light-green">
            <ResolvedImage
              src={detail.img}
              fallback={PLACEHOLDER_IMAGE}
              className="w-full h-full min-h-[200px] rounded-2xl object-cover"
              alt={detail.name}
            />
          </div>
          <div className="flex flex-col mt-10 lg:ml-14 xl:mt-0">
            <h2 className={`${styles.heading2} mb-16`}>{detail.name}</h2>
            <p className="text-dark-green w-auto lg:text-[22px] max-w-[800px] text-[18px]">
              {detail.description}
            </p>
            <a
              className="px-4 py-2 mt-5 w-fit bg-dark-green text-[white] text-[20px]"
              href={locationUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              See Location
            </a>
          </div>
        </div>

        <h2 className={`text-dark-green  text-[30px] mt-20 mb-16`}>
          Discover the top three places and activities in {detail.name}:
        </h2>

        {detail["places-description"] ? (
          <div className="gridLayout">
            {detail["places-description"].map((el, index) => (
              <div
                className="bg-[white] mb-5 text-center hover:-translate-y-2 transition-transform
                  flex flex-col items-center p-3 shadow-2xl"
                key={index}
              >
                <span
                  className="text-[white] rounded-full mt-5 mb-6 w-[70px] h-[70px] flex justify-center
                    items-center text-center text-[40px] font-bold bg-light-green"
                >
                  {index + 1}
                </span>
                <p className="text-light-green">{el}</p>
              </div>
            ))}
          </div>
        ) : null}
        <h3 className="text-[25px] mt-10 mb-6">
          What are you waiting for? create your plan in{" "}
          <span className="text-dark-green text-[28px]">{detail.name}</span>{" "}
          now!
        </h3>
        <Link
          to={`/plans/${placeid}/plan-places`}
          className="px-4 py-2 w-fit bg-dark-green text-[white] text-[20px] mt-6"
        >
          View Places
        </Link>
      </div>
    </section>
  );
};

export default PlaceDetails;
