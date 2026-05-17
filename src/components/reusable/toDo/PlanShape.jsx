import { Link } from "react-router-dom";
import ResolvedImage from "../ResolvedImage";
import { PLACEHOLDER_IMAGE } from "../../../constants/images";

const PlanShape = ({ data, img }) => {
  return (
    <Link
      to={`/plans/suggested-plans/${data.id}`}
      className="py-2 transition-[0.3s] text-dark-green font-bold w-fit text-[16px] hover:text-light-main-color"
    >
      <div className="city flex max-w-[400px] flex-col overflow-hidden  bg-[white] shadow-xl rounded-2xl">
        <div className="w-full overflow-hidden h-[230px]">
          <ResolvedImage
            src={img}
            fallback={PLACEHOLDER_IMAGE}
            className="w-full h-full object-cover"
            alt={data.city}
            loaderSize={100}
          />
        </div>
        <div className="flex items-center justify-between flex-1 p-3">
          <h4 className="p-0">{data.city}</h4>
          <p>{data.numberOfDays} Days</p>
        </div>
      </div>
    </Link>
  );
};

export default PlanShape;
