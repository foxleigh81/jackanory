import React, { useState, useEffect, useMemo } from 'react';

import { Table } from '../../data-display/table';
import { InputFactory } from '../input-factory';

import { changeCase } from '@/libs/helpers/change-case';

import { sortTable } from './helpers/sort-table';
import { filterTable } from './helpers/filter-table';
import { transformData } from './helpers/transform-data';

import styles from './styles.module.scss';

import type { SortOption } from './types/sort-option';

/*  Types */
export interface Props extends React.ComponentProps<'table'> {
  /**
   * If JSON data is provided, the table structure will be automatically generated
   */
  data: unknown[];
  /**
   * Should the table be striped
   * @default true
   */
  striped?: boolean;
  /**
   * Should the table have a solid background colour on the header
   * @default true
   */
  solidHeader?: boolean;
  /**
   * Hide header. There may be times when you want to hide the header.
   * @default false
   */
  hideHeader?: boolean;
  /**
   * Should the table headers be title case?
   * @default true
   */
  titleCaseHeaders?: boolean;
  /**
   * Make the table sortable. If you set the value to ['*'] all columns will be sortable and the default sort direction will be ascending.
   * If an array of objects is provided, each object should have a 'column' and 'direction' property.
   * You can also specify which column should be sorted by default by setting the 'initial' property to true.
   * If undefined, the table will not be sortable.
   * */
  sorting?: Array<SortOption | '*'>;
  /**
   * Make the table filterable. If you set the value to ['*'], all columns will be filterable.
   * If an array of numbers is provided, each number should correspond to the column number that should be filterable.
   * If undefined, the table will not be filterable.
   */
  filtering?: Array<number | '*'>;
}

/**
 * The 'TableFactory' component automatically generates a table from JSON data.
 */
export const TableFactory: React.FC<Props> = ({
  data,
  striped = true,
  titleCaseHeaders = true,
  solidHeader = true,
  hideHeader = false,
  sorting,
  filtering,
  className,
  ...props
}: Props) => {
  const { rows, columns } = useMemo(() => transformData(data), [data]);
  const [sortColumns, setSortColumns] = useState<SortOption[] | undefined>();
  const [currentSort, setCurrentSort] = useState<SortOption>();
  const [rowList, setRowList] = useState(rows);

  // Get initial column names and rows (with row ids) from data
  const headerTitles = columns;

  // Update rowList when rows change (new data)
  useEffect(() => {
    setRowList(rows);
  }, [rows]);

  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement>,
    header: string
  ) => {
    const filterColumn = headerTitles.findIndex((title) => title === header);
    const tableRows = filterTable(rows, e.target.value, filterColumn);
    setRowList(tableRows);
  };

  const handleSort = (column: number) => {
    const sortOption = sortColumns?.find((option) => option.column === column);
    if (sortOption) {
      const direction = currentSort?.direction ?? sortOption.direction;
      const newDirection = direction === 'asc' ? 'desc' : 'asc';
      const sortedRows = sortTable(rowList, column, newDirection);
      setRowList(sortedRows);
      setCurrentSort({ ...sortOption, direction: newDirection });
    }
  };

  useEffect(() => {
    let options = [];
    if (sorting) {
      if (sorting[0] !== '*') {
        options = sorting as SortOption[];
      } else {
        options = [
          {
            column: 1,
            direction: 'asc',
            initial: true
          },
          ...headerTitles.map((_header, index) => ({
            column: index + 2,
            direction: 'asc',
            initial: false
          }))
        ] as SortOption[];
      }

      const initialColumn =
        options.find((option) => option.initial) ?? options[0];
      setSortColumns(options as SortOption[]);
      setRowList(
        sortTable(rows, initialColumn.column, initialColumn.direction)
      );
      setCurrentSort(initialColumn as SortOption);
    }
  }, [data, sorting, rows, headerTitles]);

  return (
    <Table className={className} striped={striped} {...props}>
      {!hideHeader && (
        <Table.Head
          solid={solidHeader}
          className={styles[`header-${solidHeader ? 'solid' : 'default'}`]}
        >
          <Table.Row>
            {headerTitles.map((header: string) => {
              const isSortable = sortColumns?.find(
                (option) => option.column === headerTitles.indexOf(header)
              );
              const isActive =
                currentSort?.column === headerTitles.indexOf(header);
              const sortDirection = currentSort?.direction ?? 'asc';
              if (header !== 'row-id') {
                return (
                  <Table.Cell
                    key={changeCase(header, 'kebab')}
                    th
                    className={isSortable && styles['sortable-th']}
                  >
                    <>
                      {titleCaseHeaders
                        ? changeCase(header, 'sentence')
                        : header}
                      {isSortable && (
                        <span
                          role="button"
                          aria-label={`Sort by ${header} (${sortDirection})`}
                          className={[
                            styles['sort-arrow'],
                            styles[`dir-${sortDirection}`],
                            isActive ? styles['active'] : ''
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          onClick={() => {
                            handleSort(headerTitles.indexOf(header));
                          }}
                        />
                      )}
                    </>
                  </Table.Cell>
                );
              }
              return null;
            })}
          </Table.Row>
        </Table.Head>
      )}
      <Table.Body>
        {filtering && filtering?.length > 0 && (
          <Table.Row>
            {headerTitles.map((header: string) => {
              if (header !== 'row-id') {
                return filtering[0] === '*' ||
                  filtering[0] === 0 ||
                  filtering.includes(headerTitles.indexOf(header)) ? (
                  <Table.Cell key={changeCase(header, 'kebab')}>
                    <InputFactory
                      label={`Filter by ${header}`}
                      hideLabel
                      name={`filter-${header}`}
                      type="text"
                      minWidth="0"
                      placeholder="Type to filter..."
                      className={styles['filter-input']}
                      onChange={(e) => handleFilter(e, header)}
                    />
                  </Table.Cell>
                ) : (
                  <Table.Cell key={changeCase(header, 'kebab')} />
                );
              } else {
                return null;
              }
            })}
          </Table.Row>
        )}
        {rowList.map((row) => {
          return (
            <Table.Row key={`row-${row[0]}`} data-testid={`row`}>
              {row.map((cell: unknown, index: number) => {
                if (index !== 0) {
                  return (
                    <Table.Cell
                      key={`cell-${row[0]}-${changeCase(
                        headerTitles[index],
                        'kebab'
                      )}`}
                      className={hideHeader ? styles['hide-header'] : undefined}
                      data-testid={`cell-${changeCase(
                        headerTitles[index],
                        'kebab'
                      )}`}
                    >
                      {
                        // If the cell is a DOM element, cast it to a ReactNode
                        // and render it. Otherwise, render the cell as a string
                        // wrapped in a <p> tag
                        React.isValidElement(cell) ? (
                          cell
                        ) : (
                          <p>{cell?.toString()}</p>
                        )
                      }
                    </Table.Cell>
                  );
                }
                return null;
              })}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default TableFactory;
