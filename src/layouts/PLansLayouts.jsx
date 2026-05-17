import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";
import Plans from "../components/plans/Plans";
const PLansLayouts = () => {
  window.scrollTo({ top: 0 });
  return (
    <section>
      <div className="min-h-[100vh] bg-main-color px-6 xs:px-24">
        <Header />
        <Plans />
      </div>
      <Footer />
    </section>
  );
};

export default PLansLayouts;
