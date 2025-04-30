import * as React from "react";

import Button from "../Button.tsx";
import Selector from "../Selector.tsx";
import "./controls.css";

import type { SyntheticEvent } from "react";

interface ControlsProps {
  handleBackClick: () => void;
  handleSelectLevel: (e: SyntheticEvent<HTMLSelectElement>) => void;
  handlePlayButton: () => void;
  puzzles: { id: number }[];
}

function Controls({
  handleBackClick,
  handleSelectLevel,
  handlePlayButton,
  puzzles,
}: ControlsProps): React.JSX.Element {
  return (
    <div className="controls">
      <Button onClick={handleBackClick}>Undo Move</Button>
      <Selector
        onChange={handleSelectLevel}
        options={puzzles.map((level) => `Level ${level.id}`)}
      />
      <Button onClick={handlePlayButton}>Reset</Button>
    </div>
  );
}

export default Controls;
