import "./PlaybackControls.css";

function PlaybackControls({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  onReset,
}) {
  return (
    <div className="playback-controls">
      <button onClick={onPrevious}>Previous</button>

      <button onClick={onPlayPause}>{isPlaying ? "Pause" : "Play"}</button>

      <button onClick={onNext}>Next</button>

      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default PlaybackControls;
