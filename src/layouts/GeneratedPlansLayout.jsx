import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";
import GeneratedPlans from "../components/plans/GeneratedPlans";

const GeneratedPlansLayout = () => {
  return (
    <section>
      <div className="min-h-[100vh] bg-main-color px-6 sm:px-24">
        <Header />
        <GeneratedPlans />
      </div>
      <Footer />
    </section>
  );
};

export default GeneratedPlansLayout;
