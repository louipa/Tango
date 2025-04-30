import * as React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

function Button({ onClick, children }: ButtonProps): React.JSX.Element {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "#d65db1",
        width: "100px",
        borderRadius: "10px",
        padding: "10px",
        textAlign: "center",
        color: "white",
        cursor: "pointer",
        fontFamily: "roboto",
        border: "none",
      }}
    >
      {children}
    </button>
  );
}

export default Button;
