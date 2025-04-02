import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formFields } from "../utils/constants";
import { validationFields } from "../utils/registerValidation";
import { register } from "../utils/api/hotelOwner.api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const inputRefs = useRef([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: validationFields(name, value, formData),
    }));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!errors[formFields[index].name]) {
        const nextInput = inputRefs.current[index + 1];
        if (nextInput) nextInput.focus();
      }
    }
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const errorMsg = validationFields(key, formData[key], formData);
      if (errorMsg) {
        newErrors[key] = errorMsg;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await register(formData);
      if (res.success) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      } else {
        setError(res.message);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-1 flex justify-center items-center bg-gradient-to-b from-amber-200 to-emerald-200">
      <form
        onSubmit={handleSubmit}
        className="space-y-3 md:p-10 md:rounded-xl md:shadow-md md:shadow-black md:bg-white w-4/6 md:w-1/3"
      >
        <p className="text-2xl font-light text-center">Register</p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {formFields.map(({ label, name, type, placeholder }, index) => (
          <div className="flex flex-col w-full space-y-1" key={name}>
            <label htmlFor={name}>{label}</label>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              className="border px-2 py-2 rounded-md outline-none focus:border-blue-500"
              value={formData[name]}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
            {errors[name] && (
              <p className="text-red-500 text-sm">{errors[name]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="mt-2 rounded-md w-full py-2 bg-blue-500 text-white hover:bg-blue-600 text-xl transition-all shadow-md shadow-gray-800/50 hover:scale-105 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={
            loading || Object.values(errors).some((error) => error.length > 0)
          }
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <span
            className="text-blue-400 hover:text-blue-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
