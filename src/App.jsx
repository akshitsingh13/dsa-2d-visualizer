import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Title from "./components/Title/Title";

function App() {
  return (
    <div className="main">
      <div className="header">
        <Title />
      </div>
      <div className="panel-main">
        <Sidebar />
        <div className="panels">
          CODE AREA VISUALISER TIME & SPACE COMPLEXITY SLIDERS & CONTROL PANEL
        </div>
      </div>
    </div>
  );
}

export default App;
