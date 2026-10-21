function ArrayBox({ value, status }) {
  return <div className={`array-box ${status}`}>{value}</div>;
}

export default ArrayBox;
