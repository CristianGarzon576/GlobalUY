import React, { useState } from "react";

import { Button, VARIANT } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { RequestTable } from "../RequestTable/RequestTable";

import { useAppDispatch } from "../../hooks/hooks";

import { RequestMiddelware } from "../../services/requests";

import { Request, STATUS } from "../../models/requests";
import { User } from "../../models/user";
import { Product } from "../../models/product";
import { RequestForm } from "../RequestForm/RequestForm";
import { ApproveForm } from "../RequestForm/ApproveForm";

export interface RequestsContentProps {
  data: [];
  users: Array<User>;
  products: Array<Product>;
  title: string;
}

export const RequestsContent: (props: RequestsContentProps) => JSX.Element = ({
  data,
  users,
  products,
  title,
}) => {
  const [showCreateModal, setCreateShowModal] = useState(false);
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [requestToModify, setRequestToModify] = useState<Request | null>(null);
  const [userToModify, setUserToModify] = useState<User | null>(null);
  const [productToModify, setProductToModify] = useState<Product | null>(null);
  const [statusForRequest, setStatusForRequest] = useState<STATUS>(
    STATUS.waiting
  );
  const dispatch = useAppDispatch();
  const { addRequest, editRequest } = RequestMiddelware(dispatch);

  const onCloseModal = () => {
    setCreateShowModal(false);
    setShowChangeStatusModal(false);
    setUserToModify(null);
    setProductToModify(null);
    setRequestToModify(null);
    setStatusForRequest(STATUS.waiting);
  };

  const onCreateOpenModal = () => {
    setStatusForRequest(STATUS.waiting);
    setCreateShowModal(true);
  };

  const onApprovalOpenModal = (request: Request) => {
    setStatusForRequest(STATUS.approved);
    setRequestToModify(request);
    setShowChangeStatusModal(true);
  };

  const onRejectOpenModal = (request: Request) => {
    setStatusForRequest(STATUS.rejected);
    setRequestToModify(request);
    setShowChangeStatusModal(true);
  };

  //finish
  const handledCreateRequest = (request: Request) => {
    if (request.id === -1) {
      addRequest(request);
    } else {
      editRequest(request);
    }
    onCloseModal();
  };

  // Finish
  const handledEditItem = (request: Request) => {
    const product = products.find((p) => p.name == request.product);
    const user = users.find((u) => u.email == request.userEmail);
    if (product && user) {
      setRequestToModify(request);
      setProductToModify(product);
      setUserToModify(user);
      setCreateShowModal(true);
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
              onClick={onCreateOpenModal}
            />
          </div>
        </div>
        <div>
          {data && data.length > 0 && (
            <RequestTable
              onRejectItem={onRejectOpenModal}
              onEditItem={handledEditItem}
              onApproveItem={onApprovalOpenModal}
              data={data}
            />
          )}
        </div>
        <div className="flex flex-row justify-between items-center"></div>
      </div>

      {showCreateModal && (
        <Modal showModal={showCreateModal} onClose={onCloseModal}>
          <RequestForm
            product={productToModify}
            user={userToModify}
            onConfirm={handledCreateRequest}
            onCancel={onCloseModal}
            request={requestToModify}
            users={users}
            products={products}
          />
        </Modal>
      )}
      {showChangeStatusModal && (
        <Modal showModal={showChangeStatusModal} onClose={onCloseModal}>
          <ApproveForm
            status={statusForRequest}
            onConfirm={handledCreateRequest}
            onCancel={onCloseModal}
            request={requestToModify}
          />
        </Modal>
      )}
    </>
  );
};
