import React, { useMemo } from "react";
import { Table } from "../Table/Table";
import { ActionCell } from "../Table/utils";

export interface UsersTableProps {
  data: any[];
  setSelectedRows: (props: any) => void;
  onDeleteItem: (props: number) => void;
  onEditItem: (props: any) => void;
}

const PhotoComponent = (props) => {
  const {
    original: { name, img },
  } = props;
  const firstLetter = name[0];
  if (!img) {
    return (
      <div className="flex margin-auto h-10 w-full justify-center items-center">
        <div className="h-full w-10 bg-blue rounded-full flex justify-center items-center">
          {firstLetter}
        </div>
      </div>
    );
  }
  return (
    <div className="flex margin-auto h-10 w-full justify-center items-center">
      <div className="h-full w-10 rounded-full flex justify-center items-center">
        <img src={img} alt="Imagen del usuario" />
      </div>
    </div>
  );
};

export const UsersTable: (props: UsersTableProps) => JSX.Element = ({
  data,
  setSelectedRows,
  onDeleteItem,
  onEditItem,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "Foto",
        accessor: "image",
        Cell: ({ row }) => <PhotoComponent {...row} />,
      },
      {
        Header: "Nombre Completo",
        accessor: "name",
      },
      {
        Header: "Correo",
        accessor: "email",
      },
      {
        Header: "Rol",
        accessor: "role",
      },
      {
        Header: "Cargo",
        accessor: "cargo",
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

  return (
    <Table
      columns={columns}
      data={data}
      isSelectedTable
      setSelectedRows={setSelectedRows}
    />
  );
};
