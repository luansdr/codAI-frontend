"use client";
import React, { useEffect, useState } from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { BiCopy } from "react-icons/bi";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import showToast from "../../ui/toastCustom";

export default function MainEditor() {
  const [isBulbOn, setIsBulbOn] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const ideas = [
    {
      title: "Tela de login com estilização de Halloween",
      object: "Crie uma tela de Login com estilizacação de Halloween",
    },
    {
      title: "Template de uma página de medicamentos farmaceutico",
      object: "Faça uma tela de medicamentos, com o nome do medicamente e descrição abaixo e do lado direito preço, e a imagem vai ser uma div",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsBulbOn((prevIsBulbOn) => !prevIsBulbOn);
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (isBulbOn) {
      const repeatIntervalId = setInterval(() => {
        setIsBulbOn(false);
      }, 500);

      return () => {
        clearInterval(repeatIntervalId);
      };
    }
  }, [isBulbOn]);

  const handleCopyIdea = (idea) => {
    const textToCopy = idea;
    showToast("Conteudo copiado! 👻", "default", 1000);
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setTooltipVisible(true);
        setTimeout(() => {
          setTooltipVisible(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Erro ao copiar o conteúdo:", error);
      });
  };

  return (
    <div className="flex flex-col items-center h-full justify-center content-center">
      <header className="mb-12 text-center">
        <h1 className="text-2xl mb-3 font-semibold">
          Ainda não sabe como usar?
        </h1>
        <p className="text-gray-400">
          Use as ideias básicas de templates para ver funcionando
        </p>
      </header>

      <article>
        <div className="glow">
          <div className="bg-gradient-to-tl orb from-gray-700 to-gray-900 rounded-full content-center justify-center flex items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                rotate: isBulbOn ? [-22, 0, -10] : 10,
                rotate: isBulbOn ? [-22, 0, 8] : 2,
                scale: 1,
                opacity: isBulbOn ? 1 : 0.7,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <FaRegLightbulb className="text-yellow-300" size={25} />
            </motion.div>
          </div>
        </div>
      </article>

      <div className="mt-6 text-lg">
        <span>Ideias de templates</span>
      </div>

      <div className="mt-6">
        {ideas.map((idea, index) => (
          <div
            key={index}
            className="flex flex-row py-2 px-4 bg-gradient-to-l from-blackcodai-950 to-gray-800 hover:shadow-md transform transition-transform duration-300 gap-20 rounded-lg my-4 items-center justify-between"
          >
            <div>
              <h1>{idea.title}</h1>
              {selectedIdea === idea && <p>{idea.object}</p>}
            </div>
            <div>
              <Button
                variant="light"
                onClick={() => handleCopyIdea(idea.object)}
                startContent={<BiCopy className="font-bold text-blue-400" />}
                isIconOnly
              ></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
