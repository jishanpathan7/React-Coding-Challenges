import { useState } from "react";
import "./App.css";
import usePasswordGenerator from "./Hooks/use-password-generator";
import PasswordCheck from "./Components/PasswordCheck";

function App() {
  const [length, setLength] = useState(4);
  const [copyText, setCopyText] = useState(false);
  const [checkBoxData, setCheckBoxData] = useState([
    {
      title: "Include Uppercase Letters",
      state: false,
    },
    {
      title: "Include Lowercase Letters",
      state: false,
    },
    {
      title: "Include Numbers",
      state: false,
    },
    {
      title: "Include Symbols",
      state: false,
    },
  ]);

  const handleCheckBoxChange = (index) => {
    const updatedCheckBoxData = [...checkBoxData];
    updatedCheckBoxData[index].state = !updatedCheckBoxData[index].state;
    setCheckBoxData(updatedCheckBoxData);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopyText(true);
    setTimeout(() => {
      setCopyText(false);
    }, 2000);
  };

  const { password, errorMessaage, generatePassword } = usePasswordGenerator();

  return (
    <div className="container">
      {/*Password Text and Copy Button */}
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <button className="copyBtn" onClick={copyToClipboard}>
            {copyText ? "Copied !" : "Copy"}
          </button>
        </div>
      )}
      {/* Charactor Length*/}
      <div className="charLength">
        <span>
          <label for="">Charactor Length</label>
          <label for="">{length}</label>
        </span>

        <input
          type="range"
          min={4}
          value={length}
          max={20}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      {/* CheckBoxes */}
      <div className="checkBoxes">
        {checkBoxData.map((checkbox, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                checked={checkbox.state}
                onChange={() => handleCheckBoxChange(index)}
              />
              <label>{checkbox.title}</label>
            </div>
          );
        })}
      </div>
      {/* Password Strength check */}
      <div>
         <PasswordCheck password={password} />
      </div>
      {errorMessaage && <div className="error">{errorMessaage}</div>}
      {/* Generate Password Button */}
      <button
        className="generateBtn"
        onClick={() => generatePassword(checkBoxData, length)}
      >
        Generate Password
      </button>
    </div>
  );
}

export default App;
