import Block from "./Block.tsx";

function Board({squares, onSquareChange}) {
    return <Block squares={squares} onSquareChange={onSquareChange}/>;
}

export default Board;
