var canvas, context;
var lastX=0, lastY=0;

function draw(x1, y1, x2, y2){
    //context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
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
        started = true;
    }
	
    function ev_mouseup(ev) {
        started = false;
    }

    // The mousemove event handler.
  
    function ev_mousemove (ev) {
        var touch;
        if (ev.targetTouches) {
            canvas.onmousemove = null;
            touch = ev.targetTouches[0];
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
        
        
        lastX = x2;
        lastY = y2;

        // The event handler works like a drawing pencil which tracks the mouse 
        // movements. We start drawing a path made up of lines.
        if (started) {
            createCoordMessage(x1,y1,x2,y2);
            draw(x1,y1,x2,y2);
        }
    }

    canvas_init();
}, false);