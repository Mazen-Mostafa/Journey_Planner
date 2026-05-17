import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";
import CreatePlan from "../components/plans/CreatePlan";

const CreatePlanLayout = () => {
  window.scrollTo({ top: 0 });
  return (
    <section>
      <div className="min-h-[100vh] bg-main-color px-6 sm:px-24">
        <Header />
        <CreatePlan />
      </div>
      <Footer />
    </section>
  );
};

export default CreatePlanLayout;
