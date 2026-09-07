function ArrayBox({ value, index, status }) {
  return <div className={`array-box ${status}`}>{value}</div>;
}

export default ArrayBox;
