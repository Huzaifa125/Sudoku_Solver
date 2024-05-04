const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();


    suite("UnitTests", () => {
        suite("solver tests", function(){
            test("Logic handles a valid puzzle string of 81 charachters", function(done){
                const validPuzzle = "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
                const result = solver.validate(validPuzzle);
                assert.equal(result, "Valid", "Should return 'Valid' for a valid puzzle string.");            
            done();
            });

            test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function(done) {
                const invalidPuzzle = "135762984946381257728459613$94517832812936745357824196473298561581673429269145378";
                const result = solver.validate(invalidPuzzle);
                assert.equal(result, "Invalid characters in puzzle", "Should return 'Invalid characters in puzzle' for a puzzle with invalid characters.");
            done();  
            });

            test('Logic handles a puzzle string that is not 81 characters in length', function(done) {
                const invalidLengthPuzzle = "1.51.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37..";
                const result = solver.validate(invalidLengthPuzzle);
                assert.equal(result, "Expected puzzle to be 81 characters long", "Should return 'Expected puzzle to be 81 characters long' for an invalid length puzzle string.");
            done();
            });

            test('Logic handles a valid row placement', function(done) {
                const validPuzzle = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
                const result = solver.checkRowPlacement(validPuzzle, 'A', 1, 7);
                assert.isTrue(result, "Should return true for a valid row placement.");
            done();  
            });

            test('Logic handles an invalid row placement', function(done) {
                const invalidPuzzle = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
                const result = solver.checkRowPlacement(invalidPuzzle, 'A', 1, 1);
                assert.isFalse(result, "Should return false for an invalid row placement.");
            done();  
            });

            test('Logic handles a valid column placement', function(done) {
                const validPuzzle = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
                const result = solver.checkColPlacement(validPuzzle, 'A', 1, 7);
                assert.isTrue(result, "Should return true for a valid column placement.");
            done();  
            });

            test('Logic handles an invalid column placement', function(done) {
                const invalidPuzzle = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
                const result = solver.checkColPlacement(invalidPuzzle, 'A', 9, 1);
                assert.isFalse(result, "Should return false for an invalid column placement.");
            done();  
            });
            
            test('Logic handles a valid region (3x3 grid) placement', function(done) {
                const validPuzzle = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
                const result = solver.checkRegionPlacement(validPuzzle, 'A', 1, 7);
                assert.isTrue(result, "Should return true for a valid region (3x3 grid) placement.");
            done();  
            });
            
            test('Logic handles an invalid region (3x3 grid) placement', function(done) {
                const invalidPuzzle = "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
                const result = solver.checkRegionPlacement(invalidPuzzle, 'A', 1, 1);
                assert.isFalse(result, "Should return false for an invalid region (3x3 grid) placement.");
            done();  
            });
            
            test('Valid puzzle strings pass the solver', function(done) {
                const validPuzzle = "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
                const result = solver.solveSudoku(validPuzzle);
                assert.isNotFalse(result, "Should return a valid solution for a valid puzzle string.");
            done();
            });
            
            test('Invalid puzzle strings fail the solver', function(done) {
                const invalidPuzzle = "1.5..2.84..63.12.7.1..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."; // Invalid length
                const result = solver.completeSudoku(invalidPuzzle);
                assert.isFalse(result, "Should return false for an invalid puzzle string.");
            done();  
            });
            
            test('Solver returns the expected solution for an incomplete puzzle', function(done) {
                const incompletePuzzle = "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
                const expectedSolution = "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
                const result = solver.solveSudoku(incompletePuzzle);
                assert.strictEqual(result, expectedSolution, "Should return the expected solution for an incomplete puzzle.");
            done();  
            });

        })
    })


suite('Unit Tests', () => {

});
