export const validationFields = (name, value) => {
  let errorMsg = "";

  if (name === "name") {
    errorMsg = value.trim() ? "" : "Name is required";
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

  return errorMsg;
};
