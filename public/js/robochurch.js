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

/*  so window resize is only called once per resize
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
*/

function isDeviceMobile() {
    if($windowWidth < 768) {
        return true
    } else {
        return false
    }

}

$(window).resize(function() {
    //resetWindow();
    if(isDeviceMobile()) {
        renderRobochurchCSSMobile();
    } else {
        renderRobochurchCSS();
    }
});

$(document).ready(function() {
    //resetWindow();
    if(isDeviceMobile()) {
        renderRobochurchCSSMobile();
    } else {
        renderRobochurchCSS();
    }

});

// should this take arguments for size and # vents and selector to output HTML?
function topVentHTML(){
    var numVentHoles = 3;
    var numVentRows = $serverSectionTop.height() / 22;
    var ventHoleWidth = (Math.floor($serverSectionTop.width()) - (5 * numVentHoles))/numVentHoles;
    var outputHTML = '';
    for(var i=0; i < numVentRows; i++) {
        var currentRowClass = 'server-vent-top-row';
        var currentRowID = currentRowClass + '-' + i;
        //console.log('currentRowClass: ' + currentRowClass);
        //console.log('currentRowID: ' + currentRowID);
        outputHTML += '<div id="'+ currentRowID +'" class=" row no-gutter '+ currentRowID +'">';
        for(var j=0; j < numVentHoles; j++) {
            outputHTML += '<div class="vent-hole" id="vent-hole-' + i + '-'+ j + '"></div>';
        }
        outputHTML += '</div>';
    }
    $serverVentTop.html(outputHTML);
    $('.vent-hole').width(ventHoleWidth);
    //$('.vent-hole').height($serverSectionTop.height() / (numVentRows + 1.2));
}

function middleVentHTML(){
    var numVentHoles = 4;
    var numVentRows = 6;
    var outputHTML = '';
    var ventHoleHTML = '<div class="vent-hole"></div>';

    for(var i=0; i < numVentRows; i++) {
        var currentRowClass = 'server-vent-side-row row';
        var currentRowID = currentRowClass + '-' + i;
        outputHTML += '<div id="'+ currentRowID +'" class=" row no-gutter '+ currentRowID +'">';
        for(var j=0; j < numVentHoles; j++) {
            outputHTML += ventHoleHTML;
        }
        outputHTML += '</div>';
    }
    $serverVentMiddle.append(outputHTML);
    //$('.vent-hole').width($serverWidth/4);
}

function renderRobochurchCSS() {
    $windowWidth = $(window).width();
    $windowHeight = $(window).height();

    console.log('SCREEN: ' + 'w: ' + $windowWidth + 'h:' + $windowHeight);
    console.log('SCREEN: ' + 'w: ' + $windowWidth + 'h:' + $windowHeight);
    $mainframeContainer.height($windowHeight);
    $content.height($windowHeight - _Margin);
    $servers.height($windowHeight);
    $serverSectionTop.height($windowHeight * .25);
    $serverSectionMiddle.height($windowHeight * .50);
    $serverSectionBottom.height($windowHeight * .25);
    topVentHTML();
    middleVentHTML();
    $serverSectionBottom.html('<p>hello</p>');
}

function renderRobochurchCSSMobile() {
    console.log('MOBILE: ' + 'w: ' + $windowWidth + 'h:' + $windowHeight);
    $serverSectionMiddle.addClass('hidden-sm');
}



// the loop
if(responsiveVoice.isPlaying()) {
    console.log("I hope you are listening");
    // calls responsivevoice
}
