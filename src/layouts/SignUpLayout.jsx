import Header from "../components/common/header/Header";
import Signup from "../components/signup/Signup";
const SignUpLayout = () => {
  return (
    <div className="bg-signUp overflow-hidden min-h-[100vh] px-6 md:px-24">
      <Header />
      <Signup />
    </div>
  );
};

export default SignUpLayout;
