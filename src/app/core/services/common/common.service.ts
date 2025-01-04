import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  getLetterColor(letter: string): string {
    // Define a list of light shades of blue, green, yellow, and pink
    const colors = [
      "#6A9DB2", // Darker Light Blue
      "#6E9E6E", // Darker Light Green
      "#D1D19A", // Darker Light Yellow
      "#D08C9C", // Darker Light Pink
      "#A8A8A8", // Darker Light Gray
      "#E04F2C", // Darker Light Tomato Red
      "#D2B288", // Darker Wheat (Light Brown)
      "#E6A038", // Darker Light Orange
      "#C0C0D1", // Darker Lavender
      "#D29A00", // Darker Light Gold
      "#D2C15A", // Darker Light Khaki
      "#D1B52D", // Darker Light Gold
      "#C8A5C8", // Darker Thistle (Light Purple)
      "#B4D0DF", // Darker Alice Blue
      "#D0D0A5", // Darker Beige (Light Tan)
      "#A3CC2D", // Darker Light Chartreuse Green
      "#E05D90", // Darker Hot Pink (Light Vibrant Pink)
      "#B0D3D3", // Darker Light Cyan
      "#D0A7B1", // Darker Light Blush Pink
      "#D1B7B0", // Darker Misty Rose (Light Pinkish)
      "#8FA7B4", // Darker Powder Blue
      "#D0D0D0", // Darker Very Light Gray
      "#D1D18A", // Darker Lemon Chiffon (Light Yellow)
      "#D1A7D0", // Darker Lavender Blush (Light Pinkish)
      "#D1D1D1", // Darker Very Light Grayish White
      "#C8C8D1", // Darker Ghost White
      "#B2D1D1", // Darker Light Cyan
      "#A5B1C8", // Darker Light Steel Blue
      "#D88B00", // Darker Light Dark Orange
      "#D88BA7", // Darker Light Pink-Purple
      "#E0A3A0", // Darker Light Coral
      "#D1B69C", // Darker Cornsilk (Light Yellow)
      "#D7A100", // Darker Light Sunflower Yellow
      "#D1A645", // Darker Light Goldenrod
    ];
  
    // Convert letter to its corresponding index (0-based)
    const index = letter.toUpperCase().charCodeAt(0) - 65;
  
    if (index >= 0 && index < colors.length) {
      return colors[index];
    } else {
      return "#FFFFFF"; // Default to white if input is not a valid letter
    }
  }
}
