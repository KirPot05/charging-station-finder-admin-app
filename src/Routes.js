import BookingForm from "./pages/BookingForm";
import BookingPage from "./pages/BookingPage";
import Bookings from "./pages/Bookings";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import VehicleAddPage from "./pages/VehicleAddPage";
import VehiclePage from "./pages/VehiclePage";
import Vehicles from "./pages/Vehicles";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },

  {
    path: "/register",
    component: Register,
  },
  {
    path: "/bookings",
    component: Bookings,
  },
  {
    path: "/bookings/new",
    component: BookingForm,
  },
  {
    path: "/bookings/:id",
    component: BookingPage,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/vehicles",
    component: Vehicles,
  },
  {
    path: "/vehicles/new",
    component: VehicleAddPage,
  },
  {
    path: "/vehicles/:id",
    component: VehiclePage,
  },
];

export default routes;
