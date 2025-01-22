import { Cell, CellState, ConstraintSymbol } from "../game/Tango";
import { FaEquals, FaTimes } from "react-icons/fa";

interface GridProps {
  onCellClick: (rowIndex: number, colIndex: number) => void;
  cells: Cell[][];
}

function Grid({ cells, onCellClick }: GridProps) {
  const width = cells.length > 0 ? cells[0].length : 0;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${width}, 1fr)`,
        outline: "1.5px solid #bcbcbc",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onMouseDown={() => onCellClick(rowIndex, colIndex)}
            style={{
              width: "100px",
              height: "100px",
              cursor: cell.fixed ? "not-allowed" : "pointer",
              outline: "1.5px solid #bcbcbc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                (rowIndex + colIndex) % 2 == 0 ? "whitesmoke" : "white",
              fontSize: "40px",
              userSelect: "none",
            }}
          >
            {cell.state !== 0 && (cell.state === CellState.MOON ? "🌻" : "🌷")}
            {cell.constraints &&
              cell.constraints.map((constraint, index) => (
                <div
                  key={`constraint-${rowIndex}-${colIndex}-${index}`}
                  style={{
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "5px",
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: "black",
                    backgroundColor: "white",
                    borderRadius: "30px",
                    ...getConstraintStyle(constraint.direction),
                  }}
                >
                  {constraint.symbol === ConstraintSymbol.MUL && <FaTimes />}
                  {constraint.symbol === ConstraintSymbol.EQUAL && <FaEquals />}
                </div>
              ))}
          </div>
        ))
      )}
    </div>
  );
}

function getConstraintStyle(direction: string): React.CSSProperties {
  switch (direction) {
    case "top":
      return { transform: "translateY(-50px)", width: "30px", height: "10px" };
    case "right":
      return { transform: "translateX(50px)", width: "10px", height: "30px" };
    case "bottom":
      return { transform: "translateY(50px)", width: "30px", height: "10px" };
    case "left":
      return { transform: "translateX(-50px)", width: "10px", height: "30px" };
    default:
      return {};
  }
}
export default Grid;
