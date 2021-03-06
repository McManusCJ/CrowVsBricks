var c = document.getElementById("img");
var ctx = c.getContext("2d");
var crow = new Image();
crow.src = "../resources/raven.png";
var brick = new Image();
brick.src = "../resources/brick.png";
var fondo = new Image();
fondo.src = "../resources/f3.jpg";
var xFonSprite=0;
var xCrowSprite=0;
var yCrowCanvas=50;
var n=0;
var p=0;

function perdiste()
{
	clearInterval(obstaculos);
	clearInterval(imprimir);
	ctx.font = "40px Comic Sans MS";
	ctx.fillStyle = "#230043";
	ctx.fillText("Game over", 190, 150);
	ctx.font="30px Comic Sans MS";
	ctx.fillText("Tu puntaje fue "+p,170,220)
}

function crearBrick()
{
	var BrickCanvas = new Object();
	BrickCanvas.posX = 560;
	y = parseInt(Math.random()*100%3);
	BrickCanvas.posY = y*110;
	return BrickCanvas;
}

var brick1 = crearBrick();
var brick2 = crearBrick();
var brick3 = crearBrick();
var brick4 = crearBrick();
	
$(document).keydown(function(event){
	if(event.which == 32)
		if(yCrowCanvas > 0)
			yCrowCanvas -= 30;
});

var imprimir=setInterval(function(){
	ctx.clearRect(0,0,600,300);
	ctx.drawImage(fondo,xFonSprite,50,600,290,0,0,600,300);
	if(n >= 3)
		ctx.drawImage(brick,brick4.posX,brick4.posY,80,80);
	if(n >= 2)
		ctx.drawImage(brick,brick3.posX,brick3.posY,80,80);
	if(n >= 1)		
		ctx.drawImage(brick,brick2.posX,brick2.posY,80,80);

	ctx.drawImage(brick,brick1.posX,brick1.posY,80,80);
	
	ctx.drawImage(crow,xCrowSprite,0,97,120,50,yCrowCanvas,100,100);
	n++;
	
	if(brick1.posX < 130 && ((brick1.posX+50) > 35))	//bien
	{	
		if((brick1.posY < (yCrowCanvas+20)) && ((brick1.posY+30) > yCrowCanvas)){
			perdiste();
			//console.log("Chocaste con 1");
		}
	}
	else
	{
		if((brick2.posX < 130) && ((brick2.posX+50) > 35))	//bien
		{	
			if((brick2.posY < (yCrowCanvas+20)) && ((brick2.posY+30) > yCrowCanvas))
			{						
				perdiste();
				//console.log("Chocaste con 2");
			}
		}
	}
	
	if(xCrowSprite < 291)	//esto hace que aletee
		xCrowSprite+=97;
	else
		xCrowSprite=0;
	
	if(yCrowCanvas<313)	//hace que tienda a caer y que no se pierda despues de los limites
		yCrowCanvas+=7;
	else
		perdiste();
		
	p++;
},50);

var obstaculos=setInterval(function(){
	
	if(xFonSprite<2304)		//hace el movimiento del fondo
		xFonSprite+=25;
	else
		xFonSprite=0;
	
		brick1.posX-=20;
		brick2.posX-=20;
		brick3.posX-=20;
		brick4.posX-=20;
		//console.log(brick1.posX);
	
	if(brick4.posX+220==600)		//si ya hay espacio para un nuevo brick
	{
		brick1 = brick2;
		brick2 = brick3;
		brick3 = brick4;
		brick4 = crearBrick();
	}
},200);