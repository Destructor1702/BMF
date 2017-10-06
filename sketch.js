var cols, rows;
var w = 60;     //ancho casilla
var grid = [];  //mapa
var current;    //casilla actual
var end;        //casilla final
//var stack = [];
var en_start = false;
var en_end = false;
var en_tree = false;
var en_empty = false;
var locked = false;
var Came;


//# var mombo_img   = loadImage("/assets/mombo.png") ;
//# var lucas_img   = loadImage("/assets/lucas.png") ;
//# var pirolo_img  = loadImage("/assets/pirolo.png");
//# var mombo  = new Hero(0,0,mombo_img);
//# var lucas  = new Hero(0,0,lucas_img);
//# var pirolo = new Hero(0,0,pirolo_img);

function setup() {
    background(19, 63, 12);
    fill(19, 63, 12);
    createCanvas(600, 600);
    cols = floor(width / w);
    rows = floor(height / w);
    //frameRate(5);

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            grid.push(cell);
        }
    }


    //control

    //frameRate(5);

    var factorObstaculos = 0.10;
    var factorAgua       = 0.10;
    var factorArena      = 0.10;
    var factorArbol      = 0.10;

    if (getParameterByName('obs') !== null) {
        factorObstaculos = getParameterByName('obs') * 0.01;
    }
    if (getParameterByName('WaterVal') !== null) {
        factorAgua = getParameterByName('WaterVal') * 0.01;
    }
    if (getParameterByName('SandVal') !== null) {
        factorArena = getParameterByName('SandVal') * 0.01;
    }
    if (getParameterByName('TreeVal') !== null) {
        factorObstaculos = getParameterByName('TreeVal') * 0.01;

    }
    //generar obtaculos
    for (i = 0; i <= Math.floor(factorObstaculos * grid.length); i++) {
        var r1 = randomIntFromInterval(0, rows - 1);
        var r2 = randomIntFromInterval(0, cols - 1);
        grid[index(r1, r2)].isObstacule = true;
        console.log('obstaculos: '+factorObstaculos)
    }
    for (i = 0; i <= Math.floor(factorAgua * grid.length); i++) {
         r1 = randomIntFromInterval(0, rows - 1);
         r2 = randomIntFromInterval(0, cols - 1);
        grid[index(r1, r2)].type = 'agua';
        console.log('agua: '+factorAgua)
    }
    for (i = 0; i <= Math.floor(factorArena * grid.length); i++) {
        r1 = randomIntFromInterval(0, rows - 1);
        r2 = randomIntFromInterval(0, cols - 1);
        grid[index(r1, r2)].type = 'arena';
        console.log('arena: '+factorArena)
    }
    for (i = 0; i <= Math.floor(factorArbol * grid.length); i++) {
        r1 = randomIntFromInterval(0, rows - 1);
        r2 = randomIntFromInterval(0, cols - 1);
        grid[index(r1, r2)].type = 'arbol';
        console.log('arboles: '+factorArbol)
    }
    //establecer inicio y fin por defeto
    setStart(0, 0);
    setEnd(rows - 1, cols - 1);

} //!setup()


function mousePressed() {
    if (locked === false) {
        clc_x = parseInt(mouseX / w);
        clc_y = parseInt(mouseY / w);
        if (en_start) {
            setStart(clc_x, clc_y);
        }
        if (en_end) {
            setEnd(clc_x, clc_y);
        }
        if (en_tree) {
            if (current !== grid[index(clc_x, clc_y)] && end !== grid[index(clc_x, clc_y)]) {
                grid[index(clc_x, clc_y)].type = 'arbol';
            }
        }
        if (en_empty) {
            if (current !== grid[index(clc_x, clc_y)] && end !== grid[index(clc_x, clc_y)]) {
                grid[index(clc_x, clc_y)].isObstacule = false;
                grid[index(clc_x, clc_y)].visited = false;
                grid[index(clc_x, clc_y)].weightValue = 0;
                en_empty = false;
            }
        }

    }
}

function draw() {
    background(61, 150, 34);
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
    if (locked === true) {
        Heuristic();
    }
} //!draw()

///HEURISTIC
function Heuristic() {
    if (current !== end) {

        if (Bresenham() !== null && Bresenham() !== undefined) {
            B = Bresenham();
            setStart(B.i, B.j);
        } else {
            B = BlindSearch();
            if (B === undefined) {
                B = Came;
            }
            setStart(B.i, B.j);
        }
        Came = B;


    }
}

function Bresenham() {
    return null;
    //return line(current,end);
}

function line(startCoordinates, endCoordinates) {

    var x1 = startCoordinates.i;
    var y1 = startCoordinates.j;
    var x2 = endCoordinates.i;
    var y2 = endCoordinates.j;

    var sx, sy;
    sx = sy = 0;
    if (x1 > x2) {
        sx = -1;
    }
    if (x1 < x2) {
        sx = 1;
    }
    if (x1 > x2) {
        sy = -1;
    }
    if (x1 < x2) {
        sy = 1;
    }

    if (grid[index(sy, sx)].isObstacule) {
        return null;
    }
    return grid[index(sx, sy)];

}

function BlindSearch() {
    if (current.checkNeighbors() === undefined) {
        setStart(before.i, before.j);
    } else {
        var nextpos = current.checkNeighbors();
        return grid[index(nextpos.i, nextpos.j)];
    }
}


////AUX FUNCTIONS ////
function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j * cols;
}

function setStart(x, y) {
    before = current;
    for (g in grid) {
        grid[g].current = false;
    }
    grid[index(x, y)].current = true;
    current = grid[index(x, y)];
    current.weightValue++;
    current.visited = true;
    current.isObstacule = false;
    en_start = false;

    //# mombo.setCurrent(x,y);
    //# lucas.setCurrent(x,y);
    //# pirolo.setCurrent(x,y);
}

function setEnd(x, y) {
    for (g in grid) {
        grid[g].end = false;
    }
    grid[index(x, y)].end = true;
    end = grid[index(x, y)];
    end.isObstacule = false;
    en_end = false;
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


