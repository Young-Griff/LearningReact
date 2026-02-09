import {useEffect, useState} from "react";
import "./ToolBar.css";

function ToolBar ({history, setHistory, setSquares, solver}) {

  // set up timer
  const [time, setTime] = useState(0);
  const [timerRun, setTimerRun] = useState(true);
  
  useEffect(() => {
    let interval = null;

    if (timerRun && time < 3600) {
      interval = setInterval(function() {
        setTime(time + 1);
      }, 1000);
    }
    else clearInterval(interval);
    return () => clearInterval(interval);
  }, [timerRun, time]);

  function formatTime (time) {
    let mins = Math.floor(time / 60);
    let secs = time % 60;
    let ret = "" + String(mins).padStart(2, '0') + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  function TimerDisplay () {
    return <p className="timer-display" id="timer">{formatTime(time)}</p>;
  }

  function TimerButton () {
    let label = timerRun ? "Pause" : "Play";
    return <button className="toolbar-button" onClick={() => switchTimer()}>{label}</button>
  }

  function switchTimer () {
    if (timerRun) setTimerRun(false);
    else setTimerRun(true);
    console.log("RUN: ", timerRun);
  }

  // set up undo button
  function UnDo () {
    console.log("HIST INIT: ", history)
    if (history.length == 1) setSquares(history[0].slice());
    else if (history.length > 1) {
      let newBoard = history[history.length - 1].slice();
      console.log("NB: ", newBoard);
      setSquares(newBoard);
      setHistory(history.slice(0, -1));
      console.log("HIST: ", history);
    }
  }

  function UnDoButton () {
    return <button className="toolbar-button" onClick={() => UnDo()}>Undo</button>;
  }

  // set up solver button
  function SolveButton () {
    return <button className="toolbar-button" onClick={() => solver()}>Solve</button>;
  }


  return (
    <div className="toolbar-div">
      <TimerDisplay />
      <TimerButton />
      <UnDoButton />
      <SolveButton />
    </div>);

}

export default ToolBar;