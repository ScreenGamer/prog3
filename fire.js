standart = require("./class.js");

module.exports = class Fire extends Standart {
    constructor(x, y,index) {
        super(x,y,index)
        // this.x = x;
        // this.y = y;
        // this.index = index;
        this.energy = 5
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
    move() {
        let cells = this.chooseCell(1);
        var grass = cells[Math.floor(Math.random()*cells.length)]
        if(grass && this.energy > 4){
            var newX = grass[0]
            var newY = grass[1]
            matrix[newY][newX] = 6
            var fr = new Fire(newX, newY)
            fireArr.push(fr)
            matrix[this.y][this.x] = 0
            for (var i in grassArr) {
                if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                    grassArr.splice(i, 0)
                }
            }


            this.x = newX
            this.y = newY
            this.energy -= 1
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in fireArr) {
                if (fireArr[i].x == this.x && fireArr[i].y == this.y) {
                    fireArr.splice(i, 1)
                }
            }
        }
    }
}