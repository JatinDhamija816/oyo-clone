import React, { useRef, useState } from "react";
import { sendOTP, verifyOTP } from "../utils/api/hotelOwner.api";
import { useNavigate } from "react-router-dom";

const EmailRegister = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpVisible, setOtpVisible] = useState(false);

  const otpRefs = useRef([]);

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleOtpChange = (index, e) => {
    const { value } = e.target;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleSendOtp = async () => {
    if (!email.trim()) return setErrorMsg("Email is required");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return setErrorMsg("Invalid email format");

    try {
      const res = await sendOTP(email);
      if (res.success) {
        setSuccessMsg(res.message);
        setErrorMsg("");
        setOtpVisible(true);
      } else {
        setErrorMsg(res.message);
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const finalOTP = otp.join("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return setErrorMsg("Invalid email format");

    if (!finalOTP || finalOTP.length !== 6 || isNaN(finalOTP)) {
      return setErrorMsg("Invalid OTP");
    }

    try {
      const res = await verifyOTP(email, finalOTP);
      if (res.success) {
        navigate("/register");
      } else {
        setErrorMsg(res.message);
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-amber-200 to-green-200 px-5">
      <p className="text-lg text-gray-700 py-5 text-center">
        Welcome! Start your business journey by entering your email.
      </p>

      <div className="flex flex-col items-center w-full max-w-md">
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email..."
          className="border px-3 py-2 rounded-md outline-none focus:border-blue-500 w-2/3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
        {successMsg && (
          <p className="text-green-500 text-sm mt-2">{successMsg}</p>
        )}

        {otpVisible && (
          <div className="flex space-x-2 justify-center mt-4">
            {otp.map((_, index) => (
              <input
                key={index}
                ref={(el) => (otpRefs.current[index] = el)}
                maxLength="1"
                value={otp[index]}
                type="text"
                className="border px-2 py-2 w-10 text-center rounded-md outline-none focus:border-blue-500"
                onChange={(e) => handleOtpChange(index, e)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
              />
            ))}
          </div>
        )}

        <button
          onClick={otpVisible ? handleVerifyOTP : handleSendOtp}
          className="mt-4 w-1/3 py-2 bg-blue-500 text-white hover:bg-blue-600 text-lg rounded-md transition-all shadow-md hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {otpVisible ? "Verify OTP" : "Send OTP"}
        </button>
      </div>
    </div>
  );
};

export default EmailRegister;
