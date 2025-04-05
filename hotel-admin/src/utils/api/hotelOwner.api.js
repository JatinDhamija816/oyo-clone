import axios from "axios";

const SERVER_URL = "http://localhost:8000/api/v1/hotelOwner";

export const sendOTP = async (email) => {
  try {
    const res = await axios.post(
      `${SERVER_URL}/send-otp`,
      { email },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const res = await axios.post(
      `${SERVER_URL}/verify-otp`,
      { email, otp },
      { withCredentials: true }
    );

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const register = async (formData) => {
  try {
    const res = await axios.post(`${SERVER_URL}/register`, formData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
