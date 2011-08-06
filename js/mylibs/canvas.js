var canvas, mycontext;

function draw(x1, y1, x2, y2){
    mycontext.moveTo(x1, y1);
    mycontext.lineTo(x2, y2);
    mycontext.stroke();
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
        mycontext = canvas.getContext('2d');
        if (!mycontext) {
            alert('Error: failed to getContext!');
            return;
        }

        // Attach the mousemove event handler.
        canvas.addEventListener('mousemove', ev_mousemove, false);
        canvas.addEventListener('mousedown', ev_mousedown, false);
        canvas.addEventListener('mouseup', ev_mouseup, false);	
    }
  
    function ev_mousedown(ev) {
        started = true;
    }
	
    function ev_mouseup(ev) {
        started = false;
    }

    // The mousemove event handler.
  
    function ev_mousemove (ev) {
        var x, y;
	
        // Get the mouse position relative to the canvas element.
        if (ev.layerX || ev.layerX == 0) { // Firefox
            x = ev.layerX;
            y = ev.layerY;
        } else if (ev.offsetX || ev.offsetX == 0) { // Opera
            x = ev.offsetX;
            y = ev.offsetY;
        }

        // The event handler works like a drawing pencil which tracks the mouse 
        // movements. We start drawing a path made up of lines.
        if (!started) {
            mycontext.beginPath();
            
        } else {
            createCoordMessage(x,y);
            draw(x,y);
        }
    }

    canvas_init();
}, false);