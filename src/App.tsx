import { useEffect, useRef, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

import _puzzles from "./assets/puzzles.json";
import "@fontsource/roboto";
import Card from "./components/Card";
import Congratulations from "./components/Congratulations";
import Controls from "./components/Controls/Controls.tsx";
import Divider from "./components/Divider";
import Grid from "./components/Grid";
import Rules from "./components/Rules";
import Timer from "./components/Timer";
import Puzzle from "./game/Puzzle";
import Tango from "./game/Tango";

import type { PuzzleConfiguration } from "./game/Puzzle";
import type { Cell } from "./game/Tango";
import type { SyntheticEvent } from "react";

const puzzles = _puzzles as PuzzleConfiguration[];
const confettiConfig = {
  duration: 3000,
  force: 0.8,
  particleCount: 100,
  width: window.innerWidth,
  zIndex: 100,
};

function App(): JSX.Element {
  // Game state
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const tango = useRef<Tango | null>(null);

  // UI state
  const [isGameWon, setIsGameWon] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Game initialization
  useEffect(() => {
    resetGameState();
    initializeGame();
  }, [puzzleIndex]);

  const initializeGame = (): void => {
    tango.current = Tango.fromPuzzle(new Puzzle(puzzles[puzzleIndex]));
    updateGrid();
  };

  const updateGrid = (): void => {
    if (!tango.current) {
      return;
    }
    setGrid([...tango.current.getGrid()]);
  };

  // Game actions
  const handleCellClick = async (
    rowIndex: number,
    colIndex: number
  ): Promise<void> => {
    if (!tango.current || isGameWon) {
      return;
    }

    if (!isPlaying) {
      setIsPlaying(true);
    }

    tango.current.toggleCell(rowIndex, colIndex);
    updateGrid();

    if (tango.current.isSolved()) {
      await handleGameWon();
    }
  };

  const handleGameWon = async (): Promise<void> => {
    setIsPlaying(false);
    setIsGameWon(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsModalOpen(true);
  };

  const handleSelectLevel = (
    event: SyntheticEvent<HTMLSelectElement, Event>
  ): void => {
    const selectedIndex = (event.target as HTMLSelectElement).selectedIndex;
    if (selectedIndex === puzzleIndex || selectedIndex >= puzzles.length) {
      return;
    }
    setPuzzleIndex(selectedIndex);
  };

  const handleBackClick = (): void => {
    if (!tango.current) {
      return;
    }
    tango.current.undoMove();
    updateGrid();
  };

  const handlePlayButton = (): void => {
    if (!tango.current) {
      return;
    }
    resetGameState();
    tango.current.resetGame();
    updateGrid();
  };

  const resetGameState = (): void => {
    setIsGameWon(false);
    setIsModalOpen(false);
    setIsPlaying(false);
    setTime(0);
  };

  return (
    <Card>
      <h1>Tango</h1>
      <Timer isPlaying={isPlaying} time={time} onTimeUpdate={setTime} />
      {isGameWon && (
        <ConfettiExplosion
          style={{ position: "absolute", top: "35%" }}
          {...confettiConfig}
        />
      )}
      <Grid cells={grid} onCellClick={handleCellClick} />
      <Congratulations
        isModalOpen={isModalOpen}
        handlePlayButton={handlePlayButton}
        time={time}
      />
      <Controls
        handleBackClick={handleBackClick}
        handleSelectLevel={handleSelectLevel}
        handlePlayButton={handlePlayButton}
        puzzles={puzzles}
      />
      <Divider />
      <Rules />
    </Card>
  );
}

export default App;
