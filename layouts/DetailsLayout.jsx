import React from "react";
import PlaceDetails from "../components/placeDetails/PlaceDetails";
import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";

const DetailsLayout = () => {
  return (
    <section>
      <div className="min-h-[100vh] bg-main-color px-6 md:px-24">
        <Header />
        <PlaceDetails />
      </div>
      <Footer />
    </section>
  );
};

export default DetailsLayout;
