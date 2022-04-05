const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

let x, y, radius, radiusSpirale, startAngleCircle;
let stepLimit;
let artsy = ["#e4f0ce", "#a2c5c7", "#c1f2bf", "#707e7e", "#8dc7ab"];
let elegant = ["#EDC7B7", "#EEE2DC", "#BAB2B5", "#123C69", "#AC3B61"];
let audacious = ["#272727", "#747474", "#FF652F", "#FFE400", "#14A76C"];
let dynamic = ["#2F4454", "#2E151B", "#DA7B93", "#376E6F", "#1C3334"];
let minimal = ["#EAE7DC", "#D8C3A5", "#8E8D8A", "#E98074", "#E85A4F"];
let energetic = ["#5680E9", "#84CEEB", "#5AB9EA", "#C1C8E4", "#8860D0"];
let vibrant = ["#F8E9A1", "#F76C6C", "#A8D0E6", "#374785", "#24305E"];
let youthfull = ["#A64AC9", "#FCCD04", "#FFB48F", "#F5E6CC", "#17E9E0"];
let palettes = [artsy, elegant, audacious, dynamic, minimal, energetic, vibrant, youthfull];
let palette = [];
let brushes = [];
let backgroundColor = 'black';
const strokeNumber = 280;

const params = {
radiusMin: 0,
radiusMax: 25,
spiraleMin: 0,
spiraleMax: 400,
stepLimitMin: 10,
stepLimitMax: 35
};

const settings = {
dimensions: [ 1080, 1080 ],
animate: true
};

const sketch = ({ context, width, height }) => {
if (Math.random() < 0.5) {
backgroundColor = '#808080';
} else {
backgroundColor = '#808080';
}
console.log(backgroundColor);
context.fillStyle = backgroundColor;
context.fillRect(0, 0, width, height);
palette = artsy;
//palette = palettes[Math.floor(Math.random(palettes.length))];

return ({ context, width, height }) => {

if (brushes.length < strokeNumber) {

x = math.mapRange(Math.random(), 0, 1, 0, 1080);
y = math.mapRange(Math.random(), 0, 1, 0, 1080);

radius = math.mapRange(Math.random(), 0, 1, params.radiusMin, params.radiusMax);
radiusSpirale = math.mapRange(Math.random(), 0, 1, params.spiraleMin, params.spiraleMax);
startAngleCircle = math.mapRange(Math.random(), 0, 1, 0, 2 * Math.PI);
stepLimit = math.mapRange(Math.random(), 0, 1, params.stepLimitMin, params.stepLimitMax);
brushes.push(new Brush(x, y, radius, radiusSpirale, startAngleCircle, palette[Math.floor(math.mapRange(Math.random(), 0, 1, 0, palette.length))], stepLimit));
for (var i = 0; i < brushes.length; i++) {
brushes[i].update();
brushes[i].display(context);
}
}
};
};
//define that fukin brush m8
class Brush {
constructor (x, y, r, R, a, c, l) {
this.xinit = x;
this.yinit = y;
this.radius = r;
this.radiusSpiral = R;
this.angle = a;
this.col = c;
this.xpos = x;
this.ypos = y;
this.animationLength = l;
this.animationStep = 0;
}
display(context) {
if (this.animationStep < this.animationLength) {
context.save();
context.translate(this.xpos, this.ypos);
context.lineWidth = 8;
context.beginPath();
context.fillStyle = this.col;
context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2);
context.fill();
context.restore();
}
}
//update animation steps within update func 
update() {
//this.animationStep += 1;
this.angle += 0.01;
this.radiusSpiral += 0.01;
this.radius += 0.1;
this.xpos = this.xinit + this.radiusSpiral * Math.cos(this.angle);
this.ypos = this.yinit + this.radiusSpiral * Math.sin(this.angle);
}
}

//print sketch withg settings 
canvasSketch(sketch, settings); 