const Jimp = require('jimp');

Jimp.read('public/logo.png').then(image => {
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // Estimate alpha from the maximum color component (un-premultiplying alpha against black)
    const maxVal = Math.max(r, g, b);
    const alpha = maxVal / 255;
    
    // If it's completely black, alpha is 0
    if (alpha === 0) {
      this.bitmap.data[idx + 3] = 0; // Set alpha to 0
    } else {
      // Restore original pixel color value
      this.bitmap.data[idx] = Math.min(255, Math.round(r / alpha));
      this.bitmap.data[idx + 1] = Math.min(255, Math.round(g / alpha));
      this.bitmap.data[idx + 2] = Math.min(255, Math.round(b / alpha));
      this.bitmap.data[idx + 3] = Math.min(255, Math.round(maxVal)); // Set alpha
    }
  });

  image.write('public/logo.png', () => {
    console.log("Logo background removed successfully!");
  });
}).catch(err => {
  console.error("Error processing image:", err);
});
