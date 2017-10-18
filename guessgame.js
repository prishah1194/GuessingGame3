function generateWinningNumber(){
    return Math.floor(Math.random()*100)+1;
   }
   
function shuffle(shuffledArray){
  var i=shuffledArray.length,j,temp;
  while(--i>0){
    j=Math.floor(Math.random()*(i+1));
    temp=shuffledArray[j];
    shuffledArray[j]=shuffledArray[i];
    shuffledArray[i]=temp;
   }
    return shuffledArray;
  }
  

  function Game(playersGuess,pastGuesses){
    this.playersGuess=null;
    this.pastGuesses=[];
    this.winningNumber= generateWinningNumber();
  }
  
Game.prototype.difference=function(){
  if(this.playersGuess>this.winningNumber){
    return this.playersGuess-this.winningNumber;
  }
  else{
    return this.winningNumber-this.playersGuess;
  }
};  


  Game.prototype.isLower=function(){
    if(this.playersGuess<this.winningNumber){
      return true;
    }
    else{
      return false;
    }
  };
  
  Game.prototype.playersGuessSubmission=function(num){
    if(num>100 || num<1 || typeof num!=="number"){
      throw ( "That is an invalid guess.");
    }
    
this.playersGuess=num;
return this.checkGuess();
    
    
  };
  
   
  Game.prototype.checkGuess=function(){
    if(this.playersGuess===this.winningNumber){
      $('#hint, #submit').prop("disabled",true);
      $('#subtitle').text("Press the Reset button to play again!")
      return "You Win!";
    }
    else{
      if(this.pastGuesses.indexOf(this.playersGuess) !== -1){
        return "You have already guessed that number.";
      }
      else{
        this.pastGuesses.push(this.playersGuess);
        $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
        if(this.pastGuesses.length===5){
          $('#hint, #submit').prop("disabled",true);
          $('#subtitle').text("Press the Reset button to play again!")
          return "You Lose.";
        }
        else{
          var diff=this.difference();
          if(this.isLower()) {
            $('#subtitle').text("Guess Higher!")
        } else {
            $('#subtitle').text("Guess Lower!")
        }
          if(diff<10){return "You\'re burning up!";}
          else if(diff<25){return "You\'re lukewarm.";}
          else if(diff<50){return "You\'re a bit chilly.";}
          else{return "You\'re ice cold!";}
        }
      }
    }
};

function newGame(){
    return new Game();
}

Game.prototype.provideHint=function(){
var hintArray=[this.winningNumber,generateWinningNumber(),generateWinningNumber()];
    return shuffle(hintArray);
}

function makeAGuess(game) {
  var guess = $('#yourNumb').val();
  $('#yourNumb').val("");
  if (guess<1 || guess>100 || (guess%1!=0)){
    alert("Please enter a valid number between 1 and 100");
  }else{
  
  var output = game.playersGuessSubmission(parseInt(guess,10));
  $('#title').text(output);
}}

$(document).ready(function() {
  var game = new Game();
  
  $('#submit').click(function(e) {
     makeAGuess(game);
  })

  $('#yourNumb').keypress(function(event) {
      if ( event.which == 13 ) {
         makeAGuess(game);
      }
  })
  $('#hint').click(function() {
    var hints = game.provideHint();
    $('#title').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
});

$('#reset').click(function() {
    game = newGame();
    $('#title').text('Play the Guessing Game!');
    $('#subtitle').text('Guess a number between 1-100!')
    $('.guess').text('-');
    $('#hint, #submit').prop("disabled",false);

})
})