"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { CodaiIcon } from "../../components/codaiIcon";
import InputCustom from "../../ui/inputCustom";
import { EyeFilledIcon } from "../login/components/iconEye";
import { EyeSlashFilledIcon } from "../login/components/eyeSlashFilledIcon";
import { useRouter } from "next/navigation";
import showToast from "../../ui/toastCustom";
import "react-toastify/dist/ReactToastify.css";

import signUp from "@//actions/auth/signup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Primeiro nome obrigatório"),
  lastName: Yup.string().required("Sobrenome nome obrigatório"),
  email: Yup.string()
    .email("Por favor, valide o email")
    .required("Email é obrigatório"),
  password: Yup.string().required("Senha é obrigatória"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Senha diferente")
    .required("Confirme sua senha"),
});

export default function Register() {
  const [isVisibleConfirm, setIsVisibleConfirm] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await signUpWithCredentials(
          values.firstName,
          values.lastName,
          values.email,
          values.password
        );
      } catch (error) {
        console.error("Erro de autenticação:", error);
      }
    },
  });

  const signUpWithCredentials = async (
    firstName,
    lastName,
    email,
    password
  ) => {
    setLoading(true);
    try {
      const { error } = await signUp(email, password, firstName, lastName);

      if (error) {
        showToast(
          `${
            error.code == "auth/email-already-in-use"
              ? "Email já registrado"
              : "Erro ao registrar"
          }`,
          "error"
        );
      } else {
        showToast("Registrado com sucesso", "success");
        router.push("/login");
      }
    } catch (error) {
      showToast("Ops, ocorreu algum erro, tente novamente", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div className="absolute top-1 left-2 p-4 flex-col">
          <CodaiIcon className="w-12 h-12" />
        </div>
        <div className="w-full lg:w-2/3 flex items-center justify-center">
          <div className="w-3/4">
            <div className="lg:mb-10 mb-6">
              <h1 className="lg:text-4xl ">
                Conecte-se com o poder da velocidade e criatividade
              </h1>
            </div>
            <form className="" onSubmit={formik.handleSubmit}>
              <div className="flex-grow lg:gap-6 flex flex-col lg:flex-row items-center mx-auto">
                <InputCustom
                  radius="sm"
                  size="lg"
                  type="text"
                  placeholder="Primeiro nome"
                  labelPlacement="outside"
                  id="firstName"
                  name="firstName"
                  autoComplete="false"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  validationState={
                    formik.touched.firstName && formik.errors.firstName
                      ? "invalid"
                      : "valid"
                  }
                  errorMessage={
                    formik.touched.firstName && formik.errors.firstName
                      ? formik.errors.firstName
                      : ""
                  }
                />

                <InputCustom
                  radius="sm"
                  size="lg"
                  type="text"
                  placeholder="Sobrenome"
                  labelPlacement="outside"
                  id="lastName"
                  name="lastName"
                  autoComplete="false"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  validationState={
                    formik.touched.lastName && formik.errors.lastName
                      ? "invalid"
                      : "valid"
                  }
                  errorMessage={
                    formik.touched.lastName && formik.errors.lastName
                      ? formik.errors.lastName
                      : ""
                  }
                />
              </div>

              <InputCustom
                radius="sm"
                size="lg"
                type="email"
                placeholder="email@codai.com"
                labelPlacement="outside"
                id="email"
                name="email"
                autoComplete="false"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                validationState={
                  formik.touched.email && formik.errors.email
                    ? "invalid"
                    : "valid"
                }
                errorMessage={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : ""
                }
                startContent={<img src="./mail-icon.svg" />}
              />

              <div className="flex-grow lg:gap-6 flex flex-col lg:flex-row items-center mx-auto">
                <InputCustom
                  radius="sm"
                  size="lg"
                  placeholder="Password"
                  labelPlacement="outside"
                  id="password"
                  name="password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  validationState={
                    formik.touched.password && formik.errors.password
                      ? "invalid"
                      : "valid"
                  }
                  errorMessage={
                    formik.touched.password && formik.errors.password
                      ? formik.errors.password
                      : ""
                  }
                  startContent={<img src="./password-icon.svg" />}
                />

                <InputCustom
                  radius="sm"
                  size="lg"
                  placeholder="Confirme a senha"
                  labelPlacement="outside"
                  id="confirmPassword"
                  name="confirmPassword"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibilityConfirm}
                    >
                      {isVisibleConfirm ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisibleConfirm ? "text" : "password"}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  validationState={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "invalid"
                      : "valid"
                  }
                  errorMessage={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? formik.errors.confirmPassword
                      : ""
                  }
                  startContent={<img src="./password-icon.svg" />}
                />
              </div>

              <Button
                radius="md"
                size="lg"
                type="submit"
                className="w-full font-semibold mb-4 bg-sulu-300 text-black py-2 hover:bg-sulu-300 transition duration-300"
                isLoading={loading}
              >
                {loading ? "Carregando..." : "Criar conta"}
              </Button>
            </form>
            <div className="">
              <span className="text-sm mt-5 text-gray-400">
                Ir para o{" "}
                <GradientTextLogin
                  href="/login"
                  className="font-bold link-button-login"
                >
                  Login
                </GradientTextLogin>{" "}
              </span>
            </div>
          </div>
        </div>
        <img
          className="hidden rounded-bl-large rounded-tl-large lg:flex flex-grow bg-cover bg-center"
          src="/assets-screen-register.png"
        />
      </div>
    </>
  );
}

const GradientText = ({ children, className, href, ...restProps }) => {
  if (href) {
    return (
      <Link className={`gradient-text ${className}`} href={href} {...restProps}>
        {children}
      </Link>
    );
  }

  return (
    <span className={`gradient-text ${className}`} {...restProps}>
      {children}
    </span>
  );
};

const GradientTextLogin = ({ children, className, href, ...restProps }) => {
  if (href) {
    return (
      <Link
        className={`link-button-login ${className}`}
        href={href}
        {...restProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <span className={`link-button-login  ${className}`} {...restProps}>
      {children}
    </span>
  );
};
