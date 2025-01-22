import { CgClose } from "react-icons/cg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ children, isOpen, onClose }: ModalProps) {
  return (
    <>
      {isOpen && (
        <div>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              width: "100vw",
              height: "100vh",
              zIndex: 0,
              position: "fixed",
              top: 0,
              left: 0,
            }}
          />
          <div
            style={{
              width: "50vw",
              height: "50vh",
              zIndex: 10,
              boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.04)",
              background: "white",
              borderRadius: "15px",
              overflow: "hidden",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <button
              onClick={onClose}
              style={{
                float: "right",
                padding: "10px",
                cursor: "pointer",
                border: "none",
                background: "none",
                fontSize: "20px",
              }}
            >
              <CgClose />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
