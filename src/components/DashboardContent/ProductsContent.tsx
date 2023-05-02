import React, { useState } from "react";
import { Button, VARIANT } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { useAppDispatch } from "../../hooks/hooks";
import { productMiddelware } from "../../services/products";
import { Product } from "../../models/product";
import { ProductsTable } from "../ProductTable/ProductTable";
import { ProductsForm } from "../ProductsForm/ProductsForm";

export interface ProductsContentProps {
  data: [];
  title: string;
}

export const ProductsContent: (props: ProductsContentProps) => JSX.Element = ({
  data,
  title,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [productForm, setProductForm] = useState<Product | null>(null);
  const dispatch = useAppDispatch();
  const { removeProduct, addProduct, editProduct } =
    productMiddelware(dispatch);

  const onCloseModal = () => {
    setProductForm(null);
    setShowModal(false);
  };

  const onOpenModal = () => {
    setShowModal(true);
  };

  const handledCreateProduct = (product: Product) => {
    if (product.id === -1) {
      addProduct(product);
    } else {
      editProduct(product);
    }
    setShowModal(false);
  };

  const handledEditItem = (product: Product) => {
    setProductForm(product);
    setShowModal(true);
  };

  const handledDeleteItem = (index: number) => {
    removeProduct(index);
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
        <div>
          {data && data.length > 0 && (
            <ProductsTable
              onDeleteItem={handledDeleteItem}
              onEditItem={handledEditItem}
              data={data}
            />
          )}
        </div>
        <div className="flex flex-row justify-between items-center"></div>
      </div>

      {showModal && (
        <Modal showModal={showModal} onClose={onCloseModal}>
          <ProductsForm product={productForm} onCreate={handledCreateProduct} />
        </Modal>
      )}
    </>
  );
};
