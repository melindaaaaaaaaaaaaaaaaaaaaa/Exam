let rows, cols, umin, umax, unum;
let gridData = [];

function generateParams() {
  const text = `COLS 10
ROWS 10
UMIN 0.20
UMAX 0.80
UNUM 10`;

  document.getElementById("params").value = text;
}

function readParams() {
  const text = document.getElementById("params").value.split("\n");

  text.forEach(line => {
    const [key, value] = line.split(" ");

    if (key === "ROWS") rows = parseInt(value);
    if (key === "COLS") cols = parseInt(value);
    if (key === "UMIN") umin = parseFloat(value);
    if (key === "UMAX") umax = parseFloat(value);
    if (key === "UNUM") unum = parseInt(value);
  });
}

function generateGrid() {
  gridData = [];
  let output = "";

  const step = (umax - umin) / (unum - 1);

  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      const idx = Math.floor(Math.random() * unum);
      const val = umin + idx * step;
      row.push(idx);

      output += val.toFixed(2);
      if (j < cols - 1) output += ";";
    }
    gridData.push(row);
    output += "\n";
  }

  document.getElementById("grid").value = output;
}

function drawHeatmap() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const width = canvas.width;
  const height = canvas.height;

  const cellW = width / cols;
  const cellH = height / rows;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const value = gridData[i][j];

      // warna gradasi merah
      const intensity = Math.floor(255 * (value / unum));
      ctx.fillStyle = `rgb(${intensity},0,0)`;

      ctx.fillRect(j * cellW, i * cellH, cellW, cellH);
    }
  }
}