import { useState } from "react";
import "./Sqaure.css";

function Square({ sqNum, getVal, onSquareChange }) {
  let prefilled = "";
  let val = "";
  if (getVal(sqNum, true) != 0) {
    prefilled = "prefilled";
    val = getVal(sqNum, true);
  } else if (getVal(sqNum, false) != 0) {
    val = getVal(sqNum, false);
  }

  function inputHandler(evt) {
    let newVal = getVal(sqNum, false);
    // switch to handle movement
    switch (evt.key) {
      case "ArrowDown":
        if (sqNum < 72) {
          sqNum = sqNum + 9;
          newVal = -1;
        }
      case "ArrowUp":
        if (sqNum > 8) {
          sqNum = sqNum - 9;
          newVal = -1;
        }
      case "ArrowRight":
        if (sqNum % 9 < 8) {
          sqNum = sqNum + 1;
          newVal = -1;
        }
      case "ArrowLeft":
        if (sqNum % 8 > 0) {
          sqNum = sqNum - 1;
          newVal = -1;
        }
    }
    // handle deletes and moves
    if (evt.key == "Backspace" || evt.key == "Delete") newVal = 0;
    if (evt.key.charAt(0) < 10 && evt.key.charAt(0) > 0) {
      newVal = evt.key.charAt(0);
    }
    onSquareChange(sqNum, newVal);
  }

  return (
    <input
      id={sqNum}
      className={prefilled}
      type="text"
      value={val}
      onKeyUp={(evt) => inputHandler(evt)}
    />
  );
}

export default Square;
