var side = 15;
var socket = io()


exanak = "Ձմեռ";
var weatherP = document.getElementById("weather")

var ex = socket.on("exanaks", function (w) {
    exanak = w;
    weatherP.innerHTML = exanak;
});

function setup() {
    frameRate(5);
    createCanvas(50 * side, 50 * side);
    background('#acacac');
}

function drawworld(matrix) {
    document.getElementById("weather").innerHTML = exanak;
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if (exanak == "Գարուն") {
                    fill(0, 255, 0);
                }
                else if (exanak == "Ամառ") {
                    fill(0, 155, 0)
                }
                else if (exanak == "Աշուն") {
                    fill(0, 75, 0)
                }
                else if (exanak == "Ձմեռ") {
                    fill("white")
                }
            }
            else if (matrix[y][x] == 2) {
                if (exanak == "Գարուն") {
                    fill(247, 255, 0);
                }
                else if (exanak == "Ամառ") {
                    fill(195, 201, 36)
                }
                else if (exanak == "Աշուն") {
                    fill(182, 157, 59)
                }
                else if (exanak == "Ձմեռ") {
                    fill(110, 99, 33)
                }
            }
            else if (matrix[y][x] == 3) {
                if (exanak == "Գարուն") {
                    fill(255, 96, 96);
                }
                else if (exanak == "Ամառ") {
                    fill("red")
                }
                else if (exanak == "Աշուն") {
                    fill(244, 104, 33)
                }
                else if (exanak == "Ձմեռ") {
                    fill(86, 2, 2)
                }
            }
            else if (matrix[y][x] == 4) {
                if (exanak == "Գարուն") {
                    fill(250, 255, 96);
                }
                else if (exanak == "Ամառ") {
                    fill("#f9d252")
                }
                else if (exanak == "Աշուն") {
                    fill(183, 138, 41)
                }
                else if (exanak == "Ձմեռ") {
                    fill(165, 108, 1)
                }
            }
            else if (matrix[y][x] == 5) {
                if (exanak == "Գարուն") {
                    fill(6, 0, 141);
                }
                else if (exanak == "Ամառ") {
                    fill("#6a0ad1")
                }
                else if (exanak == "Աշուն") {
                    fill(72, 36, 72)
                }
                else if (exanak == "Ձմեռ") {
                    fill("black")
                }
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
}

socket.on('inform', drawworld)

function pushGrasses() {
    socket.emit('pushGrasses')
}
function fire() {
    socket.emit('fire')
}
