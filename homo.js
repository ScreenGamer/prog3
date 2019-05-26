standart = require("./class.js");

module.exports = class HomoErectus extends Standart {
    constructor(x, y,index) {
        super(x,y,index)
        // this.x = x;
        // this.y = y;
        // this.index = index;
        this.energy = 25;
    }

    getNewDirections() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
        ]
    }

    chooseCell(character) {
        this.getNewDirections()
        return super.chooseCell(character)

    }

    mult() {
        let cells = this.chooseCell(0);
        var empty = cells[Math.floor(Math.random()*cells.length)]
        if (empty && this.energy > 30) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 4
            var hs = new HomoErectus(newX, newY)
            homoArr.push(hs)
            this.energy = 25
        }
    }

    move() {
        let cells = this.chooseCell(0);
        var empty = cells[Math.floor(Math.random()*cells.length)]
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY
            this.energy -= 2;
        }
    }

    eat() {
        var xotaker = this.chooseCell(2)
        var grass = this.chooseCell(1)
        var all = xotaker.concat(grass);
        var food = all[Math.floor(Math.random()*all.length)]
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0

            for (var i in xotakerArr) {
                if (xotakerArr[i].x == newX && xotakerArr[i].y == newY) {
                    xotakerArr.splice(i, 1)
                    this.x = newX
                    this.y = newY
                    this.energy += 7
                }
            }

            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1)
                    this.x = newX
                    this.y = newY
                    this.energy += 2
                }
            }
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in homoArr) {
                if (homoArr[i].x == this.x && homoArr[i].y == this.y) {
                    homoArr.splice(i, 1)
                }
            }
        }
    }
}