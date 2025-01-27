import { FaEquals, FaTimes } from "react-icons/fa";

import { CellState, ConstraintSymbol } from "../game/Tango";

import type { Cell } from "../game/Tango";

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
        width: "100%",
        maxWidth: "500px",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`cell-${rowIndex}-${colIndex}`}
            onMouseDown={() => onCellClick(rowIndex, colIndex)}
            style={{
              width: "100%",
              height: "100%",
              aspectRatio: "1/1",
              cursor: cell.fixed ? "not-allowed" : "pointer",
              outline: "1.5px solid #bcbcbc",
              display: "flex",
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                (rowIndex + colIndex) % 2 === 0 ? "whitesmoke" : "white",
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
                    zIndex: 1,
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
      return {
        top: 0,
        transform: "translateY(-50%)",
        width: "30px",
        height: "10px",
      };
    case "right":
      return {
        right: 0,
        transform: "translateX(50%)",
        width: "10px",
        height: "30px",
      };
    case "bottom":
      return {
        bottom: 0,
        transform: "translateY(50%)",
        width: "30px",
        height: "10px",
      };
    case "left":
      return {
        left: 0,
        transform: "translateX(-50%)",
        width: "10px",
        height: "30px",
      };
    default:
      return {};
  }
}
export default Grid;
