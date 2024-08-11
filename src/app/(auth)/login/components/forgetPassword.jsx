'use client'
import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { sendPasswordResetEmail } from "firebase/auth";
import showToast from '../../../ui/toastCustom';
import InputCustom from "../../../ui/inputCustom";
import forgetPassword from "@//actions/auth/forget";

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Digite um email válido').required('Email é obrigatório'),
});


export default function ForgetPassword() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [loading, setLoading] = useState(false);



    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await resetPassword(values.email);
            } catch (error) {
                console.error('Erro de autenticação:', error);
            }
        },
    });


    const resetPassword = async (email) => {
        setLoading(true);
        try {
            const { error } = await forgetPassword(email);

            if (error) {
                if (error.code === "auth/user-not-found") {
                    showToast("Email não encontrado", "error");
                } else if (error.code === "auth/invalid-email") {
                    showToast("Email inválido", "error");
                } else {
                    showToast("Erro ao redefinir senha", "error");
                }
            }
            else {
                showToast("Check seu email", "success");
                formik.resetForm()
                onOpenChange()
            }

        } catch (error) {
        } finally {
            setLoading(false);
        }
    };



    // useEffect(() => {
    //     if (!isOpen) {
    //         formik.resetForm(); 
    //     }
    // }, [isOpen, formik]);

    return (
        <>
            <Button variant="light mt-1" onPress={onOpen} color="success">
                <span className='text-transparent my-4 font-semibold  bg-clip-text bg-gradient-to-r from-malibu-300 to-sulu-200'>
                    Esqueceu a senha?
                </span>
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Redefinir senha</ModalHeader>
                            <ModalBody>
                                <form onSubmit={formik.handleSubmit}>
                                    <InputCustom
                                        radius='sm'
                                        size='lg'
                                        type="email"
                                        placeholder="email@codai.com"
                                        labelPlacement="outside"
                                        id="email"
                                        name="email"
                                        autoComplete="false"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        validationState={formik.touched.email && formik.errors.email ? "invalid" : "valid"}
                                        errorMessage={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                                        startContent={<img src='./mail-icon.svg' />}
                                    />

                                    <Button
                                        radius='md'
                                        size='lg'
                                        type="submit"
                                        className="w-full font-semibold mb-4 bg-sulu-300 text-black py-2 hover:bg-sulu-300 transition duration-300"
                                        isLoading={loading}

                                    >
                                        {loading ? "Carregando..." : "Redefinir senha"}
                                    </Button>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
