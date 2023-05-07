import BookingPage from "./pages/BookingPage";
import Bookings from "./pages/Bookings";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Stations from "./pages/Stations";
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
    path: "/bookings",
    component: Bookings,
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
  {
    path: "/stations",
    component: Stations,
  },
];

export default routes;
