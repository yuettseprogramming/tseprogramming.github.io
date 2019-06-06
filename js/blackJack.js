var blackJack = function() {
	this.type = ['♠', '♣', '♦', '♥'];
	this.card = ["A" ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9 ,10 ,"J", "Q", "K"];
	this.deck = [];
	this.deckShuffled = [];
	this.dealer = [];
	this.player = [];
	this.dealerPoint = 0;
	this.dealerPointWithA = 0;
	this.playerPoint = 0;
	this.playerPointWithA = 0;
	this.chips;
	this.insurance = false;
	this.playBoughtInsurance = false;
	this.dealerWithA = false;
	this.playerWithA = false;
	this.dealerFirstCardWithA = false;
	this.playerBust = false;
	this.dealerBust = false;
	this.playerBj = false;
	this.dealerBj = false;
	var i = 0;
	var whatToSay = "";
	
	this.createDeck = function() {
		for(i = 0; i < this.type.length; i++) {
			for(a = 0; a < this.card.length; a++) {
				this.deck.push(this.type[i] + this.card[a]);
			}
		}
	}
	
	this.shuffle = function() {
		var deckLength = this.deck.length
		var temp;
		for(i = 0; i < deckLength; i++) {
			temp = Math.floor(Math.random() * (this.deck.length));
			this.deckShuffled.push(this.deck[temp]);
			this.deck.splice(temp, 1);
		}
	}

	this.totalCardLeft = function() {
		document.getElementById("totalCard").innerHTML = "Total card in deck: " + this.deckShuffled.length;
	}

	this.removeTopCard = function() {
		this.deckShuffled.splice(0, 1);
	}

	this.giveCardToDealer = function() {
		this.dealer.push(this.deckShuffled[0]);
		this.removeTopCard();
		this.countPoints();
		this.totalCardLeft();
		document.getElementById("dealerCards").innerHTML = this.dealer[0];
		document.getElementById("dealerPoints").innerHTML = "?";
	}

	this.giveCardToPlayer = function() {
		this.player.push(this.deckShuffled[0]);
		this.removeTopCard();
		this.countPoints();
		this.totalCardLeft();
		document.getElementById("playerPoints").innerHTML = this.playerPoint;
		document.getElementById("playerCards").innerHTML = this.player;
	}

	this.giveCards = function() {
		this.giveCardToPlayer();
		this.giveCardToDealer();
		this.giveCardToPlayer();
		this.giveCardToDealer();
		this.countPoints();
	}

	this.countPoints = function() {
		var temp;
		this.dealerPoint = 0;
		this.dealerPointWithA = 0;
		this.playerPoint = 0;
		this.playerPointWithA = 0;
		for(i = 0; i < this.player.length; i++) {
			temp = this.player[i].match(/[^♠♣♦♥]+/);
			if(temp[0] === "A") {
				this.playerPoint += 1;
				this.playerPointWithA += 11;
			} else if(temp[0] < 10) {
				this.playerPoint += Number(temp);
				this.playerPointWithA += Number(temp);
			} else {
				this.playerPoint += 10;
				this.playerPointWithA += 10;
			}
		}
		for(i = 0; i < this.dealer.length; i++) {
			temp = this.dealer[i].match(/[^♠♣♦♥]+/);
			if(temp[0] === "A") {
				if(i === 0) {
					this.dealerFirstCardWithA = true;
				}
				this.dealerPoint += 1;
				this.dealerPointWithA += 11;
			} else if(temp[0] < 10) {
				this.dealerPoint += Number(temp);
				this.dealerPointWithA += Number(temp);
			} else {
				this.dealerPoint += 10;
				this.dealerPointWithA += 10;
			}
		}
		if(this.dealerPointWithA !== this.dealerPoint) {
			this.dealerWithA = true;
		} else {
			this.dealerWithA = false;
		}
		if(this.playerPointWithA !== this.playerPoint) {
			this.playerWithA = true;
		} else {
			this.playerWithA = false;
		}
		if(this.dealerPoint === 21 || this.dealerPointWithA === 21) {
			this.dealerBj = true;
		} else {
			this.dealerBj = false;
		}
		if(this.playerPointWithA === 21 || this.playerPoint === 21){
			this.playerBj = true;
		} else {
			this.playerBj = false;
		}
		this.pointsWithA();
		if(this.playerPoint > 21) {
			this.playerBust = true;
		} else {
			this.playerBust = false;
		}
		if(this.dealerPoint > 21) {
			this.dealerBust = true;
		} else {
			this.dealerBust = false;
		}

	}

	this.reset = function() {
		this.takeAwayCards();
		this.deckShuffled = [];
		this.createDeck();
		this.shuffle();
		this.gameButtonOff();
		//testing this.deckShuffled = ["♥6","♦A","♠J","♥5","♠10","♠2"];
	}

	this.nextRound = function() {
		this.takeAwayCards();
		if(this.deckShuffled.length < 22) {
			this.deckShuffled = [];
			this.createDeck();
			this.shuffle();
		}
		this.gameStart();
	}
	

	this.nextRoundButtonOn = function() {
		if($("#nextRound").is(":hidden")) {
			$("#nextRound").fadeToggle(1000, "linear");
		}
		//document.getElementById("nextRound").style.visibility = "visible";
	}

	this.nextRoundButtonOff = function() {
		if($("#nextRound").is(":visible")) {
			$("#nextRound").toggle("slide");
		}
		//document.getElementById("nextRound").style.visibility = "hidden";
	}

	this.stay = function() {
		this.hitAndStayButtonOff();
		this.nextRoundButtonOn();
		while(this.dealerPoint < 17) { //(this.dealerPoint < 17 && this.dealerPointWithA < 17)
			this.giveCardToDealer();
		}
		/*while(this.dealerPoint < 17) { //(this.dealerPoint < 17 && this.dealerPointWithA > 21)
			this.giveCardToDealer();
		}*/
		document.getElementById("dealerPoints").innerHTML = this.dealerPoint;
		document.getElementById("dealerCards").innerHTML = this.dealer;
		this.whoWin();
		//this.varChecker();
	}

	this.clearResult = function() {
		document.getElementById("result").innerHTML = "";
	}

	this.hitAndStayButtonOn = function() {
		if($("#hit").is(":hidden")) {
			$("#hit").fadeToggle(1000, "linear");
			$("#stay").fadeToggle(1000, "linear");
		}
		//document.getElementById("hit").style.visibility = "visible";
		//document.getElementById("stay").style.visibility = "visible";
	}

	this.hitAndStayButtonOff = function() {
		if($("#hit").is(":visible")) {
			$("#hit").toggle("slide");
			$("#stay").toggle("slide");
		}

		//document.getElementById("hit").style.visibility = "hidden";
		//document.getElementById("stay").style.visibility = "hidden";
	}

	this.gameButtonOn = function() {
		if($("#game").is(":hidden")) {
			$("#game").fadeToggle(1000, "linear");
		}
		
		//document.getElementById("game").style.visibility = "visible";
	}
	
	this.gameButtonOff = function() {
		if($("#game").is(":visible")) {
			$("#game").toggle("slide");
		}
		
		//document.getElementById("game").style.visibility = "hidden";
	}

	this.pointsWithA = function() {
		if(this.playerPointWithA !== this.playerPoint && this.playerPointWithA < 22) {
			this.playerPoint = this.playerPointWithA;
		}
		if(this.dealerPointWithA !== this.dealerPoint && this.dealerPointWithA < 22) {
			this.dealerPoint = this.dealerPointWithA;
		}
	}

	this.takeAwayCards = function() {
		this.dealer = [];
		this.player = [];
	}

	this.hit = function() {
		this.giveCardToPlayer();
		if(this.playerBj === true) {
			this.stay();
			if(this.playerBj === true && this.dealerBj === true) {
				//document.getElementById("result").innerHTML = "Draw";
			} else {
				//document.getElementById("result").innerHTML = "You Win!";
			}
		} else if(this.playerPoint > 21) {
			//document.getElementById("result").innerHTML = "You Busted!";
			this.stay();
		}
		//this.varChecker();
	}


	this.whoWin = function() {
		if(this.playerBj === true || this.dealerBj === true) {
			if(this.playerBj === true && this.dealerBj === true) {
				document.getElementById("result").innerHTML = "You both got BJ! Draw!";
			} else if(this.dealerBust === true) {
				document.getElementById("result").innerHTML = "You got BJ, but dealer got busted anyway!";
			} else if(this.playerBust === true) {
				document.getElementById("result").innerHTML = "Dealer got BJ, but you got busted anyway.";
			} else if(this.playerBj === true) {
				document.getElementById("result").innerHTML = "You got BJ!";
			} else {
				document.getElementById("result").innerHTML = "Dealer got BJ!";
			}
		} else if(this.playerBust === true || this.dealerBust === true) {
			if(this.playerBust === true && this.dealerBust === true) {
				document.getElementById("result").innerHTML = "You both got busted, but dealer still win the game";
			} else if(this.dealerBust === true) {
				document.getElementById("result").innerHTML = "Dealer got Busted!";
			} else {
				document.getElementById("result").innerHTML = "You got Busted!";
			}
		} else if(this.playerPoint === this.dealerPoint) {
			document.getElementById("result").innerHTML = "Draw!";
		} else if(this.playerPoint > this.dealerPoint) {
			document.getElementById("result").innerHTML = "You Win!";
		} else {
			document.getElementById("result").innerHTML = "Dealer Win!";
		}
	}

	this.gameStart = function() {
		this.clearResult();
		this.giveCards();
		//this.pointsWithABool();
		if(this.playerBj === true && this.dealerBj === true) {
			this.stay();
		} else if(this.playerBj === true) {
			this.stay();
		} else if(this.dealerBj === true) {
			this.stay();
		} else {
			this.hitAndStayButtonOn();
			this.nextRoundButtonOff();
		}


		


		/*if(this.PlayerBJ === true && this.dealerBj === true) {
			document.getElementById("result").innerHTML = "Draw";
		} else if (this.playerBj === true) {
			document.getElementById("result").innerHTML = "You Win!";
		} else if(this.dealerFirstCardWithA === true) {
			document.getElementById("result").innerHTML = "Insurance?";
			if(this.dealerBj === true) {
				if(this.playBoughtInsurance === true) {
					document.getElementById("result").innerHTML = "You lose nothing with insurace";
				} else if(this.dealerBj === true) {
					document.getElementById("result").innerHTML = "Dealer Win!?";
				}
			} else {
				document.getElementById("result").innerHTML = "Dealer no BJ";
				this.hitAndStayButtonOn();
			}
		} else if(this.dealerBj === true) {
			document.getElementById("result").innerHTML = "Dealer BJ Win!";
		} else {
			document.getElementById("result").innerHTML = "Hit or Stay";
			this.hitAndStayButtonOn();
		}*/
		//this.varChecker();
	}


	//To check the all the var in console
	this.varChecker = function() {
		console.log("deckShuffled = ", this.deckShuffled);
		console.log("Player = ", this.player);
		console.log("PlayerPoint = ", this.playerPoint);
		console.log("playerPointWithA = ", this.playerPointWithA)
		console.log("PlayerWithA = ", this.playerWithA);
		console.log("PlayerBJ = ", this.playerBj);
		console.log("PlayerBust = ", this.playerBust);
		console.log("-------------");
		console.log("Dealer = ", this.dealer);
		console.log("DealerPoint = ", this.dealerPoint);
		console.log("DealerPointWithA = ", this.dealerPointWithA);
		console.log("DealerWithA = " , this.dealerWithA);
		console.log("dealerFirstCardWithA = ", this.dealerFirstCardWithA);
		console.log("DealerBJ = ", this.dealerBj);
		console.log("DealerBust = ", this.playerBust);
	}
}


var letTheGameBegin = new blackJack;


