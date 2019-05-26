standart = require("./class.js");

module.exports = class Gishatich extends Standart {
    constructor(x, y,index) {
        super(x,y,index)
        // this.x = x;
        // this.y = y;
        // this.index = index;
        this.energy = 10;
    }

    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(character) {
        this.getNewDirections()
        return super.chooseCell(character)

    }

    mult() {
        let cells = this.chooseCell(0);
        var empty = cells[Math.floor(Math.random()*cells.length)]
        if (empty && this.energy > 15) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3
            var gsh = new Gishatich(newX, newY)
            gishatichArr.push(gsh)
            this.energy = 10 
        }
    }

    move() {
        let cells = this.chooseCell(0);
        var empty = cells[Math.floor(Math.random()*cells.length)]
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY
            this.energy --;
        }
    }

    eat() {
        var xotaker = this.chooseCell(2)
        var homo = this.chooseCell(4)
        var grass = this.chooseCell(1)
        var all = xotaker.concat(homo,grass)
        var food = all[Math.floor(Math.random()*all.length)]
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0

            for (var i in xotakerArr) {
                if (xotakerArr[i].x == newX && xotakerArr[i].y == newY) {
                    xotakerArr.splice(i, 1)
                    this.x = newX
                    this.y = newY
                    this.energy += 5
                }
            }
            for (var i in homoArr) {
                if (homoArr[i].x == newX && homoArr[i].y == newY) {
                    homoArr.splice(i, 1)
                    this.x = newX
                    this.y = newY
                    this.energy += 4
                }
            }
            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1)
                    this.x = newX
                    this.y = newY
                    this.energy += 1
                }
            }
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in gishatichArr) {
                if (gishatichArr[i].x == this.x && gishatichArr[i].y == this.y) {
                    gishatichArr.splice(i, 1)
                }
            }
        }
    }
}