$(document).ready(function() {


    var info = {
        username: null,
        board_owner: null,
        board_name: null,
        board_id: null,
        read_write: null
    };

    $.ajax({
        url: "./resources/php/drawing.php",
        async: false,
        method: 'POST',
        data: {
            action: "get"
        },
        
        success: function(result){
            console.log('ajax:\n'+result);
            info = jQuery.parseJSON(result);
            $(".Title").html(info.name);
            $("#owner").html("by "+info.owner);
            $("#name").html("Hello, "+info.username);
            if(info.read_write == "write")
            {
                $("#buttons").append("<td><button id=\"erase\" style=\"background-color: #f284bf;\">Erase All</button></td>");
                $("#tools").append('\
                    <div class="tools">\
                        <h2>Tools</h2>\
                        <table>\
                            <tr>\
                                <th>Color</th>\
                                <th>Size</th>\
                                <th>Preview</th>\
                            </tr>\
                            <tr>\
                                <td><input type="text" value="#3e86fa" id="colorPicker"/></td>\
                                <td><input type="range" min="1" max="100" id="size"/></td>\
                                <td><div id="brush"></div></td>\
                            </tr>\
                        </table>\
                    </div>');
            }
            console.log(info);
        }
    });


    
    setInterval(function(){getbs();}, 100);
    getonline();
    setInterval(function(){getonline();updatethumb();},5000);
    
    console.log('test');
    console.log("drawing.js:\n"+info);

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

        //console.log(data);
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
        if(info.read_write == 'read') return;
        lastEvent = e;
        mouseDown = true;
        path = [];
        path.push(lastEvent.offsetX);
        path.push(lastEvent.offsetY);
    }).mousemove(function(e){
        if(info.read_write == 'read') return;
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
        if(info.read_write == 'read') return;
        mouseDown = false;
        
        //bs = new BrushStroke("pink", size, path);
        bs = new BrushStroke(color, size, path);
        // send bs to server and apply it for other players
        sendbs(bs);
        
        
        applyBrushStroke(bs); // this will repeat the same stroke so it won't look different unless you modify the constructor a few lines up.
        path = [];
    }).mouseleave(function(){
        if(info.read_write == 'read') return;
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
            url: "./resources/php/sendbs.php",
            async: true,
            data: {
                password: 'chocolate',
                stroke: s,
                id: info.id
            },
            method: 'POST'
        });
        updatethumb();
    }

    function getbs(){
        if(mouseDown) return;
        $.ajax({
            url: "./resources/php/getbs.php",
            async: true,
            data: {
                password: 'chocolate',
                id: info.id
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
            url: "./resources/php/clearbs.php",
            async: true,
            data: {
                password: 'chocolate',
                id: info.id
            },
            method: 'POST'
        });
        updatethumb();
    }

    function getonline(){
        $.ajax({
            url: "./resources/php/online.php",
            async: true,
            method: 'POST',
            data: {
                board_id:info.id
            },
            success: function(result){
                $("#online").html(result);
            }
        });

    }

    function updatethumb(){
        var data = canvas.get(0).toDataURL();

        $.ajax({
            url: './resources/php/updatethumb.php',
            async: true,
            method: 'POST',
            data: {
                id: info.id,
                data: data
            },
            success: function(response){
                console.log(response);
            }
        });
    }
    
});