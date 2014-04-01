// Uses Node, AMD or browser globals to create a module.
// Please visit https://github.com/umdjs/umd for more info.
(function (root, factory) {

    // UMD

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.Sudoku = factory();
    }

    // End UMD

}(this, function () {

    // Private members

    var
        /**
         * @constant
         * @type {Number}
         * @default 3
         */
        N = 3,

        /**
         * @constant
         * @type {Number}
         * @default 3*3
         */
        NxN = N* N,

        /**
         * @constant
         * @type {Number}
         * @default 0
         */
        EMPTY = 0;

    /**
     * Board 9x9
     * @type {Number[][]}
     * @private
     */
    var board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    /**
     * Determines whether or not the value is an array
     * @param {Any} value
     * @returns {Boolean}
     * @private
     */
    function isArray(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    }

    /**
     * Looks for repeated numbers in all the rows and columns, and if there aren't, returns true.
     * By checking both rows and columns in the same loop we improve just a bit the performance
     * @param {Number[][]} [_board]
     * @returns {Boolean}
     * @private
     */
    function isLinesOk(_board) {
        var _board = _board || board, 
            row, column, 
            numRow, numColumn, 
            inRow, inColumn, 
            i, j;

        i = NxN;
        while (i--) {

            row = [], column = [];

            j = NxN;
            while (j--) { 

                numRow = _board[i][j], numColumn = _board[j][i];
                
                inRow = row.indexOf(numRow) > -1;
                inColumn = column.indexOf(numColumn) > -1;

                if (inRow || inColumn) {
                    return false;
                } else {
                    if (numRow !== EMPTY) row.push(numRow);
                    if (numColumn !== EMPTY) column.push(numColumn);
                }
                
            }
            
        }

        // no repeated numbers found
        return true;
    }
    
    /**
     * Goes through all the regions looking for repeated numbers, and returning true if not found
     * @param {Number[][]} [_board]
     * @returns {Boolean}
     * @private
     */
    function isRegionsOk(_board) {
        var region, num, _board = _board || board;
        
        for (var ri = 0; ri < NxN; ri += N) {
            for (var rj = 0; rj < NxN; rj += N) {
                
                region = [];
                
                for (var i = ri; i < (ri+N); i++) {
                    for (var j = rj; j < (rj+N); j++) {
                        
                        num = _board[i][j];
                        
                        if (region.indexOf(num) > -1) {
                            return false;
                        } else {
                            if (num !== EMPTY) region.push(num);
                        }
                    }
                }
                
            }
        }
        
        // no repeated numbers found in the region
        return true;
        
    }
    
    // Public API
    return {

        /**
         * Clears the board, setting all its cells to 0
         * @memberof Sudoku
         * @public
         */
        clear: function () {
            for (var i = 0; i < NxN; i++) {
                for (var j = 0; j < NxN; j++) {
                    board[i][j] = EMPTY;
                }
            }
        },

        /**
         * Returns the string representation of the board
         * @returns {String}
         * @memberof Sudoku
         * @public
         */
        toString: function () {
            var str;

            str = '\n+-----------------------+\n';
            for (var i = 0; i < NxN; i++) {

                str += '|';
                for (var j = 0; j < NxN; j++) {

                    str += ' ' + board[i][j];
                    if ((j+1)%N === 0) str += ' |';
                }
                str += '\n';

                if ((i+1)%N === 0 && (i+1) !== NxN) {
                    str += '|-------+-------+-------|\n';
                }

            }
            str += '+-----------------------+\n';

            return str;
        },

        /**
         * Determines whether or not the board is correct
         * @param {Number[][]} [_board]
         * @returns {Boolean}
         * @memberof Sudoku
         * @public
         */
        isCorrect: function (_board) {
            _board = _board || board;
            
            return isArray(_board) && 
                _board.length === NxN && 
                _board[0].length === NxN && 
                _board[NxN-1].length === NxN && 
                isLinesOk(_board) && 
                isRegionsOk(_board);
        },
        
        /**
         * Returns the board matrix
         * @returns {Number[][]}
         * @memberof Sudoku
         * @public
         */
        get: function () {
            return board;
        },

        /**
         * Sets the board
         * @param {Number[][]} _board
         * @throws {Error} Wrong board
         * @memberof Sudoku
         * @public
         */
        set: function (_board) {
            if (this.isCorrect(_board)) {
                board = _board;
            } else {
                throw Error('Wrong board');
            }
        },

        /**
         * Displays the string representation of the board in the console
         * @memberof Sudoku
         * @public
         */
        display: function () {
            console.log(this.toString());
        },

        /**
         * Gets the value from the cell [i, j]
         * @param {Number} i
         * @param {Number} j
         * @return {Number}
         * @memberof Sudoku
         * @public
         */
        getValue: function (i, j) {
            return board[i][j];
        },

        /**
         * Sets a value of the cell [i, j]
         * @param {Number} val
         * @param {Number} i
         * @param {Number} j
         * @memberof Sudoku
         * @public
         */
        setValue: function (val, i, j) {
            board[i][j] = val;
        },

        /**
         * Indicates whether the cell is empty
         * @param {Number} i
         * @param {Number} j
         * @return {Boolean}
         * @memberof Sudoku
         * @public
         */
        isCellEmpty: function (i, j) {
            return !board[i][j];
        },

        /**
         * Empties the cell [i, j]
         * @param {Number} i
         * @param {Number} j
         * @memberof Sudoku
         * @public
         */
        emptyCell: function (i, j) {
            this.setValue(EMPTY, i, j);
        },

        /**
         * Exposes isArray method to be used by submodules
         * @memberof Sudoku
         * @protected
         */
        __isArray__: isArray

    }

}));