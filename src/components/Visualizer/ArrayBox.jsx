function ArrayBox({ value, index, status }) {
  const boxStyle = {
    width: "60px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #333",
    borderRadius: "8px",
    margin: "5px",
    fontSize: "20px",
    fontWeight: "bold",
    backgroundColor:
      status === "current"
        ? "#f59e0b"
        : status === "found"
          ? "#22c55e"
          : "#f3f4f6",
  };

  return <div style={boxStyle}>{value}</div>;
}

export default ArrayBox;
