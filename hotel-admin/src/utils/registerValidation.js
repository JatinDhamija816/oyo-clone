export const validationFields = (name, value, formData = {}) => {
  let errorMsg = "";

  if (name === "name") {
    errorMsg = value.trim() ? "" : "Name is required";
  }

  if (name === "email") {
    if (!value.trim()) {
      errorMsg = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      errorMsg = emailRegex.test(value) ? "" : "Invalid email format";
    }
  }

  if (name === "phone") {
    if (!value.trim()) {
      errorMsg = "Phone number is required";
    } else {
      const phoneRegex = /^\+?[1-9]\d{9,14}$/;
      errorMsg = phoneRegex.test(value) ? "" : "Invalid phone number";
    }
  }

  if (name === "password") {
    if (!value.trim()) {
      errorMsg = "Password is required";
    } else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      errorMsg = passwordRegex.test(value)
        ? ""
        : "Password must be at least 8 characters long, with 1 uppercase, 1 lowercase, 1 special character, and 1 number";
    }
  }

  // if (name === "confirmPassword") {
  //   if (!value.trim()) {
  //     errorMsg = "Confirm Password is required";
  //   } else if (value !== formData.password) {
  //     errorMsg = "Passwords do not match";
  //   }
  // }

  return errorMsg;
};
