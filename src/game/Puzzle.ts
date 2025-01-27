import { CellState } from "./Tango";

import type { Cell, Constraint } from "./Tango";

export interface Position {
  row: number;
  col: number;
}
export interface ConstraintConfiguration extends Constraint, Position {}

export interface PuzzleConfiguration {
  id: number;
  height: number;
  width: number;
  constraints: ConstraintConfiguration[];
  fixedCells: (Position & { state: CellState })[];
}

class Puzzle {
  public constructor(private config: PuzzleConfiguration) {}

  public getGrid(): Cell[][] {
    const grid: Cell[][] = Array.from({ length: this.config.height }, () =>
      Array.from({ length: this.config.width }, () => ({
        state: CellState.EMPTY,
        fixed: false,
        error: false,
      }))
    );

    for (const { row, col, state } of this.config.fixedCells) {
      grid[row][col].fixed = true;
      grid[row][col].state = state;
    }

    for (const { row, col, symbol, direction } of this.config.constraints) {
      if (!grid[row][col].constraints) {
        grid[row][col].constraints = [];
      }
      grid[row][col].constraints.push({ symbol, direction });
    }
    return grid;
  }
}

export default Puzzle;
