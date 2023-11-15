// src/components/Sidebar/Sidebar.js
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LogoutButton from "../Auth/LogoutButton";
import GBLogo from "../../assets/FAO_logo.svg";

const navLinkClass =
  "flex items-center p-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group";

const links = [
  { path: "/dashboard", name: "Dashboard" },
  { path: "/implementation-plans", name: "Implementation Plans" },
  // { path: "/pilots", name: "Pilots" },
  { path: "/participants", name: "Participants" },
  { path: "/kits", name: "Kits" },
  { path: "/actors", name: "Actors" },
  { path: "/surveys", name: "Interested Actors" },
  { path: "/users", name: "Users" },
  { path: "/certificates", name: "Certificates" },
  { path: "/budgets", name: "Budgets" },
];

const Sidebar = ({ user, onLogout }) => {
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  return (
    <aside id="separator-sidebar" className="h-screen w-64 sticky top-0">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <div className="flex justify-center mb-4">
          <img src={GBLogo} alt="Logo" className="w-32 h-32" />
        </div>

        <ul className="font-medium space-y-2">
          <p className="mb-2 px-1 text-gray-500 text-left text-sm">Menu</p>
          {links.map((link) => (
            <NavLink to={link.path} className={navLinkClass} key={link.path}>
              <span>{link.name}</span>
            </NavLink>
          ))}
        </ul>

        <div className="mt-8">
          <div className="mb-4 px-1 space-y-2 text-left text-sm">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <LogoutButton onLogout={handleLogout} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
