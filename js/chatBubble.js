var i = 0;
var top1 = 0;
var temp;
var txt = 'Hello, I am a front‑end web developer focus on fun & user‑friendly experiences! Welcome to my old school  style portfolio(Not fully done yet)! Hope you can have some fun here. ';
var speed = 20;
var talking = false;
var mouthOpened = false;
var matchmanNum = 0;

function removeLeftTopBubble() {
	document.getElementById("introTalkBubble" + matchmanNum).classList.remove("left-top");
}

function openMouth() {
	document.getElementById("matchman" + matchmanNum).src = "css/img/matchmanCloseMouth.png";
	mouthOpened = true;
}

function closeMouth(matchman) {
	document.getElementById("matchman" + matchmanNum).src = "css/img/matchmanOpenMouth.png";
	mouthOpened = false;
}

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("introduction" + matchmanNum).innerHTML += txt.charAt(i);
    //document.getElementById("block").style.padding = i + "px";
    i++;
    if(i % 4 === 1) {
    	if (mouthOpened === true) {
  			closeMouth();
  		} else {
  			openMouth();
		  }
    }
    setTimeout(typeWriter, speed);
  } else if (i === txt.length) {
    $("#myName").fadeIn(2000);
    document.getElementById("matchman" + matchmanNum).src = "css/img/matchmanOpenMouth.png";
    document.getElementById("myName").style.visibility = "visible";
    $("#bottomOfFirstPage").fadeIn(4000);
    document.getElementById("bottomOfFirstPage").style.visibility = "visible";
    document.getElementById("bottomOfFirstPage").style.backgroundColor = "#f8f8f8"
    document.getElementById("result").style.visibility = "#visible"
    $('#dealerBubble').toggle("slide");
    $("#result").toggle("slide");
  $("#game").toggle("slide");
  }
}




$(document).ready(function() {
  $("#myName").fadeOut(10);
  $("#bottomOfFirstPage").fadeOut(10);
	document.getElementById("playerHand").innerHTML += "<div class='" + "card suitdiamonds" + "'><p>A</p></div>";
	//document.getElementById("game").style.visibility = "hidden";
	$("#result").toggle("slide");
	$("#game").toggle("slide");
	$('#dealerBubble').toggle("slide");
	$('#matchman1').toggle("slide");
	$('#introTalkBubble1').toggle("slide");
	typeWriter();

	//$('#matchman0').toggle( "slide" );
});  


