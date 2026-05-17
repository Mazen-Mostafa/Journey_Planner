import { Navigate } from "react-router-dom";
import Header from "../components/common/header/Header";
import Profile from "../components/profile/Profile";
import Footer from "../components/common/footer/Footer";
import { UserAuth } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";

const ProfileLayout = () => {
  const { isLoggedOut, loading } = UserAuth();

  if (loading) {
    return (
      <div className="min-h-[100vh] bg-main-color flex items-center justify-center">
        <CircularProgress sx={{ color: "#869a90" }} />
      </div>
    );
  }

  if (isLoggedOut) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section>
      <div className="min-h-[100vh] bg-main-color px-6 md:px-24">
        <Header />
        <Profile />
      </div>
      <Footer />
    </section>
  );
};

export default ProfileLayout;
