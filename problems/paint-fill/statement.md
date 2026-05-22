Implement the "paint fill" function that one might see on many image editing programs. That is, given a screen (represented by a two-dimensional array of colors), a point, and a new color, fill in the surrounding area until the color changes from the original color.

## Example 1:

**Input:** image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, newColor = 2  
**Output:** [[2,2,2],[2,2,0],[2,0,1]]  
**Explanation:** From the center of the image with position (sr, sc) = (1, 1) (i.e., the red pixel), all pixels connected by a path of the same color as the starting pixel (i.e., the red pixels) are colored with the new color.

## Example 2:

**Input:** image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, newColor = 2  
**Output:** [[2,2,2],[2,2,2]]

## Constraints:

- `1 <= image.length, image[i].length <= 50`
- `0 <= image[i][j], newColor < 2^16`
- `0 <= sr < image.length`
- `0 <= sc < image[i].length`