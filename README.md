# Goodrick
Draw guitar chords in Javascript. (Based on https://codepen.io/Bijingus/pen/pbyEBq)
Dedicated to Jazz guitar great [Mick Goodrick](https://en.wikipedia.org/wiki/Mick_Goodrick)

## Example:

```html
<html>
<head>
    <script src="goodrick.js"/>
    <script>
      var chord = [-1, 3, 5, 4, 5, -1];

      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');

      ctx.font = "18px Arial";
      ctx.beginPath();
      drawChord(ctx, chord);
      ctx.stroke();
    </script>
</head>
<body>
    <canvas id="canvas" width="200" height="200"></canvas>
</body>
</html>
```
