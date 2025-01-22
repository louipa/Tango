interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function Card({ style, children }: CardProps) {
  return (
    <div
      style={{
        ...style,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "15px",
        gap: "20px",
      }}
    >
      {children}
    </div>
  );
}

export default Card;
