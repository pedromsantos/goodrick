var fretHeight = 20;
var fretWidth = 20;
var strings = 6;
var textOffsetY = -3;
var nutLineWidth = 4;
var lineWidth = 1;
var lineColor = "gray";
var fingerColor = "black";
var mutedString = -1;
var openString = 0;
var fingerSymbol = String.fromCharCode(parseInt("2B24", 16));

function drawFrets(ctx, minFret, maxFret) {
    var offsetY = 0;
    ctx.strokeStyle = lineColor;

    for (var fret = minFret; fret <= maxFret + 1; fret++) {
        ctx.lineWidth = lineWidth;

        if (fret === openString) {
            ctx.lineWidth = nutLineWidth;
        }

        ctx.moveTo(fretWidth, offsetY + fretHeight);
        ctx.lineTo(fretWidth * strings, offsetY + fretHeight);
        offsetY = offsetY + fretWidth;
    }
}

function drawFinger(ctx, fret, x, y) {
    var fingerText;

    if (fret === mutedString) {
        fingerText = "x";
    }
    else if (fret === openString) {
        fingerText = "0";
    }
    else {
        x -= 2; // small adjustment, looks better :)
        fingerText = fingerSymbol;
    }

    ctx.fillStyle = fingerColor;
    ctx.fillText(fingerText, x, y);
}

function drawStrings(ctx, chord, minFret, maxFret) {
    var offsetX = 0;

    for (var guitarString = 0; guitarString < chord.length; guitarString++) {
        var y = ((fretHeight * chord[guitarString]) + fretHeight + textOffsetY) - (minFret * fretHeight);

        if (chord[guitarString] === mutedString) {
            y = fretHeight + textOffsetY;
        }

        var stringHeight = (maxFret - minFret + 1) * fretHeight;

        ctx.fillStyle = lineColor;
        ctx.moveTo(offsetX + fretWidth, fretHeight);
        ctx.lineTo(offsetX + fretWidth, stringHeight + fretHeight);

        var x = fretWidth + offsetX - (fretWidth / 4);
        drawFinger(ctx, chord[guitarString], x, y);

        offsetX = offsetX + fretWidth;
    }
}

function drawChord(ctx, chord) {
    var maxFret = Math.max.apply(Math, chord);
    var minFret = Math.max(0, Math.min.apply(Math, chord));

    drawFrets(ctx, minFret, maxFret);
    drawStrings(ctx, chord, minFret, maxFret);
}