import Header from "../components/common/header/Header";
import Login from "../components/signup/Login";

const LoginLayout = () => {
  return (
    <div className="bg-signUp overflow-hidden min-h-[100vh] px-6 md:px-24">
      <Header />
      <Login />
    </div>
  );
};

export default LoginLayout;
