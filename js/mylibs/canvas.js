var canvas, context;
var mycolor = "black";
var lastX=0, lastY=0;


function draw(data){
    
    if ( data.clear === true){
      canvas.width = canvas.width;
      return;
    }

	if ( data.postIt === true){
      drawPostit();
      return;
    }
	
    context.beginPath();
    if(data.x1 && data.y1)
    {
        context.moveTo(data.x1, data.y1);
    }
    
    if(data.x2 && data.y2)
    {
        context.lineTo(data.x2, data.y2);
    }  
    
    if(data.strokeStyle){
        context.strokeStyle = data.strokeStyle;
    }
    
    context.stroke();

}

function clearCanvas() {
  canvas.width = canvas.width;
  createClearMessage();
};

function changeColor(color) {
    mycolor = color;
}

function drawPostitBtn() {
    createPostItMessage();
	drawPostit();
}

function drawPostit(){    	
	// draw yellow rectangle 
	context.beginPath();
	context.lineWidth = 2;
	context.strokeStyle = "black";
	context.fillStyle = "yellow";
	context.rect(100, 150, 300, 250);
	context.fill();
	context.stroke();
	
	context.fillStyle    = '#00f';
	context.font         = 'italic 12px sans-serif';
	context.textBaseline = 'top';
	context.fillText  ('Post-it!', 110, 160);
}

window.addEventListener('load', function () {      
    var started = false;

    // Initialization sequence.
    function canvas_init () {
        // Find the canvas element.
        canvas = document.getElementById('board');	
        if (!canvas) {
            alert('Error: I cannot find the canvas element!');
            return;
        }

        if (!canvas.getContext) {
            alert('Error: no canvas.getContext!');
            return;
        }
	
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;

        // Get the 2D canvas context.
        context = canvas.getContext('2d');
        if (!context) {
            alert('Error: failed to getContext!');
            return;
        }

        // Attach the mousemove event handler.
        canvas.addEventListener('mousemove', ev_mousemove, false);
        canvas.addEventListener('mousedown', ev_mousedown, false);
        canvas.addEventListener('mouseup', ev_mouseup, false);        
        canvas.addEventListener('touchmove', ev_mousemove, false);
        canvas.addEventListener('touchstart', ev_mousedown, false);
        canvas.addEventListener('touchend', ev_mouseup, false);	
    }
  
    function ev_mousedown(ev) {
        canvas.style.cursor="crosshair";
        started = true;
    }
	
    function ev_mouseup(ev) {
        started = false;
    }

    // The mousemove event handler.
  
    function ev_mousemove (ev) {
        var touch;
        if (ev.targetTouches) {
            touch = ev.touches[0];
        }
        
        var x1=lastX;
        var y1=lastY;
	
        // Get the mouse position relative to the canvas element.
        if (ev.layerX || ev.layerX == 0) { // Firefox
            x2 = ev.layerX;
            y2 = ev.layerY;
        } else if (ev.offsetX || ev.offsetX == 0) { // Opera
            x2 = ev.offsetX;
            y2 = ev.offsetY;
        } else {
            x2 = touch.pageX;
            y2 = touch.pageY;
        }
        

        x2 -= canvas.offsetLeft;
        y2 -= canvas.offsetTop;

        
        lastX = x2;
        lastY = y2;
        
        var data = {
            "x1":x1,
            "y1":y1,
            "x2":x2,
            "y2":y2,
            "strokeStyle": mycolor
        };

        // The event handler works like a drawing pencil which tracks the mouse 
        // movements. We start drawing a path made up of lines.
        if (started) {
            createCoordMessage(x1,y1,x2,y2,mycolor);
            draw(data);
        }
        ev.preventDefault();
    }

    canvas_init();
}, false);
