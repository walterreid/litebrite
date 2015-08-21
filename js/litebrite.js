var colorArray = [];

function drawGrid(target_div, num_buttons) {
    var circles = "";
    for (var i = 0; i < num_buttons; i++) {

        var colorIndex = 0;
        circles += '<div class="circle" colorIndex="' + colorIndex + '" id="circle_' + i + '" style="background:' + colorArray[colorIndex] + ';"></div>';
    }
    target_div.html(circles);

    //yes, circle exist 
    $('.circle').click(function (e) {
        var colorIndex = e.target.getAttribute('colorIndex');
        if (colorIndex > colorArray.length) {
            colorIndex = -1;
        }

        $('#' + this.id).stop()
            .css("background", colorArray[++colorIndex]);
        e.target.setAttribute('colorIndex', colorIndex);
    });

    var intervalId = 0;
    $('.circle').mousedown(function (e) {
        var circleid = this.id.replace('circle_', '');
        intervalId = setInterval(function () {
            pressAndHold(e, circleid);
        }, 100);
    }).bind('mouseup mouseleave', function () {
        clearInterval(intervalId);
    });
}

function pressAndHold(e, id) {
    var colorIndex = e.target.getAttribute('colorIndex');
    if (colorIndex > colorArray.length) {
        colorIndex = -1;
        clearInterval(intervalId);
    }

    $('#circle_' + id).stop()
        .css("background", colorArray[++colorIndex]);
    e.target.setAttribute('colorIndex', colorIndex);
}

$(document).ready(function () {
    makeColorGradient(0.3, 0.3, 0.3, 0, 2, 10, 128, 127, 19);
    drawGrid($(".content"), 56);
});

function makeColorGradient(frequency1, frequency2, frequency3, phase1, phase2, phase3, center, width, len) {
    if (center == undefined) center = 128;
    if (width == undefined) width = 127;
    if (len == undefined) len = 20;

    colorArray.push(RGB2Color(33, 33, 33));

    for (var i = 0; i < len; ++i) {
        var red = Math.sin(frequency1 * i + phase1) * width + center;
        var grn = Math.sin(frequency2 * i + phase2) * width + center;
        var blu = Math.sin(frequency3 * i + phase3) * width + center;
        colorArray.push(RGB2Color(red, grn, blu));
    }
}

function RGB2Color(r, g, b) {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
}