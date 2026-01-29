class Inference {
    // get the first cell in a 3x3 block 
    static getBlockStart(cell) {
        /* get row and col down to nearest multiple of 3 
           then compute first cell in block */
        let row = Math.floor(cell / 9);
        while (row % 3 != 0) row--;
        let col = cell % 9;
        while (col % 3 != 0) col--;
        return row * 9 + col;
    }
    // carry out basic inference by checking rows and columns to narrow domain
    static basicInference (board, domains) {
        for (let cell = 0; cell < 81; cell++) {
            if (board[cell] == 0) {
                let seen = Array(9).fill(0);
                // check this row
                let row = Math.floor(cell / 9);
                for (let c = 0; c < 9; c++) {
                    let index = row * 9 + c; 
                    if (index != cell && board[index] != 0) seen[board[index] - 1] += 1;
                }
                // check this column
                let col = cell % 9;
                for (let r = 0; r < 9; r++) {
                    let index = r * 9 + col;
                    if (index != cell && board[index] != 0) seen[board[index] - 1] += 1;
                }
                // check block that cell is in
                let block = getBlockStart(cell);
                for (let rAdj = 0; rAdj < 3; rAdj++) {
                    for (let cAdj = 0; cAdj < 3; cAdj++) {
                        let index = block + (rAdj * 9) + cAdj;
                        if (index != cell && board[index] != 0) seen[board[index] - 1] += 1;
                    }
                }
                // add available values to domain 
                for (let i = 0; i < 9; i++) {
                    if (seen[i] == 0) domains[cell].add(seen[i] + 1);
                }
            }
        }
    }
    // carry out higher level inference
    static advancedInference (board, domain) {
        // TODO
    }

}

export default Inference;