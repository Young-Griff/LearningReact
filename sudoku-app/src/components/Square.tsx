import { useState } from "react";
import "./Sqaure.css";

function Square({sqNum, getVal, onSquareChange}) {

    let prefilled = "";
    let val = "";
    if (getVal(sqNum, true) != 0) {
        prefilled = "prefilled";
        val = getVal(sqNum, true);
    }
    else if (getVal(sqNum, false) != 0) {
        val = getVal(sqNum, false);
    }

    function inputHandler(evt) {
        let newVal = getVal(sqNum, false);
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
            onKeyUp={evt => inputHandler(evt)}
        />
    );

}

export default Square;
