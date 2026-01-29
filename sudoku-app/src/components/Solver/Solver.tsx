import Inference from "./Inference.tsx";

class Solver {
  board: number[];
  domains: Set<number>[];

  constructor(board: number[]) {
    this.board = board;
    // get a domain of available moves for each cell
    this.domains = Array(81).fill(new Set<number>());
  }

  // carry out process of solving board
  // update domains through inference
  updateDomains() {
    Inference.basicInference(this.board, this.domains);
    Inference.advancedInference(this.board, this.domains);
  }

  /** make move based on inference:
   *      return true if a clear move exists (domain.size == 1)
   *      otherwise return false (no clear move)
   **/
  definiteMove() {
    // simply pick first domain that has only 1 option
    for (let c = 0; c < 81; c++) {
      if (this.domains[c].size == 1) {
        const entries = this.domains[c].values();
        this.board[c] = entries.next().value as number;
        return true;
      }
    }
    return false;
  }

  /**  when no clear move is available, an estimate on the next move is made
   *   do this by choosing the first element in the domain of the cell with
   *   the smallest domain.
   *        return: index to make move in, if no valid move return -1
   */
  estimateMove() {
    // find smallest domain that is not 0
    let minDomain = 10;
    let minIndex = -1;
    for (let cell = 0; cell < 81; cell++) {
      if (this.domains[cell].size != 0) {
        if (minDomain > this.domains[cell].size) {
          minDomain = this.domains[cell].size;
          minIndex = cell;
        }
      }
    }
    return minIndex;
  }

  // helper functions
  isValid() {
    // check to see if an empty cell has an empty domain (i.e. no valid moves)
    for (let cell = 0; cell < 81; cell++) {
      if (this.board[cell] == 0 && this.domains[cell].size == 0) return false;
    }
    return true;
  }

  static isSolved(board: number[]) {
    // check rows
    for (let r = 0; r < 9; r++) {
      let row = new Set(board.slice(r * 9, r * 9 + 9));
      for (let v = 1; v <= 9; v++) {
        if (!row.has(v)) return false;
      }
    }
    // check columns
    for (let c = 0; c < 9; c++) {
      let col = new Set();
      for (let r = 0; r < 9; r++) col.add(board[r * 9 + c]);
      for (let v = 1; v <= 9; v++) {
        if (!col.has(v)) return false;
      }
    }
    // check block
    for (let r = 0; r < 9; r = r + 3) {
      for (let c = 0; c < 9; c = c + 3) {
        let block = new Set();
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) block.add(board[(r + i) * 9 + c + j]);
        }
        for (let v = 1; v <= 9; v++) {
          if (!block.has(v)) return false;
        }
      }
    }
    // all rows, cols, and blocks fully (and properly) filled
    return true;
  }
}

export default Solver;
