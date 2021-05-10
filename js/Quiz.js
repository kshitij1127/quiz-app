class Quiz {
  constructor() {}

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state,
    });
  }

  async start() {
    if (gameState === 0) {
      contestant = new Contestant();
      var contestantCountRef = await database
        .ref("contestantCount")
        .once("value");
      if (contestantCountRef.exists()) {
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question();
      question.display();
    }
  }

  play() {
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("pink");

    //write code to show a heading for showing the result of Quiz
    text("The result of the quiz", 120, 20);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if (allContestants !== undefined) {
      fill("blue");
      textSize(20);
      text(
        "Note: The contestants who answered correctly are highlighted in green color!",
        130,
        230
      );
    }

    //write code to add a note here

    //write code to highlight contestants who answered correctly
    var y = 250

    for (var plr in allContestants) {
      var correctans = "2";
      if ((allContestants[plr].answer === correctans)) {
        fill("green");
      } else {
        fill("red")
      }

      y = y+30
      text(allContestants[plr].name + " : "  + allContestants[plr].answer,130,y);
    }
  }

  resetdb() {
    var dbref = database.ref("/").update({
      gameState: 0,
      contestantCount: 0,
      contestants: null,
    });
  }
}
