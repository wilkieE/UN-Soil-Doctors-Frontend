import React from "react";
import { persistor } from "../../redux/store.js";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    persistor.purge();
    navigate("/");
    window.location.reload();
  };

  return (
    <button
      className="w-full bg-black text-white py-3 px-4"
      onClick={handleLogout}
    >
      <ExitToAppIcon className="mr-2" />
      Log out
    </button>
  );
};

export default LogoutButton;
