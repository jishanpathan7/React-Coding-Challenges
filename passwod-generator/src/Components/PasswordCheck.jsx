import React from "react";

const PasswordCheck = ({ password = "" }) => {
  const CheckPasswordStrength = (password) => {
    if (password.length === 0) {
      return {
        strength: "Strength",
        message: "Please enter a password",
        color: "white",
      };
    } else if (password.length <= 4) {
      return {
        strength: "Strength",
        message: "Too short",
        color: "red",
      };
    } else if (password.length <= 8) {
      return {
        strength: "Strength",
        message: "Weak",
        color: "orange",
      };
    } else if (password.length <= 12) {
      return {
        strength: "Strength",
        message: "Good",
        color: "yellow",
      };
    } else {
      return {
        strength: "Strength",
        message: "Very Strong",
        color: "#32CD32",
      };
    }
  };
  return (
    <div className="password-check">
      <span>{CheckPasswordStrength(password).strength} :</span>
      <span
        style={{
          color: CheckPasswordStrength(password).color,
        }}
      >
        {CheckPasswordStrength(password).message}
      </span>
    </div>
  );
};

export default PasswordCheck;
