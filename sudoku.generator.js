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
        (root.Sudoku || (root.Sudoku = {})).Generator = factory(root.Sudoku);
    }

    // End UMD

}(this, function (Sudoku) {

    // Private members

    // We'll use them in the iterations
    var N = 3, NxN = N*N;

    // Public API
    return {
        
        /**
         * Creates a new Sudoku board based on a seed if provided
         * @param {String} [seed]
         * @public
         */
        create: function (seed) {
            
        }
        
    };

}));