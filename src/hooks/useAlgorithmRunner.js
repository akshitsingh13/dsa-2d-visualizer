import { useEffect, useState } from "react";

/**
 * Playback interval durations in milliseconds.
 */
export const SPEEDS = {
  slow: 1500,
  normal: 1000,
  fast: 400,
};

/**
 * Custom hook managing step-by-step playback, navigation, and timing.
 * Decouples algorithm step generation from user playback controls.
 *
 * @returns {object} Runner state and playback control methods:
 *   - steps: Array of step snapshot objects.
 *   - currentStep: Active step snapshot.
 *   - currentStepIndex: 0-based index of active step.
 *   - isPlaying: Playback status.
 *   - speed: Active speed setting ('slow' | 'normal' | 'fast').
 *   - setSpeed: Setter for speed setting.
 *   - hasSteps: Boolean indicating if steps are loaded.
 *   - runAlgorithm: Generates steps using a pure generator and loads them.
 *   - runSteps: Loads pre-generated steps directly.
 *   - nextStep: Advances to next step.
 *   - previousStep: Steps backward.
 *   - togglePlayPause: Toggles automatic step animation.
 *   - reset: Resets playback to step 0.
 *   - pause: Pauses automatic playback.
 */
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

  // Pause playback without touching the steps or the current index, so a
  // paused run can be resumed exactly where it left off.
  const pause = () => {
    setIsPlaying(false);
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
    pause,
    reset,
  };
}

export default useAlgorithmRunner;
