import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";
import PlanInputs from "../components/plans/PlanInputs";

const PlanInputsLayout = () => {
  return (
    <section>
      <div className="min-h-[100vh] bg-main-color px-6 sm:px-24">
        <Header />
        <PlanInputs />
      </div>
      <Footer />
    </section>
  );
};

export default PlanInputsLayout;
