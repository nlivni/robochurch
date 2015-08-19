$(function(){
    $("#mainframe-content").typed({
        strings: ["If you were disconnected right now would you be a zero or a one"],
        typeSpeed: 0,
        showCursor: false
    });
});

var _Margin = 20;

var $serverLeft = $('#server-left');
var $serverRight = $('#server-right');
var $servers = $('.server-container');
var $mainframeContainer = $('.mainframe');
var $serverWidth = $serverLeft.width();
var $serverHeight = $serverLeft.height();
var $content = $('#mainframe-content ');
var $serverSectionTop = $('.server-section-top');
var $serverSectionMiddle = $('.server-section-middle');
var $serverSectionBottom = $('.server-section-bottom');

// so window resize is only called once per resize
var rtime;
var timeout = false;
var delta = 200;

function resetWindow() {
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
        if($windowWidth < 768) {
            renderRobochurchCSSMobile();
        } else {
            renderRobochurchCSS();
        }
    }
}

$(window).resize(function() {
    resetWindow();
});

$(document).ready(function() {
    resetWindow();
});


function renderRobochurchCSS() {
    console.log('SCREEN')
    console.log('$windowWidth: ' + $windowWidth);
    console.log('$windowWidth:' + $windowHeight);
    $mainframeContainer.height($windowHeight);
    $mainframeContainer.width($windowWidth);
    $content.height($windowHeight - _Margin);
    $servers.height($windowHeight);
    $serverSectionTop.height($windowHeight * .25);
    $serverSectionMiddle.height($windowHeight * .50);
    $serverSectionBottom.height($windowHeight * .25);

}

function renderRobochurchCSSMobile() {
    console.log('MOBILE');
    console.log('$windowWidth: ' + $windowWidth);
    console.log('$windowWidth:' + $windowHeight);
}



// the loop
if(responsiveVoice.isPlaying()) {
    console.log("I hope you are listening");
    // calls responsivevoice
}
