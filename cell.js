function Cell(i, j) {
  this.current = false;
  this.end = false;
  this.i = i;
  this.j = j;
  this.visited = false;
  this.weightValue = 0;
  this.isObstacule = false;
  this.type = '';
  this.visitedMombo = 0;
  this.visitedLucas = 0;
  this.visitedpirolo = 0;
  //assets

    obst_img   = loadImage("./assets/rock.png");
    tree_img   = loadImage("./assets/tree.png");
    house_img  = loadImage("./assets/house.png");
    sand_img   = loadImage("./assets/sand.png");
    water_img  = loadImage("./assets/water.png");
    flag_img   = loadImage("./assets/flag.png");

    this.checkNeighbors = function() {
      //Retorna vecino no obstaculo con menor peso
      // o undefined en caso de no existir
    var neighbors = [];

    var top    = grid[index(i, j -1)];
    var right  = grid[index(i+1, j)];
    var bottom = grid[index(i, j+1)];
    var left   = grid[index(i-1, j)];
    var d1     = grid[index(i-1, j-1)];
    var d2     = grid[index(i+1, j-1)];
    var d3     = grid[index(i-1, j+1)];
    var d4     = grid[index(i+1, j+1)];

    if (top  && !top.isObstacule && top !== before) {
      neighbors.push(top);
    }
    if (right && !right.isObstacule && right !== before) {
      neighbors.push(right);
    }
    if (left && !left.isObstacule && left !== before) {
      neighbors.push(left);
    }if (bottom && !bottom.isObstacule && bottom !== before) {
          neighbors.push(bottom);
    }if (d1 && !d1.isObstacule && d1 !== before) {
          neighbors.push(d1);
    }if (d2 && !d2.isObstacule && d2 !== before) {
          neighbors.push(d2);
    }if (d3 && !d3.isObstacule && d3 !== before) {
          neighbors.push(d3);
    }if (d4 && !d4.isObstacule && d4 !== before) {
          neighbors.push(d4);
    }

    if (neighbors.length > 0) {
        for(n in neighbors){
            if (neighbors[n] === end){
                return neighbors[n];
            }
        }
      neighbors.sort(function (a,b){return a.weightValue - (b.weightValue-1)});
      return neighbors;

    } else {
      return before;
    }


  }
  this.highlight = function() {
    var x = this.i*w;
    var y = this.j*w;
    noStroke();
    fill(200, 0, 255, 100);
    rect(x, y, w, w);

  }

  this.show = function() {
      var x = this.i*w;
      var y = this.j*w;

      if(this.current ===true){
          fill(27, 104, 27);
          stroke(30,0,255,0);
          rect(x, y, w, w);
          image(flag_img,x,y);


      }else if(this.isObstacule){
          fill(27, 104, 27);
          stroke(30,0,255,0);
          rect(x, y, w, w);
          image(obst_img,x,y);


      }else if(this.end){
        fill(27, 104, 27);
        stroke(30,0,255,0);
        rect(x, y, w, w);
        image(house_img,x,y);
      }else {
          switch (this.type){
              case 'agua':
                  fill(27, 104, 27);
                  stroke(30,0,255,0);
                  rect(x, y, w, w);
                  image(water_img,x,y);
                  break;
              case 'arena':
                  fill(27, 104, 27);
                  stroke(30,0,255,0);
                  rect(x, y, w, w);
                  image(sand_img,x,y);
                  break;
              case 'arbol':
                  fill(27, 104, 27);
                  stroke(30,0,255,0);
                  rect(x, y, w, w);
                  image(tree_img,x,y);
                  break;
              default:
                  fill(27, 104, 27);
                  stroke(30,0,255,0);
                  rect(x, y, w, w);
          }
      }
  }
}
