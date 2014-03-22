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

    // We'll use them in the iterations
    var N = 3, NxN = N*N;

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
                    board[i][j] = 0;
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
         * Returns the board matrix
         * @returns {Number[][]}
         * @memberof Sudoku
         * @public
         */
        getBoard: function () {
            return board;
        },

        /**
         * Sets the board
         * @param {Number[][]} _board
         * @throws {Error} Wrong board
         * @memberof Sudoku
         * @returns {Number[][]}
         * @public
         */
        setBoard: function (_board) {
            if (isArray(_board) && _board.length === 9) {
                board = _board;
            } else {
                throw Error('Wrong board');
            }
        },

        /**
         * Displays the board in the console
         * @memberof Sudoku
         * @public
         */
        display: function () {
            console.log(this.toString());
        },

        /**
         * Sets a value to the cell [i, j]
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
         * Exposes isArray method to be used by submodules
         * @memberof Sudoku
         * @protected
         */
        __isArray__: isArray

    }

}));