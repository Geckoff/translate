const generateColors = stepSize => {
    let red = 255,
        green = 0,
        colors = {
            allColors: [],
            max: null
        };

    while (green < 255) {
        green += stepSize;
        if(green > 255) { green = 255; }
        colors.allColors.push(`rgba(${red},${green},0,0.15)`);
    }
    while (red > 0) {
        red -= stepSize;
        if(red < 0) { red = 0; }
        colors.allColors.push(`rgba(${red},${green},0,0.15)`);
    }
    colors.allColors = colors.allColors.reverse();
    colors.allColors.splice(0,3);
    colors.max = colors.allColors[colors.allColors.length - 1];
    
    return colors;
}

export default generateColors;