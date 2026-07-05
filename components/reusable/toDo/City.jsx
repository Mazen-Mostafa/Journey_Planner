import { Link } from "react-router-dom";

const City = ({ data }) => {
  return (
    <div className="city flex flex-col overflow-hidden bg-[white] shadow-xl rounded-2xl">
      <div className="w-full overflow-hidden">
        <img
          className="w-full h-[300px]"
          src={data.img}
          alt="cityImg"
          loading="lazy"
        />
      </div>
      <div className="flex-1 p-4">
        <h3 className="mb-4 text-[20px] font-bold text-dark-green">
          {data.name}
        </h3>
        <p className="leading-7 text-light-green">{data.description}</p>
      </div>

      <Link
        to={`/places/${data.id}`}
        className="p-4 transition-[0.3s] w-fit mb-3 text-[18px] hover:text-light-main-color"
      >
        <h4>Learn More &#62;&#62;</h4>
      </Link>
    </div>
  );
};

export default City;
