import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Account from "../components/profile/profile-contents/Account";
import ProMembership from "../components/profile/profile-contents/ProMembership";
import YourPlans from "../components/profile/profile-contents/YourPlans";

const ProfileRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
    },
    {
      path: "/signup",
      element: <SignUpLayout />,
    },
    {
      path: "/login",
      element: <LoginLayout />,
    },
    {
      path: "/places",
      element: <PlacesLayout />,
    },
    {
      path: "/places/:placeid",
      element: <DetailsLayout />,
    },
    {
      path: "/profile",
      element: <ProfileLayout />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default ProfileRouter;
