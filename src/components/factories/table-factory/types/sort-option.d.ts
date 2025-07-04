export type SortOption = {
  /**
   * Which column number is this option for? (Column numbers start at 1)
   */
  column: number;
  /**
   * What is the default sort direction for this column?
   * @default 'asc'
   */
  direction: 'asc' | 'desc';
  /**
   * Should this column be what the table is initially sorted by?
   * @default false
   */
  initial?: boolean;
};

export default SortOption;
