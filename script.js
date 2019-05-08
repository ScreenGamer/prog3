// var matrix = [
//     [1,1,1,1,1],
//     [1,1,2,2,1],
//     [1,1,4,2,1],
//     [1,1,2,2,1],
//     [1,2,1,1,2]
// ] 

let matrix = []; // Մատրիցի ստեղծում
let rows = 70; // Տողերի քանակ
let columns = 70; // Սյուների քանակ

for (let y = 0; y < rows; y++) {
    matrix[y] = []; // Մատրիցի նոր տողի ստեղծում
    for (let x = 0; x < columns; x++) {
        let a = Math.floor(Math.random() * 100);
        if (a >= 0 && a < 20) {
            matrix[y][x] = 0; // Մատրիցի 20 տոկոսը կլինի 0
        }
        if (a >= 20 && a < 60) {
            matrix[y][x] = 1; // Մատրիցի 40 տոկոսը կլինի 1
        }
        else if (a >= 60 && a < 80) {
            matrix[y][x] = 2; // Մատրիցի 20 տոկոսը կլինի 2
        }
        else if (a >= 80 && a < 85) {
            matrix[y][x] = 3; // Մատրիցի 5 տոկոսը կլինի 3
        }
        else if (a >= 85 && a < 99) {
            matrix[y][x] = 4; // Մատրիցի 14 տոկոսը կլինի 4
        }
        else if (a >= 99 && a < 100) {
            matrix[y][x] = 5; // Մատրիցի 1 տոկոսը կլինի 5
        }
    }
}

var side = 10;
var grassArr = [];
var xotakerArr = [];
var gishatichArr = [];
var homoArr = [];
var dragonArr = [];
var fireArr = [];

function setup() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var xt = new Xotaker(x, y)
                xotakerArr.push(xt)
            }
            else if (matrix[y][x] == 3) {
                var gsh = new Gishatich(x, y)
                gishatichArr.push(gsh)
            }
            else if (matrix[y][x] == 4) {
                var hs = new HomoErectus(x, y)
                homoArr.push(hs)
            }
            else if (matrix[y][x] == 5) {
                var d = new Dragon(x, y)
                dragonArr.push(d)
            }
            else if (matrix[y][x] == 6) {
                var fr = new Fire(x, y)
                fireArr.push(fr)
            }

        }
    }

    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
}




function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("#f9d252");
            }
            else if (matrix[y][x] == 5) {
                fill("#6a0ad1");
            }
            else if (matrix[y][x] == 6) {
                fill("#FFA000");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }

            rect(x * side, y * side, side, side)
        }
    }

    for (var i in grassArr) {
        grassArr[i].mult()
    }


    for (var i in xotakerArr) {
        xotakerArr[i].move()
        xotakerArr[i].mult()
        xotakerArr[i].eat()
        xotakerArr[i].die()
    }

    for (var i in gishatichArr) {
        gishatichArr[i].move()
        gishatichArr[i].mult()
        gishatichArr[i].eat()
        gishatichArr[i].die()
    }

    for (var i in homoArr) {
        homoArr[i].move()
        homoArr[i].mult()
        homoArr[i].eat()
        homoArr[i].die()
    }

    for (var i in dragonArr) {
        dragonArr[i].fire()
        dragonArr[i].move()
        dragonArr[i].mult()
        dragonArr[i].eat()
        dragonArr[i].die()
    }
    for (var i in fireArr) {
        fireArr[i].move()
        fireArr[i].die()
    }

}

