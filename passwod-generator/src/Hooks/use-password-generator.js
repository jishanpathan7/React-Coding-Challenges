import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [errorMessaage, setErrorMessage] = useState("");

  const generatePassword = (checkBoxData, length) => {
    //password generation logic
    let charset = "",
      generatedPassword = "";

    const selectedOption = checkBoxData.filter((option) => option.state);

    if (selectedOption.length === 0) {
      setErrorMessage("Please select at least one option");
      setPassword("")
      return;
    }

    selectedOption.forEach((option) => {
      switch (option.title) {
        case "Include Uppercase Letters":
          charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Include Lowercase Letters":
          charset += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include Numbers":
          charset += "0123456789";
          break;
        case "Include Symbols":
          charset += "!@#$%^&*()";
          break;
        default:
          break;
      }
    });
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    setPassword(generatedPassword);
    setErrorMessage("");
  };

  return { password, errorMessaage, generatePassword };
};

export default usePasswordGenerator;
