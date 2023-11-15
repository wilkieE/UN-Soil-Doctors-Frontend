import React, { useState } from "react";
import FormField from "../Common/FormField";
import GBLogo from "../../assets/FAO_logo.svg";
import apiRequest from "../../utils/api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await apiRequest("api/auth/login", "POST", {
        email,
        password,
      });

      if (data.token) {
        onLogin(data.token);
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      if (err.response && err.response.status) {
        setError(`HTTP error! status: ${err.response.status}`);
      } else {
        setError(err.message || "An error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <img src={GBLogo} alt="Logo" className="w-32 h-32 mb-16" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Email"
          type="email"
          name="email"
          value={email}
          handleInputChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          value={password}
          handleInputChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <button
          type="submit"
          className="w-full text-white bg-gbBlack hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Log in
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
