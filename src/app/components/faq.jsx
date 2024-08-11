import React from "react";
import Container from "./container";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

export default function Faq() {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-50 rounded-lg bg-stone-800 hover:bg-stone-600 transition-colors duration-300 ease-in-out ${
                      open ? "ring-stone-900 ring-opacity-75" : ""
                    } focus:outline-none focus-visible:ring focus-visible:ring-opacity-75`}
                  >
                    <span>{item.question}</span>
                    <ChevronDownIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-sulu-500 transition-transform duration-300 ease-in-out`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel
                    className={`px-4 pt-4 pb-2 text-gray-300 transition-opacity duration-300 ease-in-out overflow-hidden ${
                      open ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
}

const faqdata = [
  {
    question: "O que é o CodAI?",
    answer:
      "O CodAI é uma plataforma inovadora que utiliza inteligência artificial para simplificar e acelerar o processo de criação e edição de código, tornando-o acessível a desenvolvedores de todos os níveis de experiência.",
  },
  {
    question: "Como posso começar a usar o CodAI?",
    answer:
      "Para começar a usar o CodAI, basta se inscrever na plataforma e fazer login na sua conta. Você terá acesso imediato a todas as funcionalidades e poderá começar a criar e editar código de forma mais eficiente.",
  },
  {
    question: "Quais são os benefícios do CodAI?",
    answer:
      "O CodAI oferece uma série de benefícios, incluindo economia de tempo na codificação, sugestões inteligentes de código, correções de erros automáticas e muito mais. Ele também ajuda a acelerar o desenvolvimento de projetos e a melhorar a qualidade do código.",
  },
  {
    question: "Posso usar o CodAI em projetos comerciais?",
    answer:
      "Sim, o CodAI pode ser usado em projetos comerciais e pessoais. Ele foi projetado para atender às necessidades de desenvolvedores individuais, equipes de desenvolvimento e empresas.",
  },
];
