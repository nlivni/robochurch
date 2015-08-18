
// so window resize is only called once per resize
var rtime;
var timeout = false;
var delta = 200;

function getWindowSize() {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeEnd, delta);
    }
}

function resizeEnd() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeEnd, delta);
    } else {
        timeout = false;
        //alert('Done resizing');
        $windowWidth = $(window).width();
        $windowHeight = $(window).height();
        console.log($windowWidth);
        console.log($windowHeight);
        var $s = $("#svg");
        $s.height('100%');
        $s.width('100%');

        renderRobochurchSVG();
    }
}

$(window).resize(function() {
    getWindowSize();
});

$(document).ready(function() {
    getWindowSize();
});


var s = Snap("#svg");
var marginSize = 10;

function renderRobochurchSVG() {

    console.log('svg height: ' + $windowHeight);
    console.log('svg width: ' + $windowWidth);
// draw mainframe
    var leftFrame = s.rect(marginSize, marginSize, 150, $windowHeight-(marginSize));
    var rightFrame = s.rect($windowWidth - (150 + (marginSize * 2)), marginSize, 150, $windowHeight-(marginSize));
// By default its black, lets change its attributes
    leftFrame.attr({
        fill: "#bada55",
        stroke: "#000",
        strokeWidth: 5
    });
    rightFrame.attr({
        fill: "#bada55",
        stroke: "#000",
        strokeWidth: 5
    });
// Now lets create another small circle:
    var smallRect = s.rect(100,100, 100, 100);

    smallRect.attr({
        fill: "#fff",
        stroke: "#000",
        strokeWidth: 5
    });
}