"use client";

import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { BsFillPlayFill } from "react-icons/bs";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useChat } from "../context/chatContext";
import { createZipFile } from "../../../utils/zip-download-function";
const Topbar = ({ sidebarOpen }) => {
  const { selectedChat, vmInstanceActual, loading } = useChat();

  const textControl = useAnimation();
  const buttonsControl = useAnimation();

  const textAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonsAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleDownloadZip = async () => {
    const files = await vmInstanceActual.vm.getFsSnapshot();
    createZipFile(files);
  };

  useEffect(() => {
    textControl.start(selectedChat?.title ? "visible" : "hidden");
    buttonsControl.start(selectedChat?.title ? "visible" : "hidden");
  }, [selectedChat, vmInstanceActual]);

  const handlePlayButtonClick = () => {
    if (
      vmInstanceActual &&
      vmInstanceActual.vm &&
      vmInstanceActual.vm.preview &&
      vmInstanceActual.vm.preview.origin
    ) {
      const externalWebsiteURL = vmInstanceActual.vm.preview.origin;
      window.open(externalWebsiteURL, "_blank");
    }
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-blackcodai-950 my-3 mx-1 py-6 px-4  rounded-3xl ${
        sidebarOpen ? "ml-1/4" : "ml-1/5"
      } transition-all duration-300`}
    >
      <div className="flex flex-row items-center w-full justify-between">
        <motion.h1
          key={selectedChat?.title}
          initial={{ opacity: 0, y: -20 }}
          animate="visible"
          exit="hidden"
          variants={textAnimation}
          className="text-white h-[40px] text-lg"
        >
          {(selectedChat &&
            (selectedChat.title !== ""
              ? selectedChat.title
              : "Novo template")) ||
            "Novo template"}
        </motion.h1>
        <AnimatePresence>
          {selectedChat?.title && (
            <motion.div
              key="buttons" // Chave única para a transição suave dos botões
              initial={{ opacity: 0, y: 20 }}
              animate="visible"
              exit="hidden"
              variants={buttonsAnimation}
              transition={{ duration: 0.3 }}
              className={`flex flex-row gap-5`}
            >
              <Button
                variant="light"
                className="text-gray-400"
                isLoading={loading}
                startContent={!loading ? <FiDownload /> : ""}
                onClick={handleDownloadZip}
              >
                Download (ZIP)
              </Button>

              <Button
                variant="solid"
                className="text-gray-400"
                isLoading={loading}
                isIconOnly
                onClick={handlePlayButtonClick}
              >
                {loading ? "" : <BsFillPlayFill size={30} />}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Topbar;
