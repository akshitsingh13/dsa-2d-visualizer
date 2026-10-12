import "./App.css";

import Sidebar from "./components/Sidebar/Sidebar";
import Title from "./components/Title/Title";
import ArrayVisualizer from "./components/Visualizer/ArrayVisualizer";
import useAlgorithmRunner from "./hooks/useAlgorithmRunner";
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
    speed,
    setSpeed,
    hasSteps,
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
          {!algorithmConfig ? (
            <div className="panel">Algorithm not available yet.</div>
          ) : (
            <>
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
                  disabled={!hasSteps}
                  speed={speed}
                  onSpeedChange={setSpeed}
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
                  counters={algorithmConfig.counters}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
