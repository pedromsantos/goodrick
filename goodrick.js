function drawChord(ctx, chord) {
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

    var maxFret = Math.max.apply(Math, chord);
    var minFret = Math.max(0, Math.min.apply(Math, chord));
  
    function drawFrets() {
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

    function drawStrings() {
        var offsetX = 0;

        function drawFinger(fret) {
            var fingerText;
            var x = fretWidth + offsetX - (fretWidth / 4);
            var y = ((fretHeight * fret) + fretHeight + textOffsetY) - (minFret * fretHeight);

            if (fret === mutedString) {
                fingerText = "x";
                y = fretHeight + textOffsetY;
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

        var offsetX = 0;
        var stringHeight = (maxFret - minFret + 1) * fretHeight;

        for (var guitarString = 0; guitarString < chord.length; guitarString++) {
            ctx.fillStyle = lineColor;
            ctx.moveTo(offsetX + fretWidth, fretHeight);
            ctx.lineTo(offsetX + fretWidth, stringHeight + fretHeight);

            drawFinger(chord[guitarString]);

            offsetX = offsetX + fretWidth;
        }
    }
  
    drawFrets();
    drawStrings();
}