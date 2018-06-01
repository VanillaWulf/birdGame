let canvas = document.getElementById('canvas');
let contex =canvas.getContext('2d');

//pictures

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeDown = new Image();

bird.src = 'img/bird.png';
bg.src = 'img/bg.png';
fg.src = 'img/fg.png';
pipeUp.src = 'img/pipeUp.png';
pipeDown.src = 'img/pipeDown.png';

//sounds

let fly = new Audio();
let scoreAudio = new Audio();

fly.src = 'audio/fly.mp3';
scoreAudio.src = 'audio/score.mp3';


let gap = 90;
let score =0;

//bird

let xPos = 10;
let yPos = 150;
let gravitation = 1.5;

//bird control

document.addEventListener('keydown',moveUp);

function moveUp(){
  yPos -=25;
  fly.play();
}

//block generation

let pipe = [];

pipe[0]={
  x : canvas.width,
  y : 0
}


function draw(){
  contex.drawImage(bg,0,0);

  for(let i = 0; i < pipe.length;  i++){
    contex.drawImage(pipeUp,pipe[i].x,pipe[i].y);
    contex.drawImage(pipeDown,pipe[i].x,pipe[i].y + pipeUp.height + gap);

    pipe[i].x--;

    if(pipe[i].x==75){
      pipe.push({
        x : canvas.width,
        y : Math.floor(Math.random()*pipeUp.height)-pipeUp.height
      });
    };

    //bird crash

    if(xPos + bird.width >= pipe[i].x
      && xPos <= pipe[i].x +pipeUp.width
      && (yPos <= pipe[i].y + pipeUp.height
          || yPos + bird.height >= pipe[i].y+pipeUp.height + gap)
          || yPos + bird.height >= canvas.height - fg.height){
            location.reload();
      }

      if(pipe[i].x==5){
        score++;
        scoreAudio.play();
      }
  }

  contex.drawImage(fg,0,canvas.height - fg.height);
  contex.drawImage(bird,xPos,yPos);

  yPos += gravitation;

  contex.fillStyle = '#000';
  contex.font = '20px Verdana';
  contex.fillText('Score: ' + score, 10, canvas.height - 20);

  requestAnimationFrame(draw);
}

pipeDown.onload = draw;
