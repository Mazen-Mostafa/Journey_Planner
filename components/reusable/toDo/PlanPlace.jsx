import { Link, useParams } from "react-router-dom";
import ResolvedImage from "../ResolvedImage";
import { PLACEHOLDER_IMAGE } from "../../../constants/images";

const PlanPlace = ({ data }) => {
  const { placeid } = useParams();

  return (
    <div className="city flex flex-col overflow-hidden max-w-[340px] bg-[white] shadow-xl rounded-2xl">
      <div className="w-full overflow-hidden">
        <ResolvedImage
          src={data.image}
          fallback={PLACEHOLDER_IMAGE}
          className="w-full h-[230px] object-cover"
          alt={data.name}
          loaderSize={80}
        />
      </div>
      <div className="flex items-center justify-between flex-1 px-3">
        <Link
          to={`/plans/${placeid}/plan-places/${data.id}`}
          className="py-2 transition-[0.3s] text-dark-green font-bold w-fit text-[16px] hover:text-light-main-color"
        >
          <h4 className="p-0">{data.name}</h4>
        </Link>
      </div>
    </div>
  );
};

export default PlanPlace;
