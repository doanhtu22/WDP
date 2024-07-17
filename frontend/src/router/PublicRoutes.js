import AboutPage from "../pages/AboutPage";
import CopyrightPage from "../pages/CopyrightPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchResultList from "../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import TourDetails from "../pages/TourDetails";
import ResetPassword from "../pages/ForgetPassWord";
import Tours from "../pages/Tours";

const publicRoutes = [
  { path: "/home", element: <Home /> },
  { path: "/tours", element: <Tours /> },
  { path: "/tours/:id", element: <TourDetails /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/thank-you", element: <ThankYou /> },
  { path: "/tours/search", element: <SearchResultList /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/copyright", element: <CopyrightPage /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "*", element: <Home /> },
];

export default publicRoutes;
