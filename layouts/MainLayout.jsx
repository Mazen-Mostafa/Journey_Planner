import HeroBanner from "../components/home/HeroBanner/HeroBanner";
import Header from "../components/common/header/Header";
import ThingsTodo from "../components/ThingsTodo/ThingsTodo";

import Footer from "../components/common/footer/Footer";

const MainLayout = () => {
  return (
    <section>
      <div className="min-h-[100vh] bg-main-color px-6 md:px-24">
        <Header />
        <HeroBanner />
        <ThingsTodo />
      </div>
      <Footer />
    </section>
  );
};

export default MainLayout;
