import Inference from './Inference.tsx';

function Solver(board: number[]) {

    // get a domain of available moves for each cell
    const domains = Array(81).fill(new Set());
    // update domains
    // do basic inference
    function updateDomains (board, domains) {
        Inference.basicInference(board, domains);
        Inference.advancedInference(board, domains);
    }
    
    /** make move based on inference:
     *      return true if a clear move exists (domain.size == 1)
     *      otherwise return false (no clear move)
     **/
    function definiteMove(board, domains) {
        // simply pick first domain that has only 1 option
        for (let c = 0; c < 81; c++) {
            if (domains[c].size == 1) {
                const entries = domains[c].values()
                board[c] = entries.next().value;
                return true;
            }
        }
        return false;
    }

}

export default Solver;