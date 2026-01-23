import Square from "./Square.tsx";

function Block({squares, onSquareChange}) {

    return <Square squares={squares} onSquareChange={onSquareChange}/>;

}

export default Block;
