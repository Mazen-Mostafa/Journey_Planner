import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";
import SuggestedPlans from "../components/plans/SuggestedPlans";

const SuggestedPlansLayout = () => {
  return (
    <section>
      <div className="min-h-[100vh] bg-main-color px-6 sm:px-24">
        <Header />
        <SuggestedPlans />
      </div>
      <Footer />
    </section>
  );
};

export default SuggestedPlansLayout;
