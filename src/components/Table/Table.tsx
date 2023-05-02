import React, { useEffect } from "react";
import { useTable, useRowSelect } from "react-table";
import { IndeterminateCheckbox } from "./utils";

export interface TableProps {
  columns: any[];
  data: any[];
  isSelectedTable?: boolean;
  setSelectedRows?: (props: any) => void;
}

export interface Column {
  id: string;
  Header: (props: any) => JSX.Element;
  Cell: (props: any) => JSX.Element;
}

export const Table: (props: TableProps) => JSX.Element = ({
  columns,
  data,
  isSelectedTable = false,
  setSelectedRows,
}) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    (hooks: any) => {
      if (isSelectedTable) {
        return hooks.visibleColumns.push((columns: Column[]) => [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div className="flex justify-center items-center">
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    }
  );

  useEffect(() => {
    if (isSelectedTable && setSelectedRows) {
      const totalRows = Object.keys(state.selectedRowIds).length;
      setSelectedRows({ totalRows: totalRows, rows: state.selectedRowIds });
    }
  }, [state]);

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr
            key={index}
            className="h-12 border-b-2 border-b-dark-gray"
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column) => (
              <th
                key={column.id}
                className="font-bold text-xl"
                {...column.getHeaderProps()}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              key={i}
              className="h-12 border-b-2 border-b-soft-gray"
              {...row.getRowProps()}
            >
              {row.cells.map((cell, index) => {
                return (
                  <td
                    key={index}
                    className="font-normal text-base"
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
