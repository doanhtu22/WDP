import DashboardPage from "../pages/admin/DashboardPage";
import UserManagement from "../pages/admin/UserManagement";
import TourManagement from "../pages/admin/TourManagement";
import BookingManagement from "../pages/admin/BookingManagement";
import ProtectedRoute from './ProtectedRoute';
import CreateTour from "../pages/admin/CreateTour";
import UpdateTour from "../pages/admin/UpdateTour";

export const adminRoutes = [
  { path: "dashboard", element: <ProtectedRoute element={<DashboardPage />} requiredRole="admin" />, title: "Dashboard" },
  { path: "user-management", element: <ProtectedRoute element={<UserManagement />} requiredRole="admin" />, title: "User List" },
  { path: "tour-management", element: <ProtectedRoute element={<TourManagement />} requiredRole="admin" />, title: "Tour List" },
  { path: "booking-management", element: <ProtectedRoute element={<BookingManagement />} requiredRole="admin" />, title: "Booking List" },
  { path: "create-tour", element: <ProtectedRoute element={<CreateTour/>} requiredRole="admin" />, title: "Create Tour" },
  { path: "update-tour/:id", element: <ProtectedRoute element={<UpdateTour/>} requiredRole="admin" />, title: "Update Tour" },
  { path: "*", element: <ProtectedRoute element={<DashboardPage />} requiredRole="admin" /> },
];
