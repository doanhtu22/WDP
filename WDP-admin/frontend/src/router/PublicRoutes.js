import Login from "../pages/admin/Login";



const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "*", element: <Login /> },
];

export default publicRoutes;
