import * as React from "react";

function Divider(): React.JSX.Element {
  return (
    <div style={{ display: "flex", gap: "20px", width: "100%" }}>
      <span
        style={{
          borderBottom: "1.5px solid #bcbcbc",
          width: "100%",
          borderRadius: "5px",
        }}
      />
    </div>
  );
}

export default Divider;
