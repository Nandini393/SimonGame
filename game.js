const buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];



var started = false;
var level = 0;



// Detecting key presses or touches
$(document).on("keydown touchstart", function(){
    if(!started){
        $("#level-title").text('Level: ' + level);
        nextSequence();
        started = true;
        $("h2").show();
    }else{
        $("h2").hide();
    }
})



// Generates a next random sequence
function nextSequence() {

    userPattern = [];
    level++; 
    $("#level-title").text('Level: ' + level);
    var randNum = Math.floor(Math.random() * 4)
    var randColor = buttonColor[randNum];
    gamePattern.push(randColor);

   $("#" + randColor).fadeIn(100).fadeOut(100).fadeIn(100);
   makeSound(randColor);
}



// Detecting color press
$(".btn").on("click", function(){
    var userColor = $(this).attr("id");
    userPattern.push(userColor);
    //console.log(userPattern);
    makeSound(userColor);
    animatePress(userColor);
    checkAns(userPattern.length-1);
})



// Makes sound corresponding to image
function makeSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}



// User button click animation
function animatePress(currColor){
    $("#" + currColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currColor).removeClass("pressed");
    }, 100);
}



// Checks if the user has completed the correct pattern
// If completed and correct, moved on to next random color
// If incorrrect, the game is over
function checkAns(currLevel){
    if(gamePattern[currLevel]=== userPattern[currLevel]){
        if(userPattern.length === gamePattern.length){
             setTimeout(function(){
            nextSequence();
        }, 1000);
        }
    } else{
        makeSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text('Game over :( Tap or Press any key to restart ');
        $("h2").hide();
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 500);
        startOver();
    }
}



//Function to start over
function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
    userPattern = [];
}