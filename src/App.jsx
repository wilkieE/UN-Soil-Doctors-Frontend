// src/App.js
import { useEffect, useState } from "react";
import "./App.css";
import useLanguageUpdate from "./hooks/useLanguageUpdate";
import { useTranslation } from "react-i18next";
import Login from "./components/Auth/Login";
import Sidebar from "./components/Common/Sidebar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import ChangePassword from "./components/Auth/ChangePassword";
import Pilots from "./screens/Pilots";
import Participants from "./screens/Participants";
import Kits from "./screens/Kits";
import Actors from "./screens/Actors";
import Settings from "./screens/Settings";
import Modal from "react-modal";
import jwtDecode from "jwt-decode";
import { setUser } from "./redux/slices/authSlice";
import { useDispatch } from "react-redux";
import Dashboard from "./screens/Dashboard";
import Users from "./screens/Users";
import PromoterDetails from "./screens/PromoterDetails";
import ImplementationActivities from "./screens/ImplementationActivities";
import FormAppIndex from "./FormAppComponents/FormAppIndex";
import { Link } from "react-router-dom";
import InterestedActors from "./screens/InterestedActors";
import Certificates from "./screens/Certificates";
import Budgets from "./screens/Budgets";

Modal.setAppElement("#root");

function App() {
  useLanguageUpdate();
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState({
    name: "John Doe",
    email: "john@gmail.com",
  });
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setCurrentUser({
        name: `${decodedToken.firstName} ${decodedToken.lastName}`,
        email: decodedToken.email,
      });
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    const decodedToken = jwtDecode(token);
    const user = {
      name: `${decodedToken.firstName} ${decodedToken.lastName}`,
      email: decodedToken.email,
    };
    setCurrentUser(user);
    dispatch(setUser(user));
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  return (
    <div className="h-screen w-screen">
      {isLoggedIn ? (
        <div className="flex h-full">
          <div className="sticky top-0 h-screen">
            <Sidebar user={currentUser} />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between px-5 py-3 border-b">
              <h1 className="text-3xl font-bold">{t("systemName")}</h1>
            </div>
            <div className="flex-grow p-16 rounded-lg overflow-y-auto">
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/pilots" element={<Pilots />} />
                <Route path="/participants" element={<Participants />} />
                <Route path="/kits" element={<Kits />} />
                <Route path="/budgets" element={<Budgets />} />
                <Route path="/actors" element={<Actors />} />
                <Route
                  path="/promoters/:promoterId"
                  element={<PromoterDetails />}
                />
                <Route path="/surveys" element={<InterestedActors />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/users" element={<Users />} />
                <Route
                  path="/implementation-plans"
                  element={<ImplementationActivities />}
                />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/forms/*" element={<FormAppIndex />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <>
          {location.pathname !== "/forms" && (
            <div className="h-full flex flex-col justify-center items-center">
              <Login onLogin={handleLogin} />
              <p className="text-lg text-gray-700 dark:text-gray-300 font-medium mt-6 mb-2">
                Interested in becoming a promoter?
              </p>
              <Link to="/forms">
                <button className="w-full text-white bg-gbBlack hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Sign up!
                </button>
              </Link>
            </div>
          )}
          <Routes>
            <Route path="/forms/*" element={<FormAppIndex />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
