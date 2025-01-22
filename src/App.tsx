import { SyntheticEvent, useEffect, useRef, useState } from "react";
import Grid from "./components/Grid";
import Tango, { Cell } from "./game/Tango";
import ConfettiExplosion from "react-confetti-explosion";
import _puzzles from "./assets/puzzles.json";
import Puzzle, { PuzzleConfiguration } from "./game/Puzzle";
import "@fontsource/roboto";
import Button from "./components/Button";
import Rules from "./Rules";
import Selector from "./components/Selector";
import Card from "./components/Card";
import Divider from "./components/Divider";
import Modal from "./components/Modal";
import GitHubButton from "react-github-btn";

const puzzles = _puzzles as PuzzleConfiguration[];

function App() {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const tango = useRef<Tango | null>(null);

  const [grid, setGrid] = useState<Cell[][]>([]);
  const [isGameWon, setIsGameWon] = useState(false);

  useEffect(() => {
    tango.current = Tango.fromPuzzle(new Puzzle(puzzles[puzzleIndex]));
    updateGrid();
  }, [puzzleIndex]);

  const updateGrid = () => {
    if (!tango.current) return;
    setGrid([...tango.current.getGrid()]);
  };

  const handleCellClick = async (rowIndex: number, colIndex: number) => {
    if (!tango.current) return;
    tango.current.toggleCell(rowIndex, colIndex);
    updateGrid();

    if (tango.current.isSolved()) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setIsGameWon(true);
    }
  };

  const handleSelectLevel = (
    event: SyntheticEvent<HTMLSelectElement, Event>
  ) => {
    const selectedIndex = (event.target as HTMLSelectElement).selectedIndex;
    if (selectedIndex === puzzleIndex) return;
    if (selectedIndex >= puzzles.length) return;
    setPuzzleIndex(selectedIndex);
    updateGrid();
  };

  const handleBackClick = () => {
    if (!tango.current) return;
    tango.current.undoMove();
    updateGrid();
  };

  const handlePlayButton = () => {
    if (!tango.current) return;
    setIsGameWon(false);
    tango.current.resetGame();
    updateGrid();
  };

  return (
    <Card>
      <h1>Tango</h1>
      {isGameWon && (
        <ConfettiExplosion
          style={{ position: "absolute", top: "35%" }}
          duration={3000}
          force={0.8}
          particleCount={100}
          width={window.innerWidth}
          zIndex={100}
        />
      )}
      <Grid cells={grid} onCellClick={handleCellClick} />
      <Modal isOpen={isGameWon} onClose={() => handlePlayButton()}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            gap: "20px",
          }}
        >
          <h1>Congratulations !</h1>
          <Button onClick={handlePlayButton}>Play Again</Button>
          <GitHubButton
            href="https://github.com/buttons/github-buttons"
            data-color-scheme="no-preference: light; light: light; dark: dark;"
            data-size="large"
            data-show-count="true"
            aria-label="Star buttons/github-buttons on GitHub"
          >
            Star
          </GitHubButton>
        </div>
      </Modal>
      <div style={{ display: "flex", gap: "50px" }}>
        <Button onClick={handleBackClick}>Undo Move</Button>
        <Selector
          onChange={handleSelectLevel}
          options={puzzles.map((level) => `Level ${level.id}`)}
        />
        <Button onClick={handlePlayButton}>Reset</Button>
      </div>
      <Divider />
      <Rules />
    </Card>
  );
}

export default App;
