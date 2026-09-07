import "./App.css";

import Sidebar from "./components/Sidebar/Sidebar";
import Title from "./components/Title/Title";
import ArrayVisualizer from "./components/Visualizer/ArrayVisualizer";
import useAlgorithmRunner from "./hooks/useAlgorithmRunner";
// import linearSearch from "./algorithms/linearSearch";
import PlaybackControls from "./components/Controls/PlaybackControls";
import algorithmRegistry from "./algorithms/algorithmRegistry";
import ControlPanel from "./components/Controls/ControlPanel";
import CodePanel from "./components/CodePanel/CodePanel";
import ComplexityCounter from "./components/Visualizer/ComplexityCounter";

import { useState } from "react";

function App() {
  const [dsaConcept, setDsaConcept] = useState("LS");
  const {
    currentStep,
    isPlaying,
    runAlgorithm,
    nextStep,
    previousStep,
    togglePlay,
    reset,
  } = useAlgorithmRunner();
  const algorithmConfig = algorithmRegistry[dsaConcept];

  const handleAlgorithmChange = (algorithmId) => {
    setDsaConcept(algorithmId);
    reset();
  };

  if (!algorithmConfig) {
    return (
      <div className="main">
        <div className="header">
          <Title />
        </div>

        <div className="panel-main">
          <Sidebar
            dsaConcept={dsaConcept}
            setDsaConcept={handleAlgorithmChange}
          />

          <div className="panels">
            <div className="panel">Algorithm not available yet.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="header">
        <Title />
      </div>

      <div className="panel-main">
        <Sidebar dsaConcept={dsaConcept} setDsaConcept={setDsaConcept} />

        <div className="panels">
          <CodePanel
            code={algorithmConfig.code}
            activeLine={currentStep?.codeLine}
          />

          <div className="panel visualizer-panel">
            <ArrayVisualizer step={currentStep} />

            <PlaybackControls
              isPlaying={isPlaying}
              onPlayPause={togglePlay}
              onPrevious={previousStep}
              onNext={nextStep}
              onReset={reset}
            />
          </div>

          <div className="panel controls-panel">
            <ControlPanel
              algorithmConfig={algorithmConfig}
              onRun={(array, target) =>
                runAlgorithm(algorithmConfig.algorithm, array, target)
              }
            />
          </div>

          <div className="panel complexity-panel">
            <ComplexityCounter
              complexity={algorithmConfig.complexity}
              step={currentStep}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
