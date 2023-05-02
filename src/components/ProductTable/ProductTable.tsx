import React, { useMemo } from "react";
import { Table } from "../Table/Table";
import { ActionCell } from "../Table/utils";

export interface ProductsTableProps {
  data: any[];
  onDeleteItem: (props: number) => void;
  onEditItem: (props: any) => void;
}

export const ProductsTable: (props: ProductsTableProps) => JSX.Element = ({
  data,
  onDeleteItem,
  onEditItem,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Nombre del Producto",
        accessor: "name",
      },
      {
        Header: "Accion",
        accessor: "action",
        Cell: ({ row }) => (
          <ActionCell
            {...row}
            onDeleteItem={onDeleteItem}
            onEditItem={onEditItem}
          />
        ),
      },
    ],
    []
  );

  return <Table columns={columns} data={data} />;
};
