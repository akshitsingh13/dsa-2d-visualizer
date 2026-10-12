import { useEffect, useState } from "react";

export const SPEEDS = {
  slow: 1500,
  normal: 1000,
  fast: 400,
};

function useAlgorithmRunner() {
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState("normal");

  const currentStep = steps[currentStepIndex] || null;
  const hasSteps = steps.length > 0;

  const runAlgorithm = (algorithm, ...args) => {
    const generatedSteps = algorithm(...args);

    runSteps(generatedSteps);

    return generatedSteps;
  };

  // Load a pre-generated step array (used for operation-based structures
  // whose state lives outside the runner).
  const runSteps = (newSteps) => {
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const nextStep = () => {
    if (steps.length === 0) return;

    const next = currentStepIndex + 1;

    // Never call setState inside another setState updater (updaters must be
    // pure): compute the next index outside and stop at the last step.
    if (next > steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    setCurrentStepIndex(next);
  };

  const previousStep = () => {
    if (steps.length === 0) return;

    setCurrentStepIndex(Math.max(currentStepIndex - 1, 0));
  };

  const togglePlay = () => {
    if (steps.length === 0) return;

    // If the run has finished, restart from step 0 instead of instantly
    // pausing on the last step.
    if (!isPlaying && currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
      return;
    }

    setIsPlaying((playing) => !playing);
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setSteps([]);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      const next = currentStepIndex + 1;

      if (next > steps.length - 1) {
        setIsPlaying(false);
        return;
      }

      setCurrentStepIndex(next);
    }, SPEEDS[speed] ?? SPEEDS.normal);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, steps.length, speed]);

  return {
    steps,
    currentStep,
    currentStepIndex,
    isPlaying,
    speed,
    setSpeed,
    hasSteps,
    runAlgorithm,
    runSteps,
    nextStep,
    previousStep,
    togglePlay,
    reset,
  };
}

export default useAlgorithmRunner;
