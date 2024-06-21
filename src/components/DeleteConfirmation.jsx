import { useEffect } from "react";
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // Auto delete saved place 3 seconds after the Modal opened
  useEffect(() => {
    const timer = setTimeout(() => {
      // ISSUE: the <DeleteConfirmation> component always got rendered when the <App> comp rendered,
      //        therefore, the codes inside of this setTimeOut() will automatically get  executed.
      //        To resolve this issue, as a workaround, we can render the DeletionConfirmation component
      //        conditionally either in the <App> or <Modal> with its 'children' props.
      //        HOWEVER, this workaround will still have a flaw which a stored place will still be removed
      //        even though user click "No" on the Modal dialog.
      //        PERMANENT SOLUTION: we need useEffect()'s CLEANUP FUNCTION which is the return () of the inner function
      //        of the useEffect.
      console.log("Timer Set");
      onConfirm();
    }, 3000);

    // The Cleanup Function of useEffect() hook
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
    </div>
  );
}
