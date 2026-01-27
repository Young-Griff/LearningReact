import "./Block.css";
import Square from "./Square.tsx";

function Block({blockNum, getVal, onSquareChange}) {

    // get the row of blocks that this block is in
    const blockRow = Math.floor(blockNum / 3);
    // have and add in for each square in prior row of blocks
    const addRow = blockRow * 3 * 9;
    // have offset for col of blocks this block is in
    const addCol = (blockNum % 3) * 3;

    return (
        <div className={"block"}>
            <div className={"blockRow"}>
                <Square sqNum={0 + addRow + addCol} getVal={getVal} onSquareChange={onSquareChange}/>
                <Square sqNum={1 + addRow + addCol} getVal={getVal} onSquareChange={onSquareChange}/>
                <Square sqNum={2 + addRow + addCol} getVal={getVal} onSquareChange={onSquareChange}/>
            </div>
            <div className={"blockRow"}>
                <Square sqNum={9 + addRow + addCol} getVal={getVal} onSquareChange={onSquareChange}/>
                <Square sqNum={10 + addRow + addCol} getVal={getVal} onSquareChange={onSquareChange}/>
                <Square sqNum={11 + addRow + addCol} getVal={getVal} onSquareChange={onSquareChange}/>
            </div>
            <div className={"blockRow"}>
                <Square sqNum={18 + addRow + addCol} getVal={getVal} onSquareChange={onSquareChange}/>
                <Square sqNum={19 + addRow + addCol} getVal={getVal} onSquareChange={onSquareChange}/>
                <Square sqNum={20 + addRow + addCol} getVal={getVal} onSquareChange={onSquareChange}/>
            </div>
        </div>
    );

}

export default Block;
