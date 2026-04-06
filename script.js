let grid = [];
let rows, cols, umin, umax, unum;
let colors = [];

// PANEL 1
function data1() {
  document.getElementById("params1").value =
`COLS 9
ROWS 11
UMIN 0.20
UMAX 0.70
UNUM 11`;
}

function read1() {
  const lines = document.getElementById("params1").value.split("\n");

  lines.forEach(l => {
    let [k,v] = l.split(" ");
    if(k=="ROWS") rows = +v;
    if(k=="COLS") cols = +v;
    if(k=="UMIN") umin = +v;
    if(k=="UMAX") umax = +v;
    if(k=="UNUM") unum = +v;
  });
}

function exec1() {
  grid = [];
  let txt = "";
  let step = (umax-umin)/(unum-1);

  for(let i=0;i<rows;i++){
    let row=[];
    for(let j=0;j<cols;j++){
      let r = Math.floor(Math.random()*unum);
      row.push(r);
      txt += (umin + r*step).toFixed(2);
      if(j<cols-1) txt+=";";
    }
    txt+="\n";
    grid.push(row);
  }

  document.getElementById("grid").value = txt;
}

// PANEL 2
function data2(){
  let txt = "CNUM "+unum+"\n";
  for(let i=0;i<unum;i++){
    txt += "CL"+String(i).padStart(2,"0")+" #"+(5+i)+"22\n";
  }
  document.getElementById("params2").value = txt;
}

function read2(){
  let lines = document.getElementById("params2").value.split("\n");
  colors = [];

  lines.forEach(l=>{
    if(l.startsWith("CL")){
      colors.push(l.split(" ")[1]);
    }
  });
}

function exec2(){
  draw("canvas2", grid);
}

// PANEL 3
function data3(){
  document.getElementById("params3").value =
`XMIN 0
YMIN 0
XMAX ${cols}
YMAX ${rows}`;
}

function read3(){}

function exec3(){
  draw("canvas3", grid, true);
}

// DRAW
function draw(id, g, highlight=false){
  let c = document.getElementById(id);
  let ctx = c.getContext("2d");

  let cell = c.width / cols;

  for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
      ctx.fillStyle = colors[g[i][j]] || "#000";
      ctx.fillRect(j*cell,i*cell,cell,cell);
    }
  }

  if(highlight){
    ctx.fillStyle="lime";
    ctx.fillRect(2*cell,2*cell,cell,cell);

    ctx.fillStyle="blue";
    ctx.fillRect(5*cell,5*cell,cell,cell);
  }
}
