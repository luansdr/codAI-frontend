"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@nextui-org/react";
import { LuSend } from "react-icons/lu";
import SelectCustom from "./selectCustom";
import { Formik, Form, Field } from "formik";
import showToast from "../../ui/toastCustom";
import { useAuthContext } from "@//authservice/AuthContext";
import { patchChatTitle } from "@//actions/chat";

import { getAllFrameworkOptions } from "@//actions/frameworks";
import { postCodeToOpenAI } from "@//actions/codai-ia";
import { postOpenAI } from "@//actions/openAI";
import { useChat } from "../context/chatContext";

const InputCodeAI = () => {
  const { user } = useAuthContext();
  const { selectedChat, fetchChats, setContentEditor, setSelectedChat } =
    useChat();
  const [isFocused, setIsFocused] = useState(false);
  const [isTextareaFilled, setIsTextareaFilled] = useState(false);
  const textareaRef = useRef(null);
  const [currentSelectValue, setCurrentSelectValue] = useState("");
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [frameworkOptions, setFrameworkOptions] = useState([]);

  useEffect(() => {
    async function fetchFrameworkOptions() {
      try {
        const response = await getAllFrameworkOptions(user);
        if (response) {
          setFrameworkOptions(response.data);
        }
      } catch (error) {
        console.error("Error fetching framework options:", error);
      }
    }
    fetchFrameworkOptions();
  }, []);

  const askTemplate = async (ask, template) => {
    setLoading(true);
    const request = {
      ask: ask,
      template: template,
      chatId: selectedChat?.id || null,
      userId: user.uid,
      user: user,
    };

    try {
      const response = await postCodeToOpenAI(request);
      if (response) {
        setContentEditor(response.data.chat);
        if (!response.data.chat.title) {
          await setTitleNull(
            request.ask,
            request.userId,
            response.data.chat.id
          );
          await fetchChats();
        }
      }
    } catch (error) {
      console.error("Error fetching framework options:", error);
    } finally {
      setLoading(false);
    }
  };

  const setTitleNull = async (ask, userId, chatId) => {
    try {
      const response = await postOpenAI(ask);

      const titleUpdated = await patchChatTitle(
        chatId,
        response.choices[0].message.content,
        userId,
        user
      );

      return titleUpdated;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 4 * 24);
    textarea.style.height = `${newHeight}px`;

    setIsTextareaFilled(textarea.value.trim().length > 0);
  }, [isFocused, isTextareaFilled]);

  const handleSelectChange = (selectedValue) => {
    setCurrentSelectValue(selectedValue);
  };

  const handleTextareaInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 4 * 24);
    textarea.style.height = `${newHeight}px`;

    setIsTextareaFilled(textarea.value.trim().length > 0);
  };

  return (
    <Formik
      initialValues={{ message: "", selectValue: "" }}
      onSubmit={(values, { resetForm }) => {
        if (currentSelectValue == "" || values.message.trim() === "") {
          setIsFormInvalid(true);
          showToast("Selecione o framework desejado", "error");
        } else {
          setIsFormInvalid(false);
          askTemplate(values.message, currentSelectValue);
          setIsTextareaFilled(false);
          resetForm();
        }
      }}
    >
      {({ handleSubmit, resetForm }) => (
        <Form>
          <div className={`relative  transition-colors duration-300 `}>
            <div className="flex items-center justify-between gap-6 p-2 px-4">
              <div className="flex items-center space-x-2">
                <Field
                  name="selectValue"
                  className={`${isFormInvalid ? "" : "bg-red-600"}`}
                >
                  {({ field }) => (
                    <SelectCustom
                      options={frameworkOptions}
                      onSelectChange={handleSelectChange}
                      isValid={!isFormInvalid}
                      {...field}
                    />
                  )}
                </Field>
              </div>
              <div className="relative flex h-full flex-1 items-stretch md:flex-col">
                <div
                  className={`flex flex-col ${
                    isFocused ? " bg-blackcodai-900" : ""
                  } transition-colors hover:bg-blackcodai-900 bg w-full py-[10px] flex-grow md:py-4 md:pl-4 relative border  dark:border-gray-900/50 bg-blackcodai-950 rounded-xl shadow-xs dark:shadow-xs`}
                >
                  <div className="flex items-center space-x-2">
                    <Field
                      as="textarea"
                      id="message"
                      name="message"
                      rows="1"
                      placeholder="Descreva com precisão o que precisa"
                      className={`m-0 w-full resize-none border-0 bg-transparent p-0 pr-10  pl-3 md:pl-0 outline-none `}
                      style={{
                        maxHeight: "200px",
                        height: "auto",
                        overflowY: "hidden",
                      }}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      innerRef={textareaRef}
                      onInput={handleTextareaInput}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit();
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <Button
                className={` disabled:opacity-40 hover:bg-gray-600 h-14 w-14 `}
                isIconOnly
                isDisabled={!isTextareaFilled}
                isLoading={loading}
                type="submit"
              >
                {!loading ? <LuSend /> : ""}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default InputCodeAI;
