import React from "react";
import { useForm } from "react-hook-form";
import { Button, VARIANT } from "../Button/Button";
import { ErrorMessage } from "@hookform/error-message";
import { Product } from "../../models/product";

export interface ProductsFormProps {
  onCreate: (product: Product) => void;
  product: Product | null;
}

export const ProductsForm: (props: ProductsFormProps) => JSX.Element = ({
  onCreate,
  product,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: { ...product },
  });
  watch();

  const onSubmit = ({ name }) => {
    const productToCreate = {
      id: product?.id ?? -1,
      name,
    };
    onCreate(productToCreate);
  };

  return (
    <div className="flex w-96 flex-col">
      <form>
        <div className="flex flex-col w-full pb-6 px-10">
          <label className="text-blue mb-1" htmlFor="name">
            Nombre del producto
          </label>
          <input
            className="h-10"
            id="name"
            placeholder="Nombre"
            {...register("name", {
              required: { value: true, message: "El campo es Requerido" },
              maxLength: {
                value: 50,
                message: "El campo necesita minimo 30 caracteres",
              },
            })}
          />
          <span className="text-xs text-red">
            <ErrorMessage errors={errors} name="name" />
          </span>
        </div>
        <div className="flex h-12 w-full px-6 self-center">
          <Button
            onClick={handleSubmit(onSubmit)}
            label={"Agregar"}
            variant={VARIANT.primary}
            disabled={!isValid}
          />
        </div>
      </form>
    </div>
  );
};
