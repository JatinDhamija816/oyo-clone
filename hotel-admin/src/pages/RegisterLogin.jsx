import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center items-center flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-10 px-5">
      <div
        className="border p-6 rounded-lg shadow-lg shadow-black max-w-3/4 h-44 md:w-72 md:h-48 flex flex-col justify-center items-center text-center cursor-pointer hover:scale-105 transition-transform"
        onClick={() => navigate("/email-register")}
      >
        <p className="font-bold text-xl">Join Us Today</p>
        <p className="text-sm text-gray-600 mt-2">
          Create an account and unlock exclusive opportunities to grow your
          business effortlessly.
        </p>
      </div>

      <div
        className="border p-6 rounded-lg shadow-lg shadow-black max-w-3/4 h-44 md:w-72 md:h-48 flex flex-col justify-center items-center text-center cursor-pointer hover:scale-105 transition-transform"
        onClick={() => navigate("/login")}
      >
        <p className="font-bold text-xl">Welcome Back!</p>
        <p className="text-sm text-gray-600 mt-2">
          Sign in now to explore new updates, manage your bookings, and stay
          ahead.
        </p>
      </div>
    </div>
  );
};

export default RegisterLogin;
