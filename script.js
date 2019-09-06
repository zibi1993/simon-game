var buttonColours = ["white","orange","red","blue","green","yellow"];
var gamePattern= [];
var userClicked=[];
var level = 0;
var valuePressed = false;


$(document).keypress(function(){
    if(!valuePressed){
        $("#level-title").text("Level: " + level);
        nextSequence();
        valuePressed= true;

    }
})

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClicked.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClicked.length-1);
    
})
function nextSequence(){
    level++;
    userClicked=[];
    console.log(userClicked);
    $("#level-title").text("Level: "+ level);
    var randomNumber = Math.floor(Math.random()*6);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);    
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    
}
function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
$("#"+currentColor).addClass("pressed");

setTimeout(function(){
$("#"+currentColor).removeClass("pressed");
},100);
}
function checkAnswer(currentLevel){
if(userClicked[currentLevel]===gamePattern[currentLevel]){
    if(userClicked.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }

}
else{
   playSound("wrong");
    $("body").addClass("game-over");
   setTimeout(function(){
       $("body").removeClass("game-over");
   },500);

   $("#level-title").text("Game Over, level: "+level+" Press Any Key to Restart");
   startOver();
}
}

function  startOver(){
    level=0;
    valuePressed= false;
    gamePattern=[];

}
