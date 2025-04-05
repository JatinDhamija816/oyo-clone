import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-tl from-amber-200 to-lime-100 py-10 space-y-5">
      <p className="font-semibold text-2xl">
        Build Your <span className="text-cyan-500">Hotel</span> with us
      </p>
      <button
        className="rounded-full px-7 py-2 bg-blue-500 text-white hover:bg-blue-600 text-xl transition-all shadow-lg shadow-gray-800/50 hover:scale-105 cursor-pointer"
        onClick={() => navigate("/register&login")}
      >
        Let's go
      </button>
    </div>
  );
};

export default LandingPage;
