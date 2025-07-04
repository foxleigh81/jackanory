export const filterTable = (
  data: Array<Array<string | number | boolean>>,
  filterTerm: string,
  filterColumn: number
) => {
  return data.filter((row) => {
    const rowValue = row[filterColumn].toString();
    return rowValue.toLowerCase().includes(filterTerm.toLowerCase());
  });
};
