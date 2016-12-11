$(document).ready(function() {
    setInterval(function(){getbs();}, 100);
    getonline();
    setInterval(function(){getonline();},5000);
    
    var maxPoints = 200;
    
    var color = "#3e86fa";
    var size = 50;
    var path = [];
    
    var dbindex = 0;
    
    var BrushStroke = function(bsColor, bsSize, bsPath){
        this.color = bsColor;
        this.size = bsSize;
        this.path = bsPath;
    }
    
    $("#colorPicker").spectrum({
        showButtons: false,
        move: function(c){
            color = c.toHexString();
            $("#brush").css("background-color", color);
        }
    });
    
    var canvas = $("canvas");
    var context = canvas[0].getContext("2d");
    var lastEvent;
    var mouseDown = false;
    
    $("#size").on("input change", function(){
        var s = $("#size").val();
        $("#brush").css("width", s/1.11 + "px");
        $("#brush").css("height", s/1.11 + "px");
        $("#brush").css("border-radius", s + "px");
        size = s;
    });
    
    $("#exit").click(function(){
        //TODO stop checking for updates or something
    });
    
    $("#save").click(function(){
        var data = canvas.get(0).toDataURL();
        console.log(data);
        window.open(data);
    });
    
    $("#erase").click(function(){
        clearbs();
    });

    function erase(){
        context.clearRect(0, 0, 640, 480);
        dbindex = 0;
    }
    
    
    canvas.mousedown(function(e){
        lastEvent = e;
        mouseDown = true;
        path = [];
        path.push(lastEvent.offsetX);
        path.push(lastEvent.offsetY);
    }).mousemove(function(e){
        if(mouseDown) {
            
            if(path.length > maxPoints-2){
                canvas.mouseup();
                return;
            }
            
            var boxDist = Math.abs(lastEvent.offsetX-e.offsetX) + Math.abs(lastEvent.offsetY-e.offsetY);
            
            
            
            // at the beginning, accept fine strokes, but in general only accept strokes over a few pixels long
            if(boxDist > path.length/maxPoints * 3){
                context.lineJoin = context.lineCap = "round";
                context.beginPath();
                context.moveTo(lastEvent.offsetX, lastEvent.offsetY);



                context.lineTo(e.offsetX, e.offsetY);
                context.lineWidth = size *(1-path.length/maxPoints);
                context.strokeStyle = color;

                context.stroke();
                lastEvent = e;
                path.push(lastEvent.offsetX);
                path.push(lastEvent.offsetY);
            }
        }
    }).mouseup(function(){
        mouseDown = false;
        
        //bs = new BrushStroke("pink", size, path);
        bs = new BrushStroke(color, size, path);
        // send bs to server and apply it for other players
        sendbs(bs);
        
        
        applyBrushStroke(bs); // this will repeat the same stroke so it won't look different unless you modify the constructor a few lines up.
        path = [];
    }).mouseleave(function(){
        canvas.mouseup();
    });
    
    function applyBrushStroke(bs){

        if(bs.path.length < 2)
            return;
        
        var y0 = bs.path.pop();
        var x0 = bs.path.pop();
        bs.path.push(x0);
        bs.path.push(y0);
        
        while(bs.path.length > 0){
            context.lineJoin = context.lineCap = "round";
            context.beginPath();
            
            var y = bs.path.pop();
            var x = bs.path.pop();
            
            context.moveTo(x0, y0);
                        
            context.lineTo(x, y);
            context.lineWidth = bs.size * (1-bs.path.length/maxPoints);
            context.strokeStyle = bs.color;
            
            context.stroke();
            
            x0 = x;
            y0 = y;
        }
    }

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
    
});