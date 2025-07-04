export const transformData = (data: unknown[]) => {
  const rows = data.map((row) => {
    // Give each row a unique ID
    const rowId = Math.random().toString(36).substring(7);
    const rowValues = Object.values(row);
    return [`id-${rowId}`, ...rowValues];
  });
  const columns = ['row-id', ...Object.keys(data[0])];
  return { rows, columns };
};
