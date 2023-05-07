import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./lib/firebase";
import { Route, Routes, useLocation } from "react-router-dom";
import Paths from "./Routes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/global/Navbar";
import Sidebar from "./components/global/Sidebar";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // for handling sidebar navigation
  const [link, setLink] = useState(window.location.pathname);
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentAuth) => {
      if (currentAuth !== null) {
        dispatch(
          login({
            displayName: currentAuth.displayName,
            email: currentAuth.email,
            photoUrl: currentAuth.photoURL,
            userId: currentAuth.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return () => unsub();
  }, []);

  return (
    <>
      <div>
        <Toaster />
      </div>

      {user === null ? (
        location.pathname === "/register" ? (
          <Register />
        ) : (
          <Login />
        )
      ) : (
        <div className="flex">
          {/* Sidebar with nav links*/}
          {user && <Sidebar link={link} setLink={setLink} />}

          {/* Routing Logic */}
          <div className="flex-1">
            {user && <Navbar />}
            <Routes>
              {Paths.map(({ path, component: Component }, index) => {
                return (
                  <Route path={path} key={index} element={<Component />} />
                );
              })}
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
