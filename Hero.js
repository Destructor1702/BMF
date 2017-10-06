function Hero(currPos,sprte) {
    this.current  = currPos;
    this.HabAgua  = 1;
    this.HabArena = 1;
    this.HabArbol = 1;
    this.HabPlano = 1;
    this.before   = undefined;
    this.sprite   = sprte;
    this.show = function () {
        var x = this.current.i*w;
        var y = this.current.j*w;
        fill(27, 104, 27);
        stroke(30,0,255,0);
        rect(x, y, w, w);
        image(this.sprite,x,y);

    }

    this.training = function () {

    }

    this.setCurrent = function(x, y) {
        this.before = this.current;
        this.current = grid[index(x, y)];
        current.weightValue++;
        grid[index(x, y)].isObstacule = false;
        en_start = false;
    }



}