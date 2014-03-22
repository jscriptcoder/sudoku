// Uses Node, AMD or browser globals to create a module.
// Please visit https://github.com/umdjs/umd for more info.
(function (root, factory) {

    // UMD

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['./sudoku'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('./sudoku'));
    } else {
        // Browser globals (root is window)
        // Attaches submodule Resolver to Sudoku module
        (root.Sudoku || (root.Sudoku = {})).Resolver = factory(root.Sudoku);
    }

    // End UMD

}(this, function (Sudoku) {

    // Private members

    // We'll use them in the iterations
    var N = 3, NxN = N*N;

    /**
     * Board 9x9
     * @type {Number[][]}
     * @private
     */
    var board = Sudoku.getBoard();

    /**
     * Determines whether or not the value is an array
     * @param {Any} value
     * @returns {Boolean}
     * @private
     */
    var isArray = Sudoku.__isArray__;

    /**
     * Constraint 1: determines whether or not the region in [i, j] position is ok
     * @param {Number} i
     * @param {Number} j
     * @returns {Boolean}
     * @private
     */
    function isRegionOK(i, j) {
        var region = [],
            val;

        // First we need to move the coordinates to the origin of the region
        // where we can star looping through
        i = (Math.floor(i / N) * N);
        j = (Math.floor(j / N) * N);

        for (var ii = i; ii < (ii+N); ii++) {
            for (var jj = j; jj < (jj+N); jj++) {
                val = board[ii][jj];
                if (val !== 0 && region.indexOf(val) === -1) { // is it already in the region?
                    region.push(val); // if not we added it to the list
                } else {
                    return false; // it's already in the region, not good
                }
            }
        }

        return true;

    }

    /**
     * Constraint 2: determines whether or not the row in [i, 0..8] position is ok
     * @param {Number} i
     * @returns {Boolean}
     * @private
     */
    function isRowOK(i) {
        var row = [],
            val;

        for (var jj = 0; jj < 9; jj++) {
            val = board[i][jj];
            if (val !== 0 && row.indexOf(val) === -1) { // is it already in the row?
                row.push(val); // if not we added it to the list
            } else {
                return false; // it's already in the row, :-(
            }
        }

        return true;
    }

    /**
     * Constraint 3: determines whether or not the column in [0..8, j] position is ok
     * @param {Number} j
     * @returns {Boolean}
     * @private
     */
    function isColumnOK(j) {
        var column = [],
            val;

        for (var ii = 0; ii < 9; ii++) {
            val = board[ii][j];
            if (val !== 0 && column.indexOf(val) === -1) { // is it already in the column?
                column.push(val); // if not we added it to the list
            } else {
                return false; // it's already in the column, :-(
            }
        }

        return true;
    }

    /**
     * Moves the coordinates to the next cell to inspect
     * @param {Number[]} ij
     * @returns {Number}
     * @private
     */
    function nextCell(ij) {
        var i = ij[0],
            j = ij[1];

        if (j < 9) {
            return [i, ++j];
        } else {
            j = 0;
            if (i < 9) {
                return [++i, j];
            } else {
                return null;
            }
        }
    }

    /**
     * Recursive function that'll find a solution
     * @param {Number[]} cell
     * @returns {Number}
     * @private
     */
    function findSolution(cell) {
        var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9],
            i = cell[0],
            j = cell[1],
            val = board[i][j];

        if (!val) {
            for (var n = 0; n < 9; n++) {
                board[i][j] = numbers[n];
                if (isRegionOK(i, j) && isRowOK(i) && isColumnOK(j)) {
                    break;
                }
            }
        }

        cell = nextCell([i, j]);
        if (cell) {
            return findSolution(cell);
        } else {
            return board;
        }

    }

    // Public API
    return {

        /**
         * Solves the sudoku using backtracking
         * @param {Number[][]} [board]
         * @private
         */
        solve: function (_board) {
            if (_board) board = Sudoku.setBoard(_board);

            // Let's find a solution starting from [0, 0]
            findSolution([0, 0]);

            console.log(board);
        }
    };

}));