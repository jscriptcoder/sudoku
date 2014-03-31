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

    /**
     * @constant
     * @type {Number}
     * @default 3
     */
    var N = 3;

    /**
     * Constraint 1: determines whether or not the number is in the region [i, j]
     * @param {Number} num
     * @param {Number} i
     * @param {Number} j
     * @returns {Boolean}
     * @private
     */
    function inRegion(num, i, j) {

        // First we need to move the coordinates to the origin of the region
        // where we can start looping through
        i = (Math.floor(i / N) * N);
        j = (Math.floor(j / N) * N);

        for (var ii = i; ii < (i+N); ii++) {
            for (var jj = j; jj < (j+N); jj++) {
                if (num === Sudoku.getValue(ii, jj)) {
                    return true;
                }
            }
        }

        return false;

    }

    /**
     * Constraint 2: determines whether or not the number is in the row [i, 0..8]
     * @param {Number} num
     * @param {Number} i
     * @returns {Boolean}
     * @private
     */
    function inRow(num, i) {

        for (var jj = 0; jj < 9; jj++) {
            if (num === Sudoku.getValue(i, jj)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Constraint 3: determines whether or not the number is in column [0..8, j]
     * @param {Number} num
     * @param {Number} j
     * @returns {Boolean}
     * @private
     */
    function inColumn(num, j) {

        for (var ii = 0; ii < 9; ii++) {
            if (num === Sudoku.getValue(ii, j)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Moves the coordinates to the next cell to inspect
     * @param {Number[]} cell
     * @returns {Number[]}
     * @private
     */
    function nextCell(cell) {
        var i = cell[0],
            j = cell[1];

        if (j < 8) {
            return [i, ++j];
        } else {
            j = 0;
            if (i < 8) {
                return [++i, j];
            } else {
                return null;
            }
        }
    }

    /**
     * Determines whether or not we're good with that number in cell [i, j]
     * @param {Number} numm
     * @param {Number} i
     * @param {Number} j
     * @returns {Boolean}
     * @private
     */
    function isGood(num, i, j) {

        if (!inRegion(num, i, j) && // fulfils constraint 1?
            !inRow(num, i) && // fulfils constraint 2?
            !inColumn(num, j)) { // fulfils constraint 3?

            Sudoku.setValue(num, i, j);

            if (findSolution(nextCell([i, j]))) {
                return true;
            } else {
                // There is no solution with this value. Let's empty it
                // and try again with the next number
                Sudoku.emptyCell(i, j);
                return false;
            }

        }

        return false;

    }

    /**
     * Recursive function that will find a solution
     * @param {Number[]} cell
     * @returns {Boolean}
     * @private
     */
    function findSolution(cell) {

        if (cell) {

            var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9], 
                found = false,
                i = cell[0],
                j = cell[1];

            if (Sudoku.isCellEmpty(i, j)) {

                for (var n = 0; n < 9; n++) {
                    found = isGood(numbers[n], i, j);
                    if (found) break;
                }

                return found;

            } else {
                // This cells is already populated. Move to the next one
                return findSolution(nextCell([i, j]));
            }

        } else {
            // It's over. We've iterated over all the cells,
            // and we found a final solution
            return true;
        }

    }

    // Public API
    return {

        /**
         * Solves the sudoku using backtracking
         * @param {Number[][]} [_board]
         * @memberof Sudoku.Resolver
         * @private
         */
        solve: function (_board) {
            var start, end, isSolved
            
            if (_board) Sudoku.set(_board);

            console.log('Initial board:');
            Sudoku.display();

            start = (new Date()).getTime();
            
            // Let's find a solution starting from [0, 0]
            isSolved = findSolution([0, 0]);

            end = (new Date()).getTime();
            
            if (isSolved) {
                console.log('Solution:');
                Sudoku.display();    
            } else {
                console.log('No solution found for this board :-(');
            }
            
            
            console.log('Execution time (ms):', end - start);
        }
    };

}));