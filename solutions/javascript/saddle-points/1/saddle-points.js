//
// This is only a SKELETON file for the 'Saddle Points' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const saddlePoints = (matrix) => {
  const rowMaxes = matrix.map((row) => Math.max(...row)); // n
  const columnMins = Array.from(
    { length: matrix[0].length },
    (_, colIndex) => Math.min(...matrix.map((row) => row[colIndex])), // m * n
  );

  const points = [];
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    for (let colIndex = 0; colIndex < matrix[rowIndex].length; colIndex++) {
      const value = matrix[rowIndex][colIndex];
      if (value === rowMaxes[rowIndex] && value === columnMins[colIndex]) {
        points.push({ row: rowIndex + 1, column: colIndex + 1 });
      }
    }
  } // m * n

  // Overall complexity: O(m * n)

  // m = number of rows
  // n = number of columns
  return points;
};
       
  