import * as React from "react";
import {lazy, Suspense} from "react";

import Button from "./Button";
import Modal from "./Modal/Modal";

interface CongratulationsProps {
  isModalOpen: boolean;
  handlePlayButton: () => void;
  time: number;
}

const GitHubButtonLazy = lazy(() => import("react-github-btn"));

function Congratulations({
  isModalOpen,
  handlePlayButton,
  time,
}: CongratulationsProps): React.JSX.Element {
  return (
    <Modal isOpen={isModalOpen} onClose={handlePlayButton}>
      <h1
        style={{
          fontSize: "2rem",
          marginBottom: "1.5rem",
          fontWeight: "bold",
        }}
      >
        🎉 Congratulations ! 🎉
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          color: "#34495e",
          marginBottom: "2rem",
        }}
      >
        You solved the puzzle in{" "}
        <span style={{ fontWeight: "bold", color: "#3498db" }}>{time}</span>{" "}
        seconds !
      </p>
      <Button onClick={handlePlayButton}>Play Again</Button>
      <p
        style={{
          fontSize: "1rem",
          color: "#7f8c8d",
          marginBottom: "1.5rem",
          padding: "0 2rem",
          textAlign: "center",
        }}
      >
        ⭐ Click below to star the project on GitHub and help me improve it !
      </p>
      <Suspense fallback={<div>Chargement...</div>}>
        <GitHubButtonLazy
          href="https://github.com/louipa/Tango"
          data-color-scheme="no-preference: light; light: light; dark: dark;"
          data-size="large"
          data-show-count="true"
          aria-label="Star buttons/github-buttons on GitHub"
        >
          Star
        </GitHubButtonLazy>
      </Suspense>
    </Modal>
  );
}

export default Congratulations;
