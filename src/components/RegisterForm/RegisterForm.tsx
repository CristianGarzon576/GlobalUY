import { useForm } from "react-hook-form";
import { POSITION, ROLE, User } from "../../models/user";
import { Button, VARIANT } from "../Button/Button";
import { ErrorMessage } from "@hookform/error-message";
import React, { useEffect } from "react";

export interface RegisterFormProps {
  isFromLogin?: boolean;
  onCreate: (user: User) => void;
  user?: User | null;
}

export const RegisterForm: (props: RegisterFormProps) => JSX.Element = ({
  isFromLogin = false,
  onCreate,
  user = null,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: { ...user },
  });
  watch();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const onSubmit = ({ cargo, password, name, email, role, ci }) => {
    const userToCreate = {
      id: user?.id ?? -1,
      cargo,
      password,
      name,
      email,
      role,
      ci,
    };
    onCreate(userToCreate);
  };

  return (
    <div className="flex w-96 flex-col">
      <form>
        <div className="flex flex-col w-full pb-6 px-10">
          <label className="text-blue mb-1" htmlFor="name">
            Nombre
          </label>
          <input
            className="h-10"
            id="name"
            placeholder="Nombre"
            {...register("name", {
              required: { value: true, message: "El campo es Requerido" },
              maxLength: {
                value: 30,
                message: "El campo necesita minimo 30 caracteres",
              },
              minLength: {
                value: 8,
                message: "El campo necesita minimo 8 caracteres",
              },
            })}
          />
          <span className="text-xs text-red">
            <ErrorMessage errors={errors} name="name" />
          </span>
        </div>
        <div className="flex flex-col w-full pb-6 px-10">
          <label className="text-blue mb-1" htmlFor="ci">
            CI
          </label>
          <input
            className="h-10"
            id="ci"
            placeholder="ci"
            {...register("ci", {
              required: { value: true, message: "El campo es requerido" },
              maxLength: {
                value: 10,
                message: "El campo necesita maximo 10 caracteres",
              },
            })}
          />
          <span className="text-xs text-red">
            <ErrorMessage errors={errors} name="ci" />
          </span>
        </div>
        <div className="flex flex-col w-full pb-6 px-10">
          <label className="text-blue mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="h-10"
            id="email"
            placeholder="Email"
            {...register("email", {
              required: { value: true, message: "El campo es requerido" },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "El campo no coincide con el formato",
              },
            })}
          />
          <span className="text-xs text-red">
            <ErrorMessage errors={errors} name="email" />
          </span>
        </div>
        <div className="flex flex-col w-full pb-6 px-10">
          <label className="text-blue mb-1" htmlFor="password">
            Contraseña
          </label>
          <input
            className="h-10"
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: {
                value: true,
                message: "El campo es requerido",
              },
              minLength: {
                value: 12,
                message: "La constraseña es de minimo 12 caracteres",
              },
            })}
          />
          <span className="text-xs text-red">
            <ErrorMessage errors={errors} name="password" />
          </span>
        </div>
        {!user && (
          <div className="flex flex-col w-full pb-6 px-10">
            <label className="text-blue mb-1" htmlFor="confirmPassword">
              Confirmar Contraseña
            </label>
            <input
              className="h-10"
              id="confirmPassword"
              type="password"
              placeholder="ConfirmPassword"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
                minLength: {
                  value: 12,
                  message: "La constraseña es de minimo 12 caracteres",
                },
                validate: {
                  isSamePassword: (_, values) => {
                    if (values.password === values.confirmPassword) {
                      return true;
                    } else return "Las contraseñas no coinciden";
                  },
                },
              })}
            />
            <span className="text-xs text-red">
              <ErrorMessage errors={errors} name="confirmPassword" />
            </span>
          </div>
        )}
        {!isFromLogin && (
          <>
            <div className="flex flex-col w-full pb-6 px-10">
              <label className="text-blue mb-1" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                className="h-10"
                {...register("role", { required: true })}
              >
                <option value={ROLE.Admin}>Administrador</option>
                <option value={ROLE.User}>Usuario</option>
              </select>
              <span className="text-xs text-red">
                <ErrorMessage errors={errors} name="role" />
              </span>
            </div>
            <div className="flex flex-col w-full pb-6 px-10">
              <label className="text-blue mb-1" htmlFor="cargo">
                Cargo
              </label>
              <select
                id="cargo"
                className="h-10"
                {...register("cargo", { required: true })}
              >
                <option value={POSITION.Admin}>Administrador</option>
                <option value={POSITION.Cleaner}>Limpiador</option>
              </select>
              <span className="text-xs text-red">
                <ErrorMessage errors={errors} name="cargo" />
              </span>
            </div>
          </>
        )}
        <div className="flex h-12 w-full px-6 self-center">
          <Button
            onClick={handleSubmit(onSubmit)}
            label={isFromLogin ? "Registrar" : "Agregar"}
            variant={VARIANT.primary}
            disabled={!isValid}
          />
        </div>
      </form>
    </div>
  );
};
