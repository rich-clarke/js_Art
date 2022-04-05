const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1080, 1080],
};

let manager, image;

let text = 'Edison';
let fontSize = 1200;
let fontFamily = 'serif';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
  const cell = 20;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);
    typeContext.fillStyle = 'white';

    typeContext.save();
    typeContext.drawImage(image, 0, 0, cols, rows);
    typeContext.restore();

    const typeData1 = typeContext.getImageData(0, 0, cols, rows).data;

    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.textBaseline = 'middle';
    context.textAlign = 'center';

    for(let i = 0; i < numCells; i++)
    {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell +random.range(-cell, cell) * 0.5;
      const y = row * cell +random.range(-cell, cell) * 0.5;

      const r = typeData1[(i * 4) + 0];
      const g = typeData1[(i * 4) + 1];
      const b = typeData1[(i * 4) + 2];
      const a = typeData1[(i * 4) + 3];

      const glyph = getGlyph(r);

      context.font = `${cell * 2}px ${fontFamily}`;
      if(Math.random() < 0.01) context.font = `${cell * 5}px ${fontFamily}`;

      context.fillStyle = 'white';

      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);

      context.fillText(glyph, 0, 0);
      context.restore();
    }
    context.drawImage(typeCanvas, 0, 0, width, height);
  };
};

const getGlyph = (v) => {
  if(v < 50)return ' ';
  if(v < 100)return '.';
  if(v < 150)return '#';
  if(v < 200)return '$';
  if(v < 250)return 'N';

  const glyphs = '/=ath'.split('');

  return random.pick(glyphs);
};

const loadMeSomeImage = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject();
        img.src = url;
      });
    };

const start = async() => {
  const url = 'https://images.unsplash.com/photo-1608889476518-738c9b1dcb40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80';
  image = await loadMeSomeImage(url);
  manager = await canvasSketch(sketch, settings);
};

start();