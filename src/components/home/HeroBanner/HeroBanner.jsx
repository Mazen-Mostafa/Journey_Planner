import heroImg from "../../../assets/HeroBannerImg.jpg";
import styles from "../../../styles/styles";

const HeroBanner = () => {
  return (
    <section className=" py-3 sm:py-8 flex items-center justify-around mt-[10px]">
      <div className="mr-0 text-center md:text-left sm:mr-12">
        <h2 className="md:text-[50px] text-[30px] font-[650]">
          Discover Egypt's Great Palces{" "}
          <span className="text-light-green">&</span>
          <br /> Create Your Trip Plans.
        </h2>

        <div className="mt-[70px] p-5 rounded-3xl flex bg-[white]  sm:flex-row flex-col items-center justify-between">
          <p className="text-dark-green text-[24px]">
            Check Our Application now{" "}
          </p>
          <button className={`${styles.buttonStyle}  ml-3 bg-dark-green`}>
            DownLoad
          </button>
        </div>
      </div>

      <div className="w-[700px] lg:block hidden rounded-2xl overflow-hidden">
        <img src={heroImg} alt="heroImg" />
      </div>
    </section>
  );
};

export default HeroBanner;
