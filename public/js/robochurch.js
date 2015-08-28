$(function(){
    $("#mainframe-content").typed({
        strings: ["If you were disconnected right now would you be a zero or a one"],
        typeSpeed: 0,
        showCursor: false
    });
});

var _Margin = 20;

// jquery variables
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
var $contentSectionBottom = $('#mainframe-content-bottom-container')
var $serverVentTop = $('.server-vent-top');
var $serverVentMiddle = $('.server-vent-middle');
var $serverVentBottom = $('.server-vent-bottom');
var $SeverVentSide = $('.server-vent-side');
var $ServerMonitor = $('.server-monitor');
var $spinningImage = $('.spinning-img');

// animation settings
var _SideLightsStatus = 'inactive';
var _ActiveSideLight = 0;
var _SideLightDelta = 500;


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
        responsiveVoice.speak("Hello World");
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
            outputHTML += '<div class="vent-hole col-sm-4 pixelated" id="vent-hole-' + i + '-'+ j + '"></div>';
        }
        outputHTML += '</div>';
    }
    $serverVentTop.html(outputHTML);
    //$('.vent-hole').width(ventHoleWidth);
    //$('.vent-hole').height($serverSectionTop.height() / (numVentRows + 1.2));
}

// TODO: draw graphics overlay for buttons
// TODO: add graphics overlay to buttons in css
// TODO: animate monitors using css background on timer

function middleVentHTML(){
    var numButtons = Math.floor(($SeverVentSide.height() - 10) / ($SeverVentSide.width() + 20));
    console.log(numButtons);
    var outputHTML = '';
    for(var i=0; i < numButtons; i++) {
        var sideLightClass = 'side-light side-light-' + i;
        outputHTML += '<div id="side-light-' + i + '" class="'+ sideLightClass +'"></div>';
    }
    $SeverVentSide.html(outputHTML);
    //todo: problem with height spacing. should instead go:
    // 1. width = 100%
    // 2. height = width
    // 3. margin top / bottom = ($('.server-monitor-container').height() - (height * 3) / 2)
    $ServerMonitor.height($('.server-monitor-container').height()/3);
    $ServerMonitor.width("");
    if ($ServerMonitor.height() > $ServerMonitor.width()) {
        $ServerMonitor.height($ServerMonitor.width());
    } else {
        $ServerMonitor.width($ServerMonitor.height());
    }
    //$ServerMonitor.height("");
    var monitorMargin = (($('.server-monitor-container').height() - ($('.server-monitor').height() * 3)) / 2) + 'px';
    $ServerMonitor.css('margin-top', monitorMargin);

    $('.side-light').height($('.side-light').width());
//$ServerMonitor.width()
}

// TODO: render bottom vent html
function bottomVentHTML(){
    if($serverSectionBottom.height > $serverSectionBottom.width) {
        $spinningImage.height($spinningImage.width());
    } else {
        $spinningImage.width($spinningImage.height());
    }
    console.log($spinningImage.width);
    var spinningImageMargin = ($spinningImage.width()/2 * -1) + 'px';
    console.log(spinningImageMargin);
    var spinningImageMarginCSS = spinningImageMargin + ' 0 0 ' + spinningImageMargin;
    console.log(spinningImageMarginCSS);
    $spinningImage.css({"margin": spinningImageMarginCSS, "top": $spinningImage.width()/2 + 'px'});
}

function renderRobochurchCSS() {
    console.log('SCREEN: ' + 'w: ' + $windowWidth + 'h:' + $windowHeight);
    $serverLeft.removeClass('hidden-xs');
    $serverRight.removeClass('hidden-xs');
    $windowWidth = $(window).width();
    $windowHeight = $(window).height();

    $mainframeContainer.height($windowHeight);
    $content.height(($windowHeight *.75) - _Margin);
    $servers.height($windowHeight);
    $serverSectionTop.height($windowHeight * .25);
    $serverSectionMiddle.height($windowHeight * .50);
    $serverSectionBottom.height($windowHeight * .25);
    $contentSectionBottom.height($windowHeight *.25);
    topVentHTML();
    middleVentHTML();
    bottomVentHTML();
    _SideLightsStatus = 'active';
    activateSideLights();
}

function renderRobochurchCSSMobile() {
    console.log('MOBILE: ' + 'w: ' + $windowWidth + 'h:' + $windowHeight);
    //$('.mainframe-container').addClass('hidden-xs');
    $serverLeft.addClass('hidden-xs');
    $serverRight.addClass('hidden-xs');

}

function activateSideLights(){
    setTimeout(sideLightCycle, _SideLightDelta);
}

// have the lights transition from top to bottom and repeat
function sideLightCycle() {
    var numSideLights = $('.side-light').length/4 - 1;
    if (_SideLightsStatus == 'inactive') {
        // reset lights
        $('.side-light').removeClass('active');
        _ActiveSideLight = 0;
//console.log('light status: ' + _SideLightsStatus)
    } else {
//console.log('light status: ' + _SideLightsStatus);
        var newActiveSideLight = _ActiveSideLight + 1;
        // shortcut because will always restart at 0
        if (_ActiveSideLight >= numSideLights) {
            newActiveSideLight = 0;
        }
//console.log(newActiveSideLight);
        // cycle active light
        //$('.side-light-'+_ActiveSideLight).removeClass('active');
        $('.side-light-'+ newActiveSideLight).addClass('active');
        _ActiveSideLight = newActiveSideLight;
        setTimeout(sideLightCycle, _SideLightDelta);
    }
}



// the loop
if(responsiveVoice.isPlaying()) {
    console.log("I hope you are listening");
    // calls responsivevoice
}
