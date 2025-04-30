import * as React from "react";
import { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import "./modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ children, isOpen, onClose }: ModalProps): React.JSX.Element | undefined {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return undefined;
  }

  return (
    <>
      <div
        className={`modal-background ${isClosing ? "modal-background-exit" : ""}`}
      />
      <div className={`modal ${isClosing ? "modal-exit" : ""}`}>
        <button className="modal-close-button" onClick={onClose}>
          <CgClose />
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </>
  );
}

export default Modal;
