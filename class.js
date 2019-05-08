class Standart{
    constructor(x, y,index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
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
}

class Grass extends Standart {
    constructor(x, y,index) {
        super(x,y,index)
    //     this.x = x;
    //     this.y = y;
    //     this.index = index;
    //     this.multiply = 0;
    //     this.directions = [
    //         [this.x - 1, this.y - 1],
    //         [this.x, this.y - 1],
    //         [this.x + 1, this.y - 1],
    //         [this.x - 1, this.y],
    //         [this.x + 1, this.y],
    //         [this.x - 1, this.y + 1],
    //         [this.x, this.y + 1],
    //         [this.x + 1, this.y + 1]
    //     ]
    }

    // chooseCell(character) {
    //     var found = []
    //     for (var i in this.directions) {
    //         var x = this.directions[i][0]
    //         var y = this.directions[i][1]
    //         if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
    //             if (matrix[y][x] == character) {
    //                 found.push(this.directions[i])
    //             }
    //         }

    //     }
    //     return found;

    // }

    mult() {
        var empty = random(this.chooseCell(0))
        this.multiply++
        if (empty && this.multiply > 1) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 1
            var newGr = new Grass(newX, newY)
            grassArr.push(newGr)
            this.multiply --
        }
    }
}




class Xotaker extends Standart {
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
        var empty = random(this.chooseCell(0))
        if (empty && this.energy > 15) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 2
            var xt = new Xotaker(newX, newY)
            xotakerArr.push(xt)
            this.energy = 10
        }
    }

    move() {
        var empty = random(this.chooseCell(0))
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY
            this.energy--;
        }
    }

    eat() {
        var food = random(this.chooseCell(1))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0

            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1)
                }
            }

            this.x = newX
            this.y = newY
            this.energy += 5
        }
    }

    die() {
        if(this.energy <= 0){
            matrix[this.y][this.x] = 0
            for (var i in xotakerArr) {
                if (xotakerArr[i].x == this.x && xotakerArr[i].y == this.y) {
                    xotakerArr.splice(i, 1)
                }
            }
        }
    }
}

class Gishatich extends Standart {
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
        var empty = random(this.chooseCell(0))
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
        var empty = random(this.chooseCell(0))
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
        var food = random(all)
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

class HomoErectus extends Standart {
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
        var empty = random(this.chooseCell(0))
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
        var empty = random(this.chooseCell(0))
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
        var food = random(all)
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

class Fire extends Standart {
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
        var grass = random(this.chooseCell(1))
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

class Dragon extends Standart {
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
        var empty = random(this.chooseCell(0))
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
        var empty = random(this.chooseCell(0))
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
        var food = random(all)
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
        var empty = random(this.chooseCell(0))
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

