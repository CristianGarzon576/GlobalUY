import React, { useForm } from "react-hook-form";
import { Request, STATUS } from "../../models/requests";
import { Button, VARIANT } from "../Button/Button";
import { ErrorMessage } from "@hookform/error-message";

export interface ApproveFormProps {
  onConfirm: (request: Request) => void;
  onCancel: () => void;
  request: Request | null;
  status: STATUS;
}

export const ApproveForm: (props: ApproveFormProps) => JSX.Element = ({
  onConfirm,
  onCancel,
  request,
  status,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
  });
  watch();

  const onSubmit = ({ razon }) => {
    const newRequest = {
      ...request,
      status: status,
      razon,
    };
    onConfirm(newRequest);
  };

  return (
    <div className="flex w-96 flex-col">
      <form>
        <div className="flex flex-col w-full pb-6 px-10">
          <label className="text-blue mb-1" htmlFor="razon">
            Razon
          </label>
          <input
            className="h-10"
            id="razon"
            {...register("razon", {
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
            <ErrorMessage errors={errors} name="razon" />
          </span>
        </div>
        <div className="flex h-12 w-full px-6 justify-around items-center">
          <Button
            onClick={handleSubmit(onSubmit)}
            label={status === STATUS.approved ? "Aprovar" : "Rechazar"}
            variant={VARIANT.primary}
            disabled={!isValid}
          />
          <Button
            onClick={onCancel}
            label={"Cancelar"}
            variant={VARIANT.secondary}
          />
        </div>
      </form>
    </div>
  );
};
