import "./Resources.css";

function ExternalIcon() {
  return (
    <svg
      className="theory-link-icon"
      aria-hidden="true"
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
    >
      <path
        d="M5.5 2.5H2.5V10.5H10.5V7.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 2.5H10.5V5.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 2.5L6 7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Videos and practice problems for the "resources" section. Videos are
// either verified direct links or YouTube search links (marked with a
// "search" tag so the owner can swap in a specific video later). Practice
// entries are plain text only — never URLs.
function Resources({ videos, practice }) {
  return (
    <div className="theory-resources">
      <h3>Videos</h3>

      {videos.length === 0 ? (
        <p className="theory-resources-empty">Videos coming soon.</p>
      ) : (
        <ul className="theory-video-list">
          {videos.map((video, index) => (
            <li key={index} className="theory-video-item">
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${video.isSearchLink ? `Search on YouTube: ${video.query}` : `${video.title} by ${video.channel}`} (opens in a new tab)`}
              >
                {video.isSearchLink
                  ? `Search on YouTube: ${video.query}`
                  : video.title}
                <ExternalIcon />
              </a>

              <span className="theory-video-meta">
                {video.isSearchLink ? (
                  <span className="theory-search-tag">search</span>
                ) : (
                  video.channel
                )}
              </span>
            </li>
          ))}
        </ul>
      )}

      <h3>Practice problems</h3>

      {practice.length === 0 ? (
        <p className="theory-resources-empty">Practice set coming soon.</p>
      ) : (
        <ul className="theory-practice-list">
          {practice.map((problem, index) => (
            <li key={index}>
              <span className="theory-practice-title">{problem.title}</span>
              <span className="theory-practice-platform">{problem.platform}</span>
              {problem.note ? (
                <span className="theory-practice-note">{problem.note}</span>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Resources;
