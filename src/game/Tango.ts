import { Stack } from "stack-typescript";

import type Puzzle from "./Puzzle";

export enum CellState {
  EMPTY,
  SUN,
  MOON,
}

export enum ConstraintSymbol {
  EQUAL = "=",
  MUL = "x",
}

export interface Constraint {
  symbol: ConstraintSymbol;
  direction: "top" | "right" | "bottom" | "left";
}

export interface Cell {
  state: CellState;
  fixed: boolean;
  constraints?: Constraint[];
}

export interface Move {
  rowIndex: number;
  colIndex: number;
}

class Tango {
  private baseGrid: Cell[][];
  private grid: Cell[][];
  private moves = new Stack<Move>();

  private constructor(grid: Cell[][]) {
    this.baseGrid = structuredClone(grid);
    this.grid = [];
    this.resetGame();
  }

  public static fromPuzzle(puzzle: Puzzle) {
    const grid = puzzle.getGrid();
    return new Tango(grid);
  }

  public static blank(height: number, width: number) {
    const grid: Cell[][] = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => ({
        state: CellState.EMPTY,
        fixed: false,
        error: false,
      }))
    );
    return new Tango(grid);
  }

  public resetGame() {
    this.grid = structuredClone(this.baseGrid);
    this.moves = new Stack<Move>();
  }

  public getGrid() {
    return this.grid;
  }

  public toggleCell(rowIndex: number, colIndex: number) {
    if (!this.isValidPosition(rowIndex, colIndex)) {
      throw new Error("Invalid position");
    }
    const cell = this.grid[rowIndex][colIndex];
    if (cell.fixed) {
      return;
    }
    cell.state = (cell.state + 1) % 3;
    this.moves.push({ rowIndex, colIndex });
  }

  private areConstraintsSatisfied(rowIndex: number, colIndex: number) {
    const cell = this.grid[rowIndex][colIndex];
    if (!cell.constraints) {
      return true;
    }

    for (const constraint of cell.constraints) {
      const position = this.getPositionFromDirection(rowIndex, colIndex, constraint.direction);
      const [posX, posY] = position;

      if (!this.isValidPosition(posX, posY)) {
        continue;
      }

      const otherCell = this.grid[posX][posY];
      if (
        constraint.symbol === ConstraintSymbol.EQUAL &&
        cell.state !== otherCell.state
      ) {
        return false;
      }

      if (
        constraint.symbol === ConstraintSymbol.MUL &&
        ((cell.state === CellState.SUN && otherCell.state === CellState.SUN) ||
          (cell.state === CellState.MOON && otherCell.state === CellState.MOON))
      ) {
        return false;
      }
    }
    return true;
  }

  private getPositionFromDirection(row: number, col: number, direction: "top" | "right" | "bottom" | "left"): [number, number] {
    const positions: Record<string, [number, number]> = {
      top: [row - 1, col],
      right: [row, col + 1],
      bottom: [row + 1, col],
      left: [row, col - 1],
    };
    return positions[direction];
  }

  private isValidPosition(rowIndex: number, colIndex: number) {
    return (
      rowIndex >= 0 &&
      rowIndex < this.grid.length &&
      colIndex >= 0 &&
      colIndex < this.grid[0].length
    );
  }

  private isRowSolved(rowIndex: number): boolean {
    const row = this.grid[rowIndex];
    const suns = row.filter((cell) => cell.state === CellState.SUN).length;
    const moons = row.filter((cell) => cell.state === CellState.MOON).length;
    if (this.hasConsecutiveSunOrMoon(row)) {
      return false;
    }
    for (let i = 0; i < row.length; i++) {
      if (!this.areConstraintsSatisfied(rowIndex, i)) {
        return false;
      }
    }
    return suns === moons && suns === row.length / 2;
  }

  private hasConsecutiveSunOrMoon(cells: Cell[]): boolean {
    for (let i = 0; i < cells.length - 2; i++) {
      if (
        cells[i].state === cells[i + 1].state &&
        cells[i].state === cells[i + 2].state
      ) {
        return true;
      }
    }
    return false;
  }

  private isColumnSolved(colIndex: number): boolean {
    const column = this.grid.map((row) => row[colIndex]);
    const suns = column.filter((cell) => cell.state === CellState.SUN).length;
    const moons = column.filter((cell) => cell.state === CellState.MOON).length;

    if (this.hasConsecutiveSunOrMoon(column)) {
      return false;
    }
    for (let i = 0; i < column.length; i++) {
      if (!this.areConstraintsSatisfied(i, colIndex)) {
        return false;
      }
    }
    return suns === moons && suns === this.grid.length / 2;
  }

  public isSolved(): boolean {
    for (let i = 0; i < this.grid.length; i++) {
      if (!this.isRowSolved(i)) {
        return false;
      }
    }
    for (let i = 0; i < this.grid[0].length; i++) {
      if (!this.isColumnSolved(i)) {
        return false;
      }
    }

    return true;
  }

  public undoMove() {
    const move = this.moves.pop();
    if (move) {
      const cell = this.grid[move.rowIndex][move.colIndex];
      if (!cell.fixed) {
        cell.state = (cell.state + 2) % 3;
      }
    }
  }
}

export default Tango;
