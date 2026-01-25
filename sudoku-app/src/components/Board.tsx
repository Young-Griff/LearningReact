import Block from "./Block.tsx";
import "./Board.css";

function Board({squares, onSquareChange}) {
    return (
        <div>
            <div className={"boardRow"}>
                <Block blockNum={0} squares={squares} onSquareChange={onSquareChange}/>
                <Block blockNum={1} squares={squares} onSquareChange={onSquareChange}/>
                <Block blockNum={2} squares={squares} onSquareChange={onSquareChange}/>
            </div>
            <div className={"boardRow"}>
                <Block blockNum={3} squares={squares} onSquareChange={onSquareChange}/>
                <Block blockNum={4} squares={squares} onSquareChange={onSquareChange}/>
                <Block blockNum={5} squares={squares} onSquareChange={onSquareChange}/>
            </div>
            <div className={"boardRow"}>
                <Block blockNum={6} squares={squares} onSquareChange={onSquareChange}/>
                <Block blockNum={7} squares={squares} onSquareChange={onSquareChange}/>
                <Block blockNum={8} squares={squares} onSquareChange={onSquareChange}/>
            </div>
        </div>
    );
}

export default Board;
