import React, { useMemo } from "react";
import { Table } from "../Table/Table";
import { ActionRequestCell } from "../Table/utils";
import { STATUS } from "../../models/requests";

export interface RequestTableProps {
  data: any[];
  onRejectItem: (props: any) => void;
  onEditItem: (props: any) => void;
  onApproveItem: (props: any) => void;
}

export const RequestTable: (props: RequestTableProps) => JSX.Element = ({
  data,
  onRejectItem,
  onApproveItem,
  onEditItem,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "Nombre del Producto",
        accessor: "product",
      },
      {
        Header: "Cantidad",
        accessor: "quantity",
        Cell: ({ row }) => (
          <div className="flex justify-center items-center">
            {row.original.quantity}
          </div>
        ),
      },
      {
        Header: "Email",
        accessor: "userEmail",
      },
      {
        Header: "Direccion del cliente",
        accessor: "clientDirection",
      },
      {
        Header: "Fecha",
        accessor: "date",
        Cell: ({ row }) => {
          const date = new Date(row.original.date);
          const formatDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
          return (
            <div className="flex justify-center items-center">{formatDate}</div>
          );
        },
      },
      {
        Header: "Estado",
        accessor: "status",
        Cell: ({ row }) => {
          const isWaiting =
            row.original.status === STATUS.waiting ||
            row.original.status === undefined;
          return (
            <div className="flex justify-center items-center">
              {isWaiting ? STATUS.waiting : row.original.status}
            </div>
          );
        },
      },
      {
        Header: "Accion",
        accessor: "action",
        Cell: ({ row }) => (
          <ActionRequestCell
            {...row}
            onRejectItem={onRejectItem}
            onApproveItem={onApproveItem}
            onEditItem={onEditItem}
          />
        ),
      },
    ],
    []
  );

  return <Table columns={columns} data={data} />;
};
