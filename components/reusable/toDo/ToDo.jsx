import { useState } from "react";
import { PLACEHOLDER_IMAGE } from "../../../constants/images";

const ToDo = ({ data }) => {
  const [imgSrc, setImgSrc] = useState(data.img || PLACEHOLDER_IMAGE);

  return (
    <div className="flex flex-col min-w-[250px] overflow-hidden bg-[white] shadow-xl rounded-2xl">
      <div className="w-full overflow-hidden">
        <img
          className="w-full hover:scale-110 transition-all h-[300px] object-cover"
          src={imgSrc}
          alt={data.name}
          loading="lazy"
          onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
        />
      </div>

      <div className="p-4">
        <h3 className="mb-4 text-[20px] font-bold text-dark-green">
          {data.name}
        </h3>
        <p className="leading-7 text-light-green">{data.description}</p>
      </div>
    </div>
  );
};

export default ToDo;
