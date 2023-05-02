import React, { useEffect, useState } from "react";
import { Button, VARIANT } from "../Button/Button";
import { IconButton } from "../Button/IconButton";
import { Search } from "../Search/Search";
import { Modal } from "../Modal/Modal";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { UsersTable } from "../UsersTable/UsersTable";
import { useAppDispatch } from "../../hooks/hooks";
import { userMiddelware } from "../../services/users";
import { User } from "../../models/user";

export const UsersContent: (props) => JSX.Element = ({ data, title }) => {
  const [showModal, setShowModal] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [selectedRows, setSelectedRows] = useState(null);
  const [userForm, setUserForm] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const { removeUser, addUser, removeUserBatch, editUser } =
    userMiddelware(dispatch);

  let filterTimeout: number | undefined = undefined;

  const handledFilterData: (query: string) => void = (query) => {
    clearTimeout(filterTimeout);
    if (!query) {
      setFilterData([...data]);
    } else {
      filterTimeout = setTimeout(() => {
        const newFilterData = data.filter(({ name }: { name: string }) => {
          if (name.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
            return true;
          }
          return false;
        });
        setFilterData(newFilterData);
      }, 1000);
    }
  };

  useEffect(() => {
    setFilterData([...data]);
  }, [data]);

  const onCloseModal = () => {
    setUserForm(null);
    setShowModal(false);
  };

  const onOpenModal = () => {
    setShowModal(true);
  };

  const handledCreateUser = (user: User) => {
    if (user.id === -1) {
      addUser(user);
    } else {
      editUser(user);
    }
    setShowModal(false);
  };

  const handledEditItem = (user: User) => {
    setUserForm(user);
    setShowModal(true);
  };

  const handledDeleteItem = (index: number) => {
    removeUser(index);
  };

  const handledDeleteBatchItems = (e) => {
    e.preventDefault();
    if (selectedRows && selectedRows?.rows) {
      const numbers: number[] = Object.keys(selectedRows.rows).map((el) =>
        parseFloat(el)
      );
      if (numbers.length > 0) {
        removeUserBatch(numbers);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col w-full overflow-scroll">
        <div className="flex flex-row justify-between items-center mb-7">
          <p className="text-3xl font-bold">{title}</p>
          <div className="h-12 w-44">
            <Button
              variant={VARIANT.primary}
              label="+ Crear nuevo"
              onClick={onOpenModal}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center mb-7">
          <div className="h-10">
            <Search placeholder="Buscar" handledOnSearch={handledFilterData} />
          </div>
          <div className="">
            <IconButton
              classes="text-dark-red underline disabled:text-soft-gray"
              icon="remove"
              size={"14px"}
              disabled={!!selectedRows && selectedRows.totalRows === 0}
              label={`${
                selectedRows && selectedRows.totalRows
                  ? `Borrar selección (${selectedRows.totalRows})`
                  : "Borrar selección"
              }`}
              iconcolorclass={`${
                selectedRows && selectedRows.totalRows === 0
                  ? "fill-[#D4D4D4]"
                  : "fill-[#9A3648]"
              }`}
              onClick={handledDeleteBatchItems}
            />
          </div>
        </div>
        <div>
          {data.length > 0 && (
            <UsersTable
              onDeleteItem={handledDeleteItem}
              onEditItem={handledEditItem}
              data={filterData || data}
              setSelectedRows={setSelectedRows}
            />
          )}
        </div>
        <div className="flex flex-row justify-between items-center"></div>
      </div>

      {showModal && (
        <Modal showModal={showModal} onClose={onCloseModal}>
          <RegisterForm user={userForm} onCreate={handledCreateUser} />
        </Modal>
      )}
    </>
  );
};
