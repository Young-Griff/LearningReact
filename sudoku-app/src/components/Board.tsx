import Block from "./Block.tsx";

function Board(squares: number[], onSquareChange: ()=>void) {
    return <Block squares={squares} onSquareChange={onSquareChange}/>;
}

export default Board;
