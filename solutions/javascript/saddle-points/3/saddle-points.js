export const saddlePoints = (matrix) => {
  // 1️⃣ flatten the matrix with indices
  const flatMatrix = matrix.flatMap((row, rowIndex) =>
    row.map((value, colIndex) => ({ value, rowIndex, colIndex }))
  );

  // 2️⃣ compute rowMaxes and columnMins in a single pass
  const [rowMaxes, columnMins] = flatMatrix.reduce(
    ([rowMaxesAcc, colMinsAcc], { value, rowIndex, colIndex }) => {
      rowMaxesAcc[rowIndex] = Math.max(value, rowMaxesAcc[rowIndex] ?? -Infinity);
      colMinsAcc[colIndex] = Math.min(value, colMinsAcc[colIndex] ?? Infinity);
      return [rowMaxesAcc, colMinsAcc];
    },
    [[], []]
  );

  // 3️⃣ find saddle points
  return flatMatrix.reduce((saddlePoints, { value, rowIndex, colIndex }) => {
    if (value === rowMaxes[rowIndex] && value === columnMins[colIndex]) {
      saddlePoints.push({ row: rowIndex + 1, column: colIndex + 1 });
    }
    return saddlePoints;
  }, []);
};