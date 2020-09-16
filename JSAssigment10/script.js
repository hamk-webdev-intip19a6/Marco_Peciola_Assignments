var img = new Image();
var text = new Image();
var audio = new Audio('music.mp3');
kissa = false;

function init() {
    if (kissa === false){
        kissa = true;
    } else{
        kissa = false;
    }

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    context.beginPath();
    var grd = context.createLinearGradient(0, 0, 200, 0);
    grd.addColorStop(0, "red");
    grd.addColorStop(1, "cyan");
    context.fillStyle = "#0000ff"; // #ffe4c4
    context.arc(200, 50, 50, 0, Math.PI * 2, true); // draw circle for head
    // (x,y) center, radius, start angle, end angle, anticlockwise
    context.fillStyle = grd;
    context.fill();

    context.beginPath();
    context.strokeStyle = "black"; // color
    context.lineWidth = 6;
    context.arc(200, 60, 20, 0, Math.PI, false); // draw semicircle for smiling
    context.stroke();

    // eyes
    context.beginPath();
    context.fillStyle = "red"; // color
    context.arc(190, 50, 3, 0, Math.PI * 2, true); // draw left eye
    context.fill();
    context.arc(210, 50, 3, 0, Math.PI * 2, true); // draw right eye
    context.fill();

    // body
    context.beginPath();
    context.moveTo(200, 100);
    context.lineTo(200, 180);
    context.strokeStyle = "navy";
    context.stroke();

    // arms
    context.beginPath();
    context.strokeStyle = "pink";
    context.moveTo(200, 100);
    context.lineTo(150, 130);
    context.moveTo(200, 100);
    context.lineTo(250, 130);
    context.stroke();

    // legs
    context.beginPath();
    context.strokeStyle = "brown";
    context.moveTo(200, 180);
    context.lineTo(150, 280);
    context.moveTo(200, 180);
    context.lineTo(250, 280);
    context.stroke();


    function save() {
        // get the data
        img.src = canvas.toDataURL("image/png");
    }
    save();

    
    window.requestAnimationFrame(draw);
    

}



function draw() {
    var ctx = document.getElementById('myCanvas').getContext('2d');

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 450, 450); // clear canvas

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
    ctx.save();
   

    var time = new Date();
    ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
    ctx.translate(105, 0);
    ctx.drawImage(img, 0, 0);

    ctx = document.getElementById('myCanvas').getContext('2d');
    // Text
    ctx.font = "30px Garamond";
    ctx.fillStyle = "#220033";
    ctx.fillText("MARCO", 250, 200);

    if (kissa === true){
        audio.play();
        window.requestAnimationFrame(draw);
    }else{
        audio.pause();
    }
    
}

