let rows, cols, umin, umax, unum;
let grid = [];
let colors = [];

// ================= PANEL 1 =================
function wipe1(){
  params1.value = "";
  document.getElementById("grid").value = "";
  grid = [];
}

function data1(){
  params1.value =
`COLS 9
ROWS 11
UMIN 0.20
UMAX 0.70
UNUM 11`;
}

function read1(){
  let lines = params1.value.split("\n");

  lines.forEach(l=>{
    let [k,v] = l.split(" ");
    if(k==="ROWS") rows = +v;
    if(k==="COLS") cols = +v;
    if(k==="UMIN") umin = +v;
    if(k==="UMAX") umax = +v;
    if(k==="UNUM") unum = +v;
  });
}

function exec1(){
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

// ================= PANEL 2 =================
function wipe2(){
  params2.value = "";
  colors = [];
  clearCanvas("canvas2");
}

function data2(){
  let base = ["522","622","722","822","922","a22","b22","c22","d22","e22","f22"];

  let txt = "CNUM "+base.length+"\n";

  for(let i=0;i<base.length;i++){
    txt += "CL"+String(i).padStart(2,"0")+" #"+base[i]+"\n";
  }

  params2.value = txt;
}

function read2(){
  let lines = params2.value.split("\n");
  colors = [];

  lines.forEach(l=>{
    if(l.startsWith("CL")){
      colors.push(l.split(" ")[1]);
    }
  });
}

function exec2(){
  draw("canvas2", false);
}

// ================= PANEL 3 =================
function wipe3(){
  params3.value = "";
  clearCanvas("canvas3");
}

function data3(){
  params3.value =
`XMIN 0
YMIN 0
XMAX ${cols}
YMAX ${rows}`;
}

function read3(){}

function exec3(){
  draw("canvas3", true);
}

// ================= DRAW =================
function draw(id, highlight=false){
  let c = document.getElementById(id);
  let ctx = c.getContext("2d");

  let cellW = c.width / cols;
  let cellH = c.height / rows;
  let cell = Math.min(cellW, cellH);

  for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){

      ctx.fillStyle = colors[grid[i][j]] || "#000";
      ctx.fillRect(j*cell,i*cell,cell,cell);

      ctx.strokeStyle = "#333";
      ctx.strokeRect(j*cell,i*cell,cell,cell);
    }
  }

  if(highlight){
    let x1 = Math.floor(Math.random()*cols);
    let y1 = Math.floor(Math.random()*rows);

    let x2 = Math.floor(Math.random()*cols);
    let y2 = Math.floor(Math.random()*rows);

    ctx.fillStyle="#8f8";
    ctx.fillRect(x1*cell,y1*cell,cell,cell);

    ctx.fillStyle="#88f";
    ctx.fillRect(x2*cell,y2*cell,cell,cell);
  }
}

// ================= CLEAR =================
function clearCanvas(id){
  let c = document.getElementById(id);
  let ctx = c.getContext("2d");
  ctx.clearRect(0,0,c.width,c.height);
}
