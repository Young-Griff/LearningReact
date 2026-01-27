import Block from "./Block.tsx";
import "./Board.css";

function Board({getVal, onSquareChange}) {
    return (
        <div>
            <div className={"boardRow"}>
                <Block blockNum={0} getVal={getVal} onSquareChange={onSquareChange}/>
                <Block blockNum={1} getVal={getVal} onSquareChange={onSquareChange}/>
                <Block blockNum={2} getVal={getVal} onSquareChange={onSquareChange}/>
            </div>
            <div className={"boardRow"}>
                <Block blockNum={3} getVal={getVal} onSquareChange={onSquareChange}/>
                <Block blockNum={4} getVal={getVal} onSquareChange={onSquareChange}/>
                <Block blockNum={5} getVal={getVal} onSquareChange={onSquareChange}/>
            </div>
            <div className={"boardRow"}>
                <Block blockNum={6} getVal={getVal} onSquareChange={onSquareChange}/>
                <Block blockNum={7} getVal={getVal} onSquareChange={onSquareChange}/>
                <Block blockNum={8} getVal={getVal} onSquareChange={onSquareChange}/>
            </div>
        </div>
    );
}

export default Board;
