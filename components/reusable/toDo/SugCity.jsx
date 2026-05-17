import { Link } from "react-router-dom";
import ResolvedImage from "../ResolvedImage";
import { PLACEHOLDER_IMAGE } from "../../../constants/images";

const SugCity = ({ data }) => {
  return (
    <div className="city flex flex-col overflow-hidden bg-[white] shadow-xl rounded-2xl">
      <div className="w-full overflow-hidden">
        <ResolvedImage
          src={data.img}
          fallback={PLACEHOLDER_IMAGE}
          className="w-full h-[300px] object-cover"
          alt={data.name}
          loaderSize={80}
        />
      </div>
      <div className="flex items-center justify-between flex-1 px-3">
        <h3 className=" text-[20px] font-bold text-dark-green">{data.name}</h3>
        <Link
          to={`/plans/${data.id}`}
          className="p-3 transition-[0.3s] w-fit text-[18px] hover:text-light-main-color"
        >
          <h4 className="p-0">View Places &#62;&#62;</h4>
        </Link>
      </div>
    </div>
  );
};

export default SugCity;
