import "./PlaybackControls.css";

function PlaybackControls({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  onReset,
  disabled,
  speed,
  onSpeedChange,
}) {
  return (
    <div className="playback-controls">
      <button onClick={onPrevious} disabled={disabled} aria-label="Previous step">
        Previous
      </button>

      <button onClick={onPlayPause} disabled={disabled} aria-label={isPlaying ? "Pause" : "Play"}>
        {isPlaying ? "Pause" : "Play"}
      </button>

      <button onClick={onNext} disabled={disabled} aria-label="Next step">
        Next
      </button>

      <button onClick={onReset} disabled={disabled} aria-label="Reset">
        Reset
      </button>

      <div className="speed-group" role="group" aria-label="Playback speed">
        {["slow", "normal", "fast"].map((option) => (
          <button
            key={option}
            className={speed === option ? "speed-active" : ""}
            onClick={() => onSpeedChange(option)}
            aria-label={`Speed ${option}`}
            aria-pressed={speed === option}
          >
            {option[0].toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PlaybackControls;
