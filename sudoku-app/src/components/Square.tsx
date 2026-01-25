import "./Sqaure.css";

function Square({sqNum, squares, onSquareChange}) {

    const prefilled = ""

    return <input id={sqNum} className={prefilled} type="text"/>;

}

export default Square;
