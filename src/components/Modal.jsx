import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ children, open }) {
  const dialog = useRef();

  // We need useEffect() here because the first time that
  // the Modal() component function is executed, its JSX code
  // is not executed yet, though the dialog ref is undefined
  // which is resulting error with dialog.current.showModal()
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
