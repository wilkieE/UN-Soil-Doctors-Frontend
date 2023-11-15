import React from "react";
import { useNavigate } from "react-router-dom";

const AddButton = ({ buttonText, navigateTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateTo);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 p-2 rounded text-white"
    >
      {buttonText}
    </button>
  );
};

export default AddButton;
