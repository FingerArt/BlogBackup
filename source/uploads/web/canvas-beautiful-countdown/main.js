var canvas_width = 0;
var canvas_height = 0;
var CANVAS_TOP = 10;
var CANVAS_LEFT = 10;
var RADIUS = 6;
var date = new Date();;
var balls = [];
var colors = ['#33B5E5','#09C','#93C','#9C0','#690','#FB3','#f80','#f44','#c00'];

$(function () {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	init(canvas);
			setInterval(function () {
				render(context);
				update(context);
			},
			50
		);
});

/**
 * 初始化canvas
 */
function init (canvas) {
	canvas_width = document.documentElement.clientWidth-15;
	canvas_height = document.documentElement.clientHeight-15;
	canvas.width = canvas_width;
	canvas.height = canvas_height;
}

/**
 * 渲染
 */
function render (context) {
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	//重置画板
	context.clearRect(0,0,canvas_width,canvas_height);
	//渲染数字
	renderDigit(context, parseInt(hour/10),		CANVAS_LEFT,				CANVAS_TOP, RADIUS);
	renderDigit(context, hour%10,				CANVAS_LEFT+15*(RADIUS+1),	CANVAS_TOP, RADIUS);
	renderDigit(context, 10,					CANVAS_LEFT+28*(RADIUS+1),	CANVAS_TOP, RADIUS);
	renderDigit(context, parseInt(minute/10),	CANVAS_LEFT+39*(RADIUS+1),	CANVAS_TOP, RADIUS);
	renderDigit(context, minute%10,				CANVAS_LEFT+54*(RADIUS+1),	CANVAS_TOP, RADIUS);
	renderDigit(context, 10,					CANVAS_LEFT+67*(RADIUS+1),	CANVAS_TOP, RADIUS);
	renderDigit(context, parseInt(second/10),	CANVAS_LEFT+78*(RADIUS+1),	CANVAS_TOP, RADIUS);
	renderDigit(context, second%10,				CANVAS_LEFT+93*(RADIUS+1),	CANVAS_TOP, RADIUS);
}

/**
 * 渲染数字函数
 */
function renderDigit (context,number,x,y,radius) {
	// var coorX, coorY, gradient;
	for (var i = 0,coorX, coorY,gradient; i < digitModel[number].length; i++) {
		for (var j = 0; j < digitModel[number][i].length; j++) {
			if (digitModel[number][i][j] != 1) continue;
			coorX = x+2*j*(radius+1)+radius+1;
			coorY = y+2*i*(radius+1)+radius+1;
			context.beginPath();
			context.arc(coorX,coorY,radius,0,Math.PI*2,0);
			context.closePath();
			context.fillStyle = '#358';
			context.fill();
		};
	};
}
function addBall (x,y,number) {
	for (var i = 0; i < digitModel[number].length; i++) {
		for (var j = 0; j < digitModel[number][i].length; j++) {
			if (digitModel[number][i][j] != 1) continue;
			var aBall = {
				x:x+2*j*(RADIUS+1)+RADIUS+1,
				y:y+2*i*(RADIUS+1)+RADIUS+1,
				g:1.5+Math.random(),
				vx:Math.pow(-1, Math.floor(Math.random()*1000))*4,
				vy:-10*Math.random(),
				color:colors[Math.floor(Math.random()*10)]
			}
			balls.push(aBall);
		};
	};
}
function moveBall(context) {
	for (var i = 0; i < balls.length; i++) {
		context.beginPath();
		context.arc(balls[i].x,balls[i].y,RADIUS,0,Math.PI*2,0);
		context.closePath();
		context.fillStyle = balls[i].color;
		context.fill();
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy +=balls[i].g;
		if (balls[i].y >= canvas_height-RADIUS) {
			balls[i].y = canvas_height-RADIUS;
			balls[i].vy = -balls[i].vy*0.5;
		};
	};
	var newL = 0;
	for (var i = 0; i < balls.length; i++) {
		if (balls[i].x+RADIUS >0 && balls[i].x-RADIUS <= canvas_width)
			balls[newL++] = balls[i];
	};
	while(balls.length > newL)
		balls.pop();
}
function update (context) {
	var nextD = new Date();
	var nowH = date.getHours();
	var nowM = date.getMinutes();
	var nowS = date.getSeconds();
	var nextH = nextD.getHours();
	var nextM = nextD.getMinutes();
	var nextS = nextD.getSeconds();
	if (parseInt(nowS%10) != parseInt(nextS%10))
		addBall(CANVAS_LEFT+93*(RADIUS+1),	CANVAS_TOP,parseInt(nextS%10));
	if (parseInt(nowS/10) != parseInt(nextS/10))
		addBall(CANVAS_LEFT+78*(RADIUS+1),	CANVAS_TOP,parseInt(nextS/10));

	if (parseInt(nowM%10) != parseInt(nextM%10))
		addBall(CANVAS_LEFT+54*(RADIUS+1),	CANVAS_TOP,parseInt(nextM%10));
	if (parseInt(nowM/10) != parseInt(nextM/10))
		addBall(CANVAS_LEFT+39*(RADIUS+1),	CANVAS_TOP,parseInt(nextM/10));

	if (parseInt(nowH%10) != parseInt(nextH%10))
		addBall(CANVAS_LEFT+15*(RADIUS+1),	CANVAS_TOP,parseInt(nextH%10));
	if (parseInt(nowH/10) != parseInt(nextH/10))
		addBall(CANVAS_LEFT,	CANVAS_TOP,parseInt(nextH/10));

	moveBall(context);
	//更新当前时间
	date = nextD;
}