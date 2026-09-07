import { useEffect, useState } from "react";

function useAlgorithmRunner() {
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentStep = steps[currentStepIndex] || null;

  const runAlgorithm = (algorithm, ...args) => {
    const generatedSteps = algorithm(...args);

    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);

    return generatedSteps;
  };

  const nextStep = () => {
    setCurrentStepIndex((current) => {
      if (current >= steps.length - 1) {
        setIsPlaying(false);
        return current;
      }

      return current + 1;
    });
  };

  const previousStep = () => {
    setCurrentStepIndex((current) => Math.max(current - 1, 0));
  };

  const togglePlay = () => {
    if (steps.length === 0) return;

    setIsPlaying((playing) => !playing);
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentStepIndex((current) => {
        if (current >= steps.length - 1) {
          setIsPlaying(false);
          return current;
        }

        return current + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  return {
    steps,
    currentStep,
    currentStepIndex,
    isPlaying,
    runAlgorithm,
    nextStep,
    previousStep,
    togglePlay,
    reset,
  };
}

export default useAlgorithmRunner;
