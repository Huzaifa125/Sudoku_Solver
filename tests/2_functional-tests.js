const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let validPuzzle =
    "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";

    suite('Functional Tests', () => {
        test("Solve a puzzle with valid puzzle string: POST request to /api/solve", function(done){
            chai
            .request(server)
            .post("/api/solve")
            .send({ puzzle: validPuzzle})
            .end(function(err, res){
                assert.equal(res.status, 200);
                let complete = 
                    "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
                assert.equal(res.body.solution, complete);
                done();
            })    
        });


            // Solve a puzzle with missing puzzle string
    test("Solve a puzzle with missing puzzle string: POST request to /api/solve", function(done){
        chai
        .request(server)
        .post("/api/solve")
        .send({})
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Required field missing");
            done();
        })    
    });

    // Solve a puzzle with invalid characters
    test("Solve a puzzle with invalid characters: POST request to /api/solve", function(done){
        chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: "1357629849463812577$8459613694517832812936745357824196473298561581673429269145378"})
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Invalid characters in puzzle");
            done();
        })    
    });

    // Solve a puzzle with incorrect length
    test("Solve a puzzle with incorrect length: POST request to /api/solve", function(done){
        chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: "12345.67890"})
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
            done();
        })    
    });

    // Solve a puzzle that cannot be solved
    test("Solve a puzzle that cannot be solved: POST request to /api/solve", function(done){
        chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: "1..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3"})
        .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Puzzle cannot be solved");
            done();
        })    
    });

        // Check a puzzle placement with all fields
        test("Check a puzzle placement with all fields: POST request to /api/check", function(done){
            chai
            .request(server)
            .post("/api/check")
            .send({ puzzle: validPuzzle, coordinate: 'A1', value: '1' })
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.valid, true);
                done();
            })    
        });
    
        // Check a puzzle placement with single placement conflict
        test("Check a puzzle placement with single placement conflict: POST request to /api/check", function(done){
            chai
            .request(server)
            .post("/api/check")
            .send({ puzzle: validPuzzle, coordinate: 'A1', value: '3' })
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.valid, false);
                assert.equal(res.body.conflict.length, 1);
                done();
            })    
        });
    
        // Check a puzzle placement with multiple placement conflicts
        test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check", function(done){
            chai
            .request(server)
            .post("/api/check")
            .send({ puzzle: validPuzzle, coordinate: 'A1', value: '2' })
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.valid, false);
                assert.isAbove(res.body.conflict.length, 1);
                done();
            })    
        });
    
        // Check a puzzle placement with all placement conflicts
        test("Check a puzzle placement with all placement conflicts: POST request to /api/check", function(done){
            chai
            .request(server)
            .post("/api/check")
            .send({ puzzle: validPuzzle, coordinate: 'A1', value: '5' })
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.valid, false);
                assert.equal(res.body.conflict.length, 2);
                done();
            })    
        });
    
        // Check a puzzle placement with missing required fields
        test("Check a puzzle placement with missing required fields: POST request to /api/check", function(done){
            chai
            .request(server)
            .post("/api/check")
            .send({ coordinate: 'A1', value: '1' })
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "Required field(s) missing");
                done();
            })    
        });
    
        // Check a puzzle placement with invalid characters
        test("Check a puzzle placement with invalid characters: POST request to /api/check", function(done){
            chai
            .request(server)
            .post("/api/check")
            .send({ puzzle: validPuzzle, coordinate: 'A1', value: 'A' })
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "Invalid value");
                done();
            })    
        });
    
        // Check a puzzle placement with incorrect length
        test("Check a puzzle placement with incorrect length: POST request to /api/check", function(done){
            chai
            .request(server)
            .post("/api/check")
            .send({ puzzle: validPuzzle, coordinate: 'A1', value: '12' })
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "Invalid value");
                done();
            })    
        });
    
        // Check a puzzle placement with invalid placement coordinate
        test("Check a puzzle placement with invalid placement coordinate: POST request to /api/check", function(done){
            chai
            .request(server)
            .post("/api/check")
            .send({ puzzle: validPuzzle, coordinate: 'K10', value: '1' })
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "Invalid coordinate");
                done();
            })    
        });
    
        // Check a puzzle placement with invalid placement value
        test("Check a puzzle placement with invalid placement value: POST request to /api/check", function(done){
            chai
            .request(server)
            .post("/api/check")
            .send({ puzzle: validPuzzle, coordinate: 'A1', value: '10' })
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.error, "Invalid value");
                done();
            })    
        });


        // test("Solve a puzzle with missing puzzle string: POST request to /api/solve", function(done){
        //     done();
        // })

        // test("Solve a puzzle with invalid characters: POST request to /api/solve", function(done){
        //     done();
        // })

        // test("Solve a puzzle with incorrect length: POST request to /api/solve", function(done){
        //     done();
        // })

        // test("Solve a puzzle that cannot be solved: POST request to /api/solve", function(done){
        //     done();
        // })

        // test("Check a puzzle placement with all fields: POST request to /api/check", function(done){
        //     done();
        // })

        // test("Check a puzzle placement with single placement conflict: POST request to /api/check", function(done){
        //     done();
        // })

        // test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check", function(done){
        //     done();
        // })

        // test("Check a puzzle placement with all placement conflicts: POST request to /api/check", function(done){
        //     done();
        // })

        // test("Check a puzzle placement with missing required fields: POST request to /api/check", function(done){
        //     done();
        // })

        // test("Check a puzzle placement with invalid characters: POST request to /api/check", function(done){
        //     done();
        // })

        // test("Check a puzzle placement with incorrect length: POST request to /api/check", function(done){
        //     done();
        // })

        // test("Check a puzzle placement with invalid placement coordinate: POST request to /api/check", function(done){
        //     done();
        // })

        // test("Check a puzzle placement with invalid placement value: POST request to /api/check", function(done){
        //     done();
        // })
});

