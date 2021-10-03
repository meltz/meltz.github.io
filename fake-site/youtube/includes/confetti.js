/* a Pen by Diaco m.lotfollahi  : https://diacodesign.com */
var svgNS = "http://www.w3.org/2000/svg";

var total = 50;
var w = $("#conffeti").width();
var h = $("#conffeti").height();

for (i = 0; i < total; i++) {
	var myCircle = document.createElementNS(svgNS, "rect");
	myCircle.setAttributeNS(null, "class", "dot");
	myCircle.setAttributeNS(null, "width", 7);
	myCircle.setAttributeNS(null, "height", 12);
	document.getElementById("conffeti").appendChild(myCircle);
	TweenMax.set($(".dot")[i], {
		x: Random(w),
		y: 0,
		rotation: Random(180),
		opacity: 1,
		scale: Random(0.5) + 0.5,
		fill: "hsl(43, 96.4%, 78.2%)"
	});
	animm($(".dot")[i]);
}

function animm(elm) {
	TweenMax.to(elm, Random(5) + 4, {
		y: h,
		ease: Linear.easeNone,
		repeat: -1,
		delay: -5
	});
	TweenMax.to(elm, Random(5) + 1, {
		x: '+=70',
		repeat: -1,
		yoyo: true,
		ease: Sine.easeInOut
	})
	TweenMax.to(elm, Random(5) + 1, {
		scaleX: 0.2,
		rotation: Random(360),
		repeat: -1,
		yoyo: true,
		ease: Sine.easeInOut
	})
	TweenMax.to(elm, Random(1) + 0.5, {
		opacity: 0,
		repeat: -1,
		yoyo: true,
		ease: Sine.easeInOut
	})
}

function Random(max) {
	return Math.random() * max;
}

function random(min, max) {
	return min + Math.floor(Math.random() * (max - min));
}
/* a Pen by Diaco m.lotfollahi  : https://diacodesign.com */