export const sortTable = (
  data: Array<Array<string | number | boolean>>,
  sortColumn: number,
  sortDirection: string
) => {
  // Sort the rows
  return data.sort((a, b) => {
    const rowA = a[sortColumn];
    const rowB = b[sortColumn];
    if (rowA < rowB) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (rowA > rowB) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });
};
