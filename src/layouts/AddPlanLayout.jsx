import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";
import AddPlan from "../components/plans/AddPlan";
const AddPlanLayout = () => {
  window.scrollTo({ top: 0 });
  return (
    <section>
      <div className="min-h-[100vh] bg-main-color px-6 xs:px-24">
        <Header />
        <AddPlan />
      </div>
      <Footer />
    </section>
  );
};

export default AddPlanLayout;
