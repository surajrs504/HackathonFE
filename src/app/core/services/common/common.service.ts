import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  getLetterColor(letter: string): string {
    // Define a list of light shades of blue, green, yellow, and pink
    const colors = [
      "#ADD8E6", // Light Blue
      "#90EE90", // Light Green
      "#FFFFE0", // Light Yellow
      "#FFB6C1", // Light Pink
      "#D3D3D3", // Light Gray
      "#FF6347", // Light Tomato Red
      "#F5DEB3", // Wheat (Light Brown)
      "#FFB347", // Light Orange
      "#E6E6FA", // Lavender
      "#FFD700", // Light Gold
      "#F0E68C", // Light Khaki
      "#FAD02E", // Light Gold
      "#D8BFD8", // Thistle (Light Purple)
      "#F0F8FF", // Alice Blue
      "#F5F5DC", // Beige (Light Tan)
      "#C0FF3E", // Light Chartreuse Green
      "#FF69B4", // Hot Pink (Light Vibrant Pink)
      "#F0FFFF", // Light Cyan
      "#F8C8DC", // Light Blush Pink
      "#FFE4E1", // Misty Rose (Light Pinkish)
      "#B0E0E6", // Powder Blue
      "#F0F0F0", // Very Light Gray
      "#FFFACD", // Lemon Chiffon (Light Yellow)
      "#FFF0F5", // Lavender Blush (Light Pinkish)
      "#F5F5F5", // Very Light Grayish White
      "#F8F8FF", // Ghost White
      "#E0FFFF", // Light Cyan
      "#B0C4DE", // Light Steel Blue
      "#F4A300", // Light Dark Orange
      "#F4A1D4", // Light Pink-Purple
      "#FFCCCB", // Light Coral
      "#FFF8DC", // Cornsilk (Light Yellow)
      "#F4D03F", // Light Sunflower Yellow
      "#FFDB58", // Light Goldenrod
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
