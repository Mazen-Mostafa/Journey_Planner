import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useResolvedImages } from "../../../hooks/useResolvedImage";
import { PLACEHOLDER_IMAGE } from "../../../constants/images";
import ResolvedImage from "../ResolvedImage";

const PlaceImgs = ({ data, fallback = PLACEHOLDER_IMAGE }) => {
  const imageUrls = useResolvedImages(data, fallback);

  if (!imageUrls.length) {
    return (
      <ResolvedImage
        src={fallback}
        fallback={fallback}
        className="w-full max-h-[550px] object-cover rounded-lg"
        alt="Place"
      />
    );
  }

  if (imageUrls.length === 1) {
    return (
      <ResolvedImage
        src={imageUrls[0]}
        fallback={fallback}
        className="w-full max-h-[550px] object-cover rounded-lg"
        alt="Place"
      />
    );
  }

  return (
    <section>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper max-w-[800px] max-h-[550px] select-none"
      >
        {imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <ResolvedImage
              src={url}
              fallback={fallback}
              className="w-full select-none object-cover"
              alt={`Image ${index + 1}`}
              loaderSize={60}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PlaceImgs;
