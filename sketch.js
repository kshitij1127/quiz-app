var canvas, backgroundImage;

var gameState = 0;
var contestantCount;
var allContestants;
var answer;
var database;

var question, contestant, quiz;

var reset 


function setup(){
  canvas = createCanvas(850,500);
  database = firebase.database();
  quiz = new Quiz();
  quiz.getState();
  quiz.start();
  reset = createButton('reset',400,400)
}


function draw(){
  background("pink");
  if(contestantCount === 2){
    quiz.update(1);
  }
  if(gameState === 1){
    clear();
    quiz.play();
  }
  reset.mousePressed(() => {
    quiz.resetdb()
  })
}
