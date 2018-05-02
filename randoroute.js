// timer properties
var expired = false;
var delay = 3000; // initial set to 1 minute
var timerHandle;
var sound = true;
var vibration = true;

// arrow click listeners
document.getElementById("left-straight").addEventListener('click', function(event) {
	console.log("left-straight arrow click");
	imageTransitions(event.target, rotLeftStraight);
}, false);
document.getElementById("left-straight-right").addEventListener('click', function(event) {
	console.log("left-straight-right arrow click");
	imageTransitions(event.target, rotLeftStraightRight);
}, false);
document.getElementById("left-right").addEventListener('click', function(event) {
	console.log("left-right arrow click");
	imageTransitions(event.target, rotLeftRight);
}, false);
document.getElementById("straight-right").addEventListener('click', function(event) {
	console.log("straight-right arrow click");
	imageTransitions(event.target, rotStraightRight);
}, false);

// timer click listeners
document.getElementById("timer-.5").addEventListener('click', function(event) {
	console.log("timer .5 click");
	setDelay(30);
}, false);
document.getElementById("timer-1").addEventListener('click', function(event) {
	console.log("timer 1 click");
	setDelay(60);
}, false);
document.getElementById("timer-2").addEventListener('click', function(event) {
	console.log("timer 2 click");
	setDelay(120);
}, false);
document.getElementById("timer-3").addEventListener('click', function(event) {
	console.log("timer 3 click");
	setDelay(180);
}, false);
// config button listeners
document.getElementById("sound-button").addEventListener('click', function(event) {
	console.log("sound button click");
	toggleSound();
}, false);
document.getElementById("vibration-button").addEventListener('click', function(event) {
	console.log("vibration button click");
	toggleVibration();
}, false);

loop();
resetTimer();

// handlers
function imageTransitions(target, callback) {
	console.log("resetting image rotation and transition status")
	target.className = "no-transition";
	target.style.transform = "rotate(0deg)";
	setTimeout(function() {
		target.className = "transition";
		resetTimer();
		callback(target);
	}, 100);
}
// newDelay is in seconds
function setDelay(newDelay) {
	// set the delay value
	delay = newDelay * 1000;
	console.log('new delay: ' + delay);

	// reset the timer itself
	resetTimer();
}

function resetTimer() {
	clearTimeout(timerHandle);
	// reset the background color
	document.querySelector('body').style.backgroundColor = "#444";
	expired = false;

	// reset timer
	timerHandle = setTimeout(function() {
		// when timer expires
		expired = true;
		alertTimeUp();
	}, delay);
	console.log('timerHandle: ' + timerHandle);
}

function loop() {
	console.log('loop looping . . .');
	if(expired) {
		var body = document.querySelector('body')
		if(body.className == "pulse-red") {
			body.style.backgroundColor = "";
			body.className = "pulse-dark-red";
		}
		else {
			body.style.backgroundColor = "";
			body.className = "pulse-red";
		}
	}
	else {
	  console.log('not expired');
	}
	setTimeout(loop, 1000);
}

function alertTimeUp() {
	if(sound) {
		console.log('doing sound');
		var audio = new Audio("buzzer.wav");
		audio.loop = false;
		audio.play();
	}
	if(vibration) {
		console.log('doing vibration');
		window.navigator.vibrate([500, 500, 100, 100, 100, 100, 100, 100, 100]);
	}
}

function rotLeftStraight(target) {
	var final;
	var result = Math.floor(Math.random() * 2);
	switch(result) {
		case 0:
			final = 270;
			break;
		case 1:
			final = 360;
			break;
	}
	target.style.transform = "rotate(" + ((360 * 4) + final) + "deg)";
}
function rotLeftStraightRight(target) {
	var final;
	var result = Math.floor(Math.random() * 3);
	switch(result) {
		case 0:
			final = 270;
			break;
		case 1:
			final = 360;
			break;
		case 2:
			final = 90;
			break;
	}
	target.style.transform = "rotate(" + ((360 * 4) + final) + "deg)";
}
function rotLeftRight(target) {
	var final;
	var result = Math.floor(Math.random() * 2);
	switch(result) {
		case 0:
			final = 270;
			break;
		case 1:
			final = 90;
			break;
	}
	target.style.transform = "rotate(" + ((360 * 4) + final) + "deg)";
}
function rotStraightRight(target) {
	var final;
	var result = Math.floor(Math.random() * 2);
	switch(result) {
		case 0:
			final = 90;
			break;
		case 1:
			final = 360;
			break;
	}
	target.style.transform = "rotate(" + ((360 * 4) + final) + "deg)";
}

function toggleSound() {
	sound = !sound;
	console.log('sound ' + sound ? 'on' : 'off');
	
	var button = document.getElementById('sound-button');
	if(button.classList.contains('active')) {
		button.classList.remove('active');
		button.classList.add('inactive');
	}
	else {
		button.classList.remove('inactive');
		button.classList.add('active');
	}
}
function toggleVibration() {
	vibration = !vibration;
	console.log('vibration ' + vibration ? 'on' : 'off');
	
	var button = document.getElementById('vibration-button');
	if(button.classList.contains('active')) {
		button.classList.remove('active');
		button.classList.add('inactive');
	}
	else {
		button.classList.remove('inactive');
		button.classList.add('active');
	}
}