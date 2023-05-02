import React, { useForm } from "react-hook-form";
import { User } from "../../models/user";
import { Button, VARIANT } from "../Button/Button";
import { ErrorMessage } from "@hookform/error-message";
import { Product } from "../../models/product";
import { Request, STATUS } from "../../models/requests";

export interface RequestFormProps {
  onConfirm: (request: Request) => void;
  onCancel: () => void;
  users: Array<User>;
  products: Array<Product>;
  request: Request | null;
  product: Product | null;
  user: User | null;
}

export const RequestForm: (props: RequestFormProps) => JSX.Element | null = ({
  onConfirm,
  onCancel,
  users,
  products,
  product,
  user,
  request = null,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      ...request,
      user: user?.id ?? null,
      product: product?.id ?? null,
    },
  });
  watch();

  const onSubmit = ({ product, user, quantity, clientDirection }) => {
    const selectedProduct = products.find((p) => p.id == product);
    const selectedUser = users.find((u) => u.id == user);
    const requestToCreate = {
      id: request?.id ?? -1,
      product: selectedProduct?.name ?? "",
      userEmail: selectedUser?.email ?? "",
      quantity,
      date: new Date().toISOString(),
      clientDirection: clientDirection,
      status: STATUS.waiting,
    };
    onConfirm(requestToCreate);
  };
  if (users && users.length === 0 && products && products.length === 0) {
    return null;
  }
  return (
    <div className="flex w-96 flex-col">
      <form>
        <div className="flex flex-col w-full pb-6 px-10">
          <label className="text-blue mb-1" htmlFor="user">
            Usuario
          </label>
          <select
            id="user"
            className="h-10"
            {...register("user", { required: true })}
          >
            {users.map((u, index) => (
              <option key={index} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          <span className="text-xs text-red">
            <ErrorMessage errors={errors} name="user" />
          </span>
        </div>
        <div className="flex flex-col w-full pb-6 px-10">
          <label className="text-blue mb-1" htmlFor="product">
            Producto
          </label>
          <select
            id="product"
            className="h-10"
            {...register("product", { required: true })}
          >
            {products.map((p, index) => (
              <option key={index} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <span className="text-xs text-red">
            <ErrorMessage errors={errors} name="product" />
          </span>
        </div>
        <div className="flex flex-col w-full pb-6 px-10">
          <label className="text-blue mb-1" htmlFor="quantity">
            Cantidad
          </label>
          <input
            className="h-10"
            id="quantity"
            type="number"
            {...register("quantity", {
              required: {
                value: true,
                message: "El campo es requerido",
              },
              min: {
                value: 1,
                message: "La cantidad debe ser mayor a 0",
              },
            })}
          />
          <span className="text-xs text-red">
            <ErrorMessage errors={errors} name="quantity" />
          </span>
        </div>
        <div className="flex flex-col w-full pb-6 px-10">
          <label className="text-blue mb-1" htmlFor="clientDirection">
            Dirección
          </label>
          <input
            className="h-10"
            id="clientDirection"
            {...register("clientDirection", {
              required: {
                value: true,
                message: "El campo es requerido",
              },
              minLength: {
                value: 10,
                message: "La dirección debe tener almenos 10 caracteres",
              },
            })}
          />
          <span className="text-xs text-red">
            <ErrorMessage errors={errors} name="clientDirection" />
          </span>
        </div>
        <div className="flex h-12 w-full px-6 justify-around items-center">
          <Button
            className="pr-1"
            onClick={handleSubmit(onSubmit)}
            label={request && user && product ? "Modificar" : "Agregar"}
            variant={VARIANT.primary}
            disabled={!isValid}
          />
          <Button
            className="pl-1"
            onClick={onCancel}
            label={"Cancelar"}
            variant={VARIANT.secondary}
          />
        </div>
      </form>
    </div>
  );
};
