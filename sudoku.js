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

    // We'll use them in the iterations
    var N = 3, NxN = N*N;

    /**
     * Board 9x9
     * @type {Number[][]}
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

    // Public API
    return {

        /**
         * Clears the board, setting all its cells to 0
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
         */
        strBoard: function () {
            var str = '';

            str = '\n+-----------------------+\n';
            for (var i = 0; i < NxN; i++) {

                for (var j = 0; j < NxN; j++) {

                    if (j === 0)  str += '|';
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
         */
        getBoard: function () {
            return board;
        },

        /**
         * Sets the board
         * @param {Number[][]} _board
         */
        setBoard: function (_board) {
            board = _board;
        },

        /**
         * Displays the board in the console
         */
        display: function () {
            console.log(this.strBoard());
        }

    };

}));