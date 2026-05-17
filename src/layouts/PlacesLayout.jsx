import Header from "../components/common/header/Header";

import Places from "../components/places/Places";
import Footer from "../components/common/footer/Footer";

const PlacesLayout = () => {
  return (
    <section>
      <div className="min-h-[100vh] bg-main-color px-6 md:px-24">
        <Header />
        <Places />
      </div>
      <Footer />
    </section>
  );
};

export default PlacesLayout;
