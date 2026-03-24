export const saddlePoints = (matrix) => {
  const flatMatrix = matrix.flatMap((row, rowIndex) =>
    row.map((value, colIndex) => [value, colIndex, rowIndex])
  );

  const [rowMaxes, columnMins] = flatMatrix.reduce(
    ([rowMaxesAcc, colMinsAcc], [value, colIndex, rowIndex]) => {
      rowMaxesAcc[rowIndex] = Math.max(value, rowMaxesAcc[rowIndex] ?? -Infinity);
      colMinsAcc[colIndex] = Math.min(value, colMinsAcc[colIndex] ?? Infinity);
      return [rowMaxesAcc, colMinsAcc];
    },
    [[], []]
  );

  return flatMatrix.reduce((saddlePoints, [value, colIndex, rowIndex]) => {
    if (value === rowMaxes[rowIndex] && value === columnMins[colIndex]) {
      saddlePoints.push({ row: rowIndex + 1, column: colIndex + 1 });
    }
    return saddlePoints;
  }, []);
};