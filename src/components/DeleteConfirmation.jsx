import { useEffect, useState } from "react";

const TIMMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // Showing Progress Bar When Stored Place is going to be removed when timer runs out
  const [remainintTime, setRemainingTimer] = useState(TIMMER);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("INTERVAL");
      setRemainingTimer((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
    }, TIMMER);

    // The Cleanup Function of useEffect() hook
    return () => {
      clearTimeout(timer);
    };
    // Adding a function in the dependency array of useEffect could trigger infinite loop
    // To make it safe, we need to use useCallback hook
  }, [onConfirm]);

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
      {/* Adding a progress bar to show user the timer when a stored place is going to be removed */}
      <progress value={remainintTime} max={TIMMER} />
    </div>
  );
}
