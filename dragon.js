standart = require("./class.js");
fire = require("./fire.js")

module.exports = class Dragon extends Standart {
    constructor(x, y,index) {
        super(x,y,index)
        // this.x = x;
        // this.y = y;
        // this.index = index;
        this.energy = 40;
    
    }

    DirectionForFire() {
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

    getNewDirections() {
        this.directions = [
            [this.x - 3, this.y - 3],
                [this.x - 2, this.y - 3],
                [this.x - 1, this.y - 3],
                [this.x, this.y - 3],
                [this.x + 1, this.y - 3],
                [this.x + 2, this.y - 3],
                [this.x + 3, this.y - 3],
                [this.x - 3, this.y - 2],
                [this.x - 3, this.y - 1],
                [this.x - 3, this.y],
                [this.x - 3, this.y + 1],
                [this.x - 3, this.y + 2],
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
                [this.x + 3, this.y + 2],
                [this.x + 3, this.y + 1],
                [this.x + 3, this.y],
                [this.x + 3, this.y - 1],
                [this.x + 3, this.y - 2],
                [this.x - 3, this.y + 3],
                [this.x - 2, this.y + 3],
                [this.x - 1, this.y + 3],
                [this.x, this.y + 3],
                [this.x + 1, this.y + 3],
                [this.x + 2, this.y + 3],
                [this.x + 3, this.y + 3],
            ]
    }

    chooseCell(character) {
        this.getNewDirections()
        return super.chooseCell(character)

    }

    chooseCellFire(character) {
        this.DirectionForFire()
        var found = []
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }

        }
        return found;

    }

    mult() {
        let cells = this.chooseCell(0);
        var empty = cells[Math.floor(Math.random()*cells.length)]
        if (empty && this.energy > 50) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 5
            var d = new Dragon(newX, newY)
            dragonArr.push(d)
            this.energy = 40
        }
    }

    move() {
        let cells = this.chooseCell(0);
        var empty = cells[Math.floor(Math.random()*cells.length)]
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY
            this.energy -= 6;
        }
    }

    eat() {
        var grass = this.chooseCell(1)
        var xotaker = this.chooseCell(2)
        var gishatich = this.chooseCell(3)
        var homo = this.chooseCell(4)
        var all = grass.concat(xotaker,gishatich,homo)
        var food = all[Math.floor(Math.random()*all.length)]
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0

            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1)
                    this.x = newX
                    this.y = newY
                    this.energy += 1
                }
            }
            for (var i in xotakerArr) {
                if (xotakerArr[i].x == newX && xotakerArr[i].y == newY) {
                    xotakerArr.splice(i, 1)
                    this.x = newX
                    this.y = newY
                    this.energy += 5
                }
            }
            for (var i in gishatichArr) {
                if (gishatichArr[i].x == newX && gishatichArr[i].y == newY) {
                    gishatichArr.splice(i, 1)
                    this.x = newX
                    this.y = newY
                    this.energy += 6
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
        }
    }
    fire() {
        let cells = this.chooseCell(0);
        var empty = cells[Math.floor(Math.random()*cells.length)]
        if (empty && this.energy > 30) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 6
            var fr = new Fire(newX, newY)
            fireArr.push(fr)
            this.energy -= 10
        }
    }


    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in dragonArr) {
                if (dragonArr[i].x == this.x && dragonArr[i].y == this.y) {
                    dragonArr.splice(i, 0)
                }
            }
        }
    }
}