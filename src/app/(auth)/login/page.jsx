"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { CodaiIcon } from "../../components/codaiIcon";
import InputCustom from "../../ui/inputCustom";
import { EyeFilledIcon } from "./components/iconEye";
import { EyeSlashFilledIcon } from "./components/eyeSlashFilledIcon";
import { useRouter } from "next/navigation";
import showToast from "../../ui/toastCustom";
import ForgetPassword from "./components/forgetPassword";
import {
  signInWithGoogle,
  signInWithEmail,
  signInWithGithub,
} from "@//actions/auth/signin";
import ModalLoading from "./components/modalLoading";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Digite um email válido")
    .required("Email é obrigatório"),
  password: Yup.string().required("Senha é obrigatória"),
});

const routeToGo = `/editor`;

export default function Login() {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await signInWithEmailPassword(values.email, values.password);
      } catch (error) {
        console.error("Erro de autenticação:", error);
      }
    },
  });

  const signInWithEmailPassword = async (email, password) => {
    setLoading(true);

    try {
      const { result, error } = await signInWithEmail(email, password);

      if (error) {
        showToast(
          `${
            error.code === "auth/account-exists-with-different-credential"
              ? "Usuario já tem esse email usando Google ou Github"
              : "Credenciais inválidas"
          }`,
          "error"
        );
      } else {
        showToast("Sucesso na autenticação", "success");
        router.push(routeToGo);
      }
    } catch (error) {
      showToast("Falha na autenticação", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const { error } = await signInWithGoogle();

      if (error) {
        showToast(
          `${
            error.code == "auth/account-exists-with-different-credential"
              ? "Usuario já tem esse email usando Github ou Email"
              : "Falha na autenticação Google"
          }`,
          "error"
        );
      } else {
        showToast("Sucesso na autenticação Google", "success");
        router.push(routeToGo);
      }
    } catch (error) {
      console.error("Erro ao autenticar Google:", error);
      showToast("Erro ao autenticar Google", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setLoading(true);

      const { error } = await signInWithGithub();

      if (error) {
        showToast(
          `${
            error.code == "auth/account-exists-with-different-credential"
              ? "Usuario já tem esse email usando Google ou Email"
              : "Falha na autenticação Github"
          }`,
          "error"
        );
      } else {
        showToast("Sucesso na autenticação Github", "success");
        router.push(routeToGo);
      }
    } catch (error) {
      showToast("Falha na autenticação Github", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {loading ?  <ModalLoading/> : "" }
      <div className="flex h-screen overflow-hidden">
        <div className="absolute top-1 left-2 p-4">
          <CodaiIcon className="w-12 h-12" />
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="w-3/4">
            <div className="mb-8">
              <h1 className="text-3xl	">
                Vamos ser{" "}
                <GradientText className="font-bold">criativos!</GradientText>
              </h1>
              <div className="mt-4 text-base text-gray-400">
                <span>Faça login no CodAI para começar a criar a magia</span>
              </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
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

              <InputCustom
                className="mb-1"
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

              <div className="flex float-right">
                <ForgetPassword />
              </div>

              <Button
                radius="md"
                size="lg"
                type="submit"
                className="w-full mt-2 font-semibold bg-sulu-300 text-black py-2 hover:bg-sulu-300 transition duration-300"
              >
                {loading ? "Carregando..." : "Login"}
              </Button>
              <div className="pt-6 pb-6">
                <div className="flex items-center justify-center">
                  <hr className="flex-grow border-t border-gray-400 hidden sm:block" />
                  <div className="mx-4 text-xs text-gray-400 flex items-center justify-center sm:justify-start">
                    Ou continue com
                  </div>
                  <hr className="flex-grow border-t border-gray-400 hidden sm:block" />
                </div>
              </div>

              <div className="flex space-x-4 mt-4">
                <Button
                  startContent={<img src="./google-icon.svg" className="w-7" />}
                  radius="sm"
                  size="lg"
                  type="button"
                  onClick={() => {
                    handleGoogleSignIn();
                  }}
                  className="w-full font-semibold mb-4 bg-shark-950 text-shark-400 py-2 hover:bg-gray-300 transition duration-300 mobile-hide-text"
                >
                  {loading ? "Carregando..." : "Continue com Google"}
                </Button>

                <Button
                  startContent={<img src="./github-icon.svg" className="w-7" />}
                  radius="sm"
                  size="lg"
                  type="button"
                  onClick={() => {
                    handleGithubSignIn();
                  }}
                  className="w-full font-semibold mb-4 bg-shark-950 text-shark-400 py-2 hover:bg-gray-300 transition duration-300 mobile-hide-text"
                >
                  {loading ? "Carregando..." : "Continue com GitHub"}
                </Button>
              </div>

              <div className="">
                <span className="text-sm mt-5 text-gray-400">
                  Não tem conta?{" "}
                  <GradientText className="font-bold" href="/register">
                    Registrar
                  </GradientText>{" "}
                </span>
              </div>
            </form>
          </div>
        </div>
        <img
          className="hidden rounded-bl-large rounded-tl-large lg:flex flex-grow bg-cover bg-center"
          src="/assets-screen-login.png"
        />
      </div>
    </>
  );
}

const GradientText = ({ children, className, href, ...restProps }) => {
  if (href) {
    return (
      <Link
        className={`gradient-text ${className} `}
        href={href}
        {...restProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <span className={`gradient-text ${className} `} {...restProps}>
      {children}
    </span>
  );
};
