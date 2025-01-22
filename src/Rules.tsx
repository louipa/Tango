function Rules() {
  return (
    <div
      style={{
        background: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "15px",
      }}
    >
      <h1>Rules</h1>
      <ul>
        <li>Fill each cell with either a sun or a moon</li>
        <li>no more than two of the same symbol may be next to each other</li>
        <li>
          each row and column must contain an equal number of suns and moons
        </li>
        <li>cells separated by an = must have the same symbol</li>
        <li>cells separated by an x must have opposite symbols</li>
      </ul>
    </div>
  );
}

export default Rules;
