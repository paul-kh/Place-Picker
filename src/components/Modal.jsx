import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ children, open, onClose }) {
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

  /* Handle ESC key pressed on the dialog box
     ******************************************
     The <dialog> element can also be closed by pressing the ESC key on the keyboard. 
     In that case, the dialog will disappear but the state passed to the open prop (i.e., the modalIsOpen state)
     will not be set to false. Therefore, the modal can't be opened again (because modalIsOpen still is true.

    To fix this issue, we must listen to the modal being closed by adding the built-in onClose prop to 
    the <dialog>. The event is then "forwarded" to the App component by accepting a custom onClose prop on 
    the Modal component.
  */
  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
