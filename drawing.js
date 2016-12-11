$(document).ready(function(){
    
    var BrushStroke = function(bsShape, bsColor, bsSize, bsOpacity, bsPath){
        this.shape = bsShape;
        this.color = bsColor;
        this.size = bsSize;
        this.opacity = bsOpacity;
        this.path = bsPath;
    }
    
    // BRUSH AND BUFFERS
    var localbi = new Image(); //buffer brush image
    var localbc = $("#localBuffer")[0]; //buffer canvas (gets drawn)
    var localbx = localbc.getContext('2d'); //buffer context
    localbi.onload = function(){bufferBrush(null)};
    var servedbi = new Image();
    var servedbc = $("#servedBuffer")[0];
    var servedbx = servedBuffer.getContext('2d');
    //no: servedbi.onload = function(){bufferBrush(null)};
    
    function hexToRgb(hex){
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    function bufferBrush(bs){
        var useBrush = localbi;
        var useContext = localbx;
        var useSize = size;
        var useColor = color;
        var useOpacity = opacity;
        if(bs != null){
            useContext = servedbx;
            useSize = bs.size;
            useOpacity = bs.opacity;
            useColor = bs.color;
        }
        useContext.clearRect(0, 0, 128, 128);
        useContext.drawImage(useBrush, 64-size/2, 64-size/2, size, size);
        var imageData = useContext.getImageData(0, 0, 128, 128);
        var pixels = imageData.data;
        var rgb = hexToRgb(useColor);
        for(var i = 0; i < pixels.length; i=i+4){
            pixels[i  ] = pixels[i  ] * rgb.r /255; // r
            pixels[i+1] = pixels[i+1] * rgb.g /255; // g
            pixels[i+2] = pixels[i+2] * rgb.b /255; // b
            pixels[i+3] = pixels[i+3] * opacity;
            
        }
        console.log("Buffered brush " + useSize + "px " + useColor + " " + (100*useOpacity) + "% ");
        imageData.data = pixels;
        useContext.putImageData(imageData, 0, 0);
    }
    
    
    // LOCAL BRUSH STROKES
    var canvas = $("#mainCanvas");
    var context = canvas[0].getContext("2d");
    context.fillStyle = "#fff";
    context.fillRect(0, 0, 640, 480);
    
    var mouseDown = false;
    var color = "#3e86fa";
    var size = 64;
    var opacity = 1;
    var path = [];
    var dbindex = 0;
    
    
    // LOCAL BRUSH TOOLS
    localbi.src = "Brushes/Hard.png";
    servedbi.src = "Brushes/Hard.png";
    $("#brushes").hide();
    
    $("#shape").mouseenter(function(){
        $("#brushes").fadeIn();
    });
    $("#brushes").mouseleave(function(){
        $("#brushes").fadeOut();
    });
    $("#brushes").mouseleave(function(){
        $("#brushes").fadeOut();
    });
    $("#brushes").on("click", "img", function(){
        localbi.src = $(this).attr("src");
        $("#shape").attr("src", localbi.src);
        $("#brushes").fadeOut();
    });
    $("#colorPicker").spectrum({
        showButtons: false,
        move: function(c){
            color = c.toHexString();
            bufferBrush();
        }
    });
    $("#size").on("input change", function(){
        size = $("#size").val();
        bufferBrush();
    });
    
    $("#opacity").on("input change", function(){
        opacity = Math.pow($("#opacity").val(), 2);
        bufferBrush();
    });
    
    $("#exit").click(function(){
        //TODO update thumb and stop checking for updates or something 
    });
    
    $("#save").click(function(){
        var data = canvas.get(0).toDataURL();
        console.log(data);
        window.open(data);
    });
    
    $("#erase").click(function(){
        context.fillStyle = "#fff";
        context.fillRect(0, 0, 640, 480);
        clearbs();
    });

    function erase(){
        context.clearRect(0, 0, 640, 480);
        dbindex = 0;
    }
    
    
    // DRAWING ON CANVAS
    canvas.mousedown(function(e){
        mouseDown = true;
        path = [];
        path.push({x: e.offsetX, y: e.offsetY});
    }).mousemove(function(e){
        if(mouseDown){
            var current = {x: e.offsetX, y: e.offsetY};
            var previous = path[path.length-1];
            var boxDist = Math.abs(previous.x-current.x) + Math.abs(previous.y-current.y);
            if(boxDist > 2){
                drawSegment(localbc, previous, current, null);
                path.push(current);
            }
        }
    }).mouseup(function(){
        mouseDown = false;
        if(path.length >= 2){
            var bs = new BrushStroke(localbi.src, color, size, opacity, path);
            // send bs to server and apply it for other players
            //sendbs(bs);
            path = [];
            
            bs.color = "#ff0000";
            applyBrushStroke(bs);
        }
    }).mouseleave(function(){
        canvas.mouseup();
    });
    
    function distanceBetween(v0, v){
        return Math.sqrt(Math.pow(v.x - v0.x, 2) + Math.pow(v.y - v0.y, 2));
    }
    function angleBetween(v0, v) {
        return Math.atan2(v.x - v0.x, v.y - v0.y);
    }
    function drawSegment(buff, start, end, style){
        var dist = distanceBetween(start, end);
        var angle = angleBetween(start, end);
        for(var i = 0; i < dist; i++){
            x = start.x + (Math.sin(angle) * i) - 64;
            y = start.y + (Math.cos(angle) * i) - 64;
            context.drawImage(buff, x, y, 128, 128);
            //for fun effects, use more parameteric functions
            //context.drawImage(buffer,x + 100*Math.sin(path.length/5),y + 100*Math.cos(path.length/5), size, size);
            //context.drawImage(buffer,x + 100*Math.sin(path.length/5 + Math.PI),y + 100*Math.cos(path.length/5 + Math.PI), size, size);
        }
    }

    
    // APPLY RECEIVED BRUSH STROKES
    function applyBrushStroke(bs){

        console.log("Got bs ", bs);
        if(bs.path.length < 2)
            return;
        
        console.log("Setting shape to " + bs.shape);
        servedbi.src = bs.shape;
        // do we need to wait?
        
        console.log("Buffering");
        bufferBrush(bs);
        
        console.log("Drawing segments");
        var v0 = bs.path.pop();
        while(bs.path.length > 0){
            var v = bs.path.pop();
            drawSegment(servedbc, v0, v, null);
            v0 = v;
        }
        console.log("Done");
    }
    
    
    // SERVER INTERACTIONS
    function sendbs(bs){
        if(bs.path.length == 0)
            return;
        s = JSON.stringify(bs);
        console.log("length: "+s.length+"\npath len: "+bs.path.length);
        console.log("sending bs");
        $.ajax({
            url: "./sendbs.php",
            async: true,
            data: {
                password: 'chocolate',
                stroke: s
            },
            method: 'POST'
        });
    }

    function getbs(){
        if(mouseDown) return;
        $.ajax({
            url: "./getbs.php",
            async: true,
            data: {
                password: 'chocolate'
            },
            method: 'POST',
            success: function(result){
                allstrokes = JSON.parse(result);

                if(allstrokes.length < dbindex && !mouseDown){
                    erase();
                    return;
                }

                for(var i = dbindex; i < allstrokes.length; i++){
                    elem = JSON.parse(allstrokes[i]);
                    dbindex++;
                    if(elem.erase){
                        erase();
                    }
                    applyBrushStroke(elem);
                }
            }
        });
    }

    function clearbs(){
        $.ajax({
            url: "./clearbs.php",
            async: true,
            data: {
                password: 'chocolate'
            },
            method: 'POST'
        })
    }

    function getonline(){
        $.ajax({
            url: "./online.php",
            async: true,
            success: function(result){
                $("#online").html(result);
            }
        })
    }
    
    
    //setInterval(function(){getbs();}, 100);
    //getonline();
    //setInterval(function(){getonline();},5000);
});