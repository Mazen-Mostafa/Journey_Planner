import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";
import PlanDesign from "../components/plans/PlanDesign";

const PlanDesignLayout = () => {
  return (
    <section>
      <div className="min-h-[100vh] bg-main-color px-6 sm:px-24">
        <Header />
        <PlanDesign />
      </div>
      <Footer />
    </section>
  );
};

export default PlanDesignLayout;
