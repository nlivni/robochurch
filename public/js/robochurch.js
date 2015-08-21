$(function(){
    $("#mainframe-content").typed({
        strings: ["If you were disconnected right now would you be a zero or a one"],
        typeSpeed: 0,
        showCursor: false
    });
});

var _Margin = 20;

var $windowWidth = $(window).width();
var $windowHeight = $(window).height();
var $serverLeft = $('#server-left');
var $serverRight = $('#server-right');
var $servers = $('.server-container');
var $mainframeContainer = $('.mainframe');
var $serverWidth = Math.floor($serverLeft.width());
var $serverHeight = Math.floor($serverLeft.height());
var $content = $('#mainframe-content ');
var $serverSectionTop = $('.server-section-top');
var $serverSectionMiddle = $('.server-section-middle');
var $serverSectionBottom = $('.server-section-bottom');
var $serverVentTop = $('.server-vent-top');
var $serverVentMiddle = $('.server-vent-middle');
var $serverVentBottom = $('.server-vent-bottom');

/*  so window resize is only called once per resize */
 var rtime;
 var timeout = false;
 var delta = 100;

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
    //resetWindow();
    if($windowWidth < 768) {
        renderRobochurchCSSMobile();
    } else {
        renderRobochurchCSS();
    }

});

// should this take arguments for size and # vents and selector to output HTML?
function topVentHTML(){
    var numVentHoles = 3;
    //var numVentRows = 1;
    var numVentRows = $serverSectionTop.height() / 22;
    var ventHoleWidth = (Math.floor($serverSectionTop.width()) - (5 * numVentHoles))/numVentHoles;
    var outputHTML = '';
    for(var i=0; i < numVentRows; i++) {
        var currentRowClass = 'server-vent-top-row';
        var currentRowID = currentRowClass + '-' + i;
        //console.log('currentRowClass: ' + currentRowClass);
        //console.log('currentRowID: ' + currentRowID);
        outputHTML += '<div id="'+ currentRowID +'" class=" row  '+ currentRowClass +'">';
        for(var j=0; j < numVentHoles; j++) {
            outputHTML += '<div class="vent-hole col-sm-4" id="vent-hole-' + i + '-'+ j + '"></div>';
        }
        outputHTML += '</div>';
    }
    $serverVentTop.html(outputHTML);
    //$('.vent-hole').width(ventHoleWidth);
    //$('.vent-hole').height($serverSectionTop.height() / (numVentRows + 1.2));
}

function middleVentHTML(){
    var numButtons = Math.floor(($('.server-vent-side').height() - 10) / ($('.server-vent-side').width() + 20));
    console.log(numButtons);
    var outputHTML = '';
    for(var i=0; i < numButtons; i++) {
        outputHTML += '<div id="side-button-' + i + '" class="side-button"></div>';
    }
    $('.server-vent-side').html(outputHTML);
    $('.side-button').height($('.side-button').width());
    $('.server-monitor').height($('.server-monitor-container').height()/3);
}

function renderRobochurchCSS() {
    console.log('SCREEN: ' + 'w: ' + $windowWidth + 'h:' + $windowHeight);
    $serverLeft.removeClass('hidden-xs');
    $serverRight.removeClass('hidden-xs');
    $windowWidth = $(window).width();
    $windowHeight = $(window).height();

    $mainframeContainer.height($windowHeight);
    $content.height($windowHeight - _Margin);
    $servers.height($windowHeight);
    $serverSectionTop.height($windowHeight * .25);
    $serverSectionMiddle.height($windowHeight * .50);
    $serverSectionBottom.height($windowHeight * .25);
    topVentHTML();
    middleVentHTML();
    $serverSectionBottom.html('<p>serverSectionBottom</p>');
}

function renderRobochurchCSSMobile() {
    console.log('MOBILE: ' + 'w: ' + $windowWidth + 'h:' + $windowHeight);
    //$('.mainframe-container').addClass('hidden-xs');
    $serverLeft.addClass('hidden-xs');
    $serverRight.addClass('hidden-xs');

}



// the loop
if(responsiveVoice.isPlaying()) {
    console.log("I hope you are listening");
    // calls responsivevoice
}
