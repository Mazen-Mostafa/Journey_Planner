import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUpLayout from "../layouts/SignUpLayout";
import LoginLayout from "../layouts/LoginLayout";
import MainLayout from "../layouts/MainLayout";
import PlacesLayout from "../layouts/PlacesLayout";
import PlaceDetails from "../components/placeDetails/PlaceDetails";
import DetailsLayout from "../layouts/DetailsLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import { UserAuth } from "../context/AuthContext";
import PLansLayouts from "../layouts/PLansLayouts";
import CreatePlanLayout from "../layouts/CreatePlanLayout";
import AddPlanLayout from "../layouts/AddPlanLayout";
import CustomPlansLayout from "../layouts/CustomPlansLayout";
import SuggestedPlansLayout from "../layouts/SuggestedPlansLayout";
import GeneratedPlansLayout from "../layouts/GeneratedPlansLayout";
import PlanDesignLayout from "../layouts/PlanDesignLayout";

const UsersRoutes = () => {
  const { user } = UserAuth();
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
      path: "/plans/:placeid",
      element: <DetailsLayout />,
    },
    {
      path: "/profile",
      element: <ProfileLayout />,
    },
    {
      path: "/plans",
      element: <PLansLayouts />,
    },
    {
      path: "/plans/custom-plans",
      element: <CustomPlansLayout />,
    },
    {
      path: "/plans/suggested-plans",
      element: <SuggestedPlansLayout />,
    },
    {
      path: "/plans/suggested-plans/:planDesId",
      element: <PlanDesignLayout />,
    },
    {
      path: "/plans/generated-plans",
      element: <GeneratedPlansLayout />,
    },
    {
      path: "/plans/:placeid/plan-places",
      element: <CreatePlanLayout />,
    },
    {
      path: "/plans/:placeid/plan-places/:planid",
      element: <AddPlanLayout />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default UsersRoutes;
