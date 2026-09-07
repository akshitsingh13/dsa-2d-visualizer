import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Title from "./components/Title/Title";
import { useState } from "react";

function App() {
  const [dsaConcept, setDsaConcept] = useState("LS");

  return (
    <div className="main">
      <div className="header">
        <Title />
      </div>
      <div className="panel-main">
        <Sidebar dsaConcept={dsaConcept} setDsaConcept={setDsaConcept} />
        <div className="panels">
          CODE AREA VISUALISER TIME & SPACE COMPLEXITY SLIDERS & CONTROL PANEL
        </div>
      </div>
    </div>
  );
}

export default App;
