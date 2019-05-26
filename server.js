Standart = require("./class.js")
Fire = require("./fire.js")
Grass = require("./grass.js")
Xotaker = require("./xotaker.js")
Gishatich = require("./gishatich.js")
HomoErectus = require("./homo.js")
Dragon = require("./dragon.js")


var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);


grassArr = [];
xotakerArr = [];
gishatichArr = [];
homoArr = [];
dragonArr = [];
fireArr = [];

// matrix = [
//     [0,0,0,0,0],
//     [0,0,0,0,0],
//     [0,0,0,0,0],
//     [0,0,0,0,0],
//     [0,0,0,0,0]
// ]

matrix = []; // Մատրիցի ստեղծում
rows = 50; // Տողերի քանակ
columns = 50; // Սյուների քանակ

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

weather = ["Ձմեռ", "Գարուն", "Ամառ", "Աշուն"];
exanak = "Ձմեռ";

function setupworld() {
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
}
setupworld()

time = 0
function crateanimals() {
    console.log(exanak)
    time++
    if (time % 40 < 10) {
        exanak = weather[1];
    }
    else if (time % 40 < 20) {
        exanak = weather[2]
    }
    else if (time % 40 < 30) {
        exanak = weather[3]
    }
    else if (time % 40 < 40) {
        exanak = weather[0]
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
    io.sockets.emit('inform', matrix)
    io.sockets.emit("exanaks", exanak);
}

setInterval(crateanimals, 1000)

io.on('connection', function (socket) {
    socket.on('pushGrasses', function () {
        grassArr = [];
        xotakerArr = [];
        gishatichArr = [];
        homoArr = [];
        dragonArr = [];
        fireArr = [];
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                matrix[y][x] = 1;
                grassArr.push(new Grass(x, y))
            }
        }
    })

    socket.on('fire', function () {

        grassArr = [];
        xotakerArr = [];
        gishatichArr = [];
        homoArr = [];
        dragonArr = [];
        fireArr = [];
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                matrix[y][x] = 6;
                fireArr.push(new Fire(x, y))
            }
        }
    })
});

var statistics = {};
setInterval(function () {
    statistics.gArr = grassArr.length,
        statistics.xArr = xotakerArr.length,
        statistics.giArr = gishatichArr.length,
        statistics.hArr = homoArr.length,
        statistics.dArr = dragonArr.length,
        statistics.fArr = fireArr.length,

        fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
        })
}, 10)
