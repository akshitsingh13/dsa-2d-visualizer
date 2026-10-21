import "./App.css";

import Sidebar from "./components/Sidebar/Sidebar";
import Title from "./components/Title/Title";
import ArrayVisualizer from "./components/Visualizer/ArrayVisualizer";
import BarVisualizer from "./components/Visualizer/BarVisualizer";
import StackVisualizer from "./components/Visualizer/StackVisualizer";
import QueueVisualizer from "./components/Visualizer/QueueVisualizer";
import LinkedListVisualizer from "./components/Visualizer/LinkedListVisualizer";
import useAlgorithmRunner from "./hooks/useAlgorithmRunner";
import PlaybackControls from "./components/Controls/PlaybackControls";
import algorithmRegistry from "./algorithms/algorithmRegistry";
import ControlPanel from "./components/Controls/ControlPanel";
import CodePanel from "./components/CodePanel/CodePanel";
import ComplexityCounter from "./components/Visualizer/ComplexityCounter";
import TheoryButton from "./components/Theory/TheoryButton";
import TheoryModal from "./components/Theory/TheoryModal";
import { getCategoryTheory, getTheory } from "./theory/index";

import { useRef, useState } from "react";

// Lookup from registry `visualizer` key to component (no if/else chain).
// New visualizers only need to be added here and in the registry.
const VISUALIZERS = {
  array: ArrayVisualizer,
  bars: BarVisualizer,
  stack: StackVisualizer,
  queue: QueueVisualizer,
  linkedList: LinkedListVisualizer,
};

function defaultOperation(config) {
  if (config && Array.isArray(config.inputs.operation)) {
    return config.inputs.operation[0];
  }

  return null;
}

// Registry `code` is a C++ string, or — for operation-based structures —
// an object / function keyed by the selected operation.
function resolveCode(code, operation) {
  if (!code) return "";
  if (typeof code === "string") return code;
  if (typeof code === "function") return code(operation);
  if (typeof code === "object") return code[operation] ?? "";
  return "";
}

function App() {
  const [dsaConcept, setDsaConcept] = useState("LS");
  // Persistent data-structure state per algorithm id:
  // { [id]: { data: [], opCount: 0, operation: "..." } }
  const [dsByAlgo, setDsByAlgo] = useState({});
  const [theoryOpen, setTheoryOpen] = useState(false);
  const theoryButtonRef = useRef(null);
  const {
    currentStep,
    isPlaying,
    speed,
    setSpeed,
    hasSteps,
    runAlgorithm,
    runSteps,
    nextStep,
    previousStep,
    togglePlay,
    pause,
    reset,
  } = useAlgorithmRunner();
  const algorithmConfig = algorithmRegistry[dsaConcept];
  const isDataStructure = algorithmConfig?.category === "data-structures";
  const dsEntry = dsByAlgo[dsaConcept] ?? {
    data: [],
    opCount: 0,
    operation: algorithmConfig ? defaultOperation(algorithmConfig) : null,
  };
  const selectedOperation =
    dsEntry.operation ?? defaultOperation(algorithmConfig);

  const VisualizerComponent =
    (algorithmConfig && VISUALIZERS[algorithmConfig.visualizer]) ||
    ArrayVisualizer;

  const handleAlgorithmChange = (algorithmId) => {
    // Switching concepts from the sidebar while the theory dialog is open
    // closes the dialog and switches normally. Focus stays where the user
    // put it (on the sidebar), so it is not returned to the theory button.
    if (theoryOpen) {
      setTheoryOpen(false);
    }

    setDsaConcept(algorithmId);
    reset();
  };

  const openTheory = () => {
    // Pause playback but keep the steps and current index, so closing the
    // dialog returns the user exactly where they were.
    pause();
    setTheoryOpen(true);
  };

  const closeTheory = () => {
    setTheoryOpen(false);
    theoryButtonRef.current?.focus();
  };

  const handleOperationChange = (operation) => {
    // Changing operation clears the replay (the steps belong to the
    // previous operation) but keeps the persistent structure state.
    reset();
    setDsByAlgo((previous) => ({
      ...previous,
      [dsaConcept]: {
        data: dsEntry.data ?? [],
        opCount: dsEntry.opCount ?? 0,
        operation,
      },
    }));
  };

  const handleRun = (params) => {
    if (!algorithmConfig) return;

    if (isDataStructure) {
      const operation = params.operation ?? selectedOperation;
      const previousData = dsEntry.data ?? [];
      const previousCount = dsEntry.opCount ?? 0;
      const steps = algorithmConfig.algorithm(
        previousData,
        { ...params, operation },
        previousCount,
        algorithmConfig.capacity,
      );
      const lastStep = steps[steps.length - 1];

      // Commit the resulting state; failed operations keep the old state
      // and do not increment the operation counter.
      setDsByAlgo((previous) => ({
        ...previous,
        [dsaConcept]: {
          data: lastStep.data !== undefined ? lastStep.data : previousData,
          opCount: lastStep.error ? previousCount : previousCount + 1,
          operation,
        },
      }));
      runSteps(steps);
      return;
    }

    runAlgorithm(algorithmConfig.algorithm, params.array, params.target);
  };

  const handleReset = () => {
    reset();

    // For data structures, Reset also clears the persistent state.
    if (isDataStructure) {
      setDsByAlgo((previous) => ({
        ...previous,
        [dsaConcept]: { data: [], opCount: 0, operation: selectedOperation },
      }));
    }
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
                code={resolveCode(algorithmConfig.code, selectedOperation)}
                activeLine={currentStep?.codeLine}
              />

              <div className="panel visualizer-panel">
                <VisualizerComponent
                  step={currentStep}
                  config={algorithmConfig}
                  dataState={dsEntry.data ?? []}
                />

                <PlaybackControls
                  isPlaying={isPlaying}
                  onPlayPause={togglePlay}
                  onPrevious={previousStep}
                  onNext={nextStep}
                  onReset={handleReset}
                  disabled={!hasSteps}
                  speed={speed}
                  onSpeedChange={setSpeed}
                />
              </div>

              <div className="panel controls-panel">
                {getTheory(dsaConcept) ? (
                  <TheoryButton
                    ref={theoryButtonRef}
                    conceptName={algorithmConfig.name}
                    onClick={openTheory}
                  />
                ) : null}

                <ControlPanel
                  algorithmConfig={algorithmConfig}
                  operation={selectedOperation}
                  onOperationChange={handleOperationChange}
                  onRun={handleRun}
                />
              </div>

              <div className="panel complexity-panel">
                <ComplexityCounter
                  complexity={algorithmConfig.complexity}
                  step={currentStep}
                  counters={algorithmConfig.counters}
                  operationKey={isDataStructure ? selectedOperation : undefined}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {theoryOpen && getTheory(dsaConcept) ? (
        <TheoryModal
          theory={getTheory(dsaConcept)}
          categoryTheory={getCategoryTheory(algorithmConfig.category)}
          onClose={closeTheory}
        />
      ) : null}
    </div>
  );
}

export default App;
