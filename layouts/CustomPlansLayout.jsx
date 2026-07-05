import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";
import CustomPlans from "../components/plans/CustomPlans";

const CustomPlansLayout = () => {
  return (
    <section>
      <div className="min-h-[100vh] bg-main-color px-6 sm:px-24">
        <Header />
        <CustomPlans />
      </div>
      <Footer />
    </section>
  );
};

export default CustomPlansLayout;
