import Image from "next/image";
import React from "react";
import Container from "./container";
import { FaLinkedin } from "react-icons/fa";

import luan from "../../../public/img-luan.png";
import { Button } from "@nextui-org/react";

// Array de objetos com os dados dos criadores
const creatorsData = [
  {
    name: "Dennys Alvarenga",
    title: "Desenvolvedor",
    description:
      "Dennys Nascimento é um dos desenvolvedores talentosos por trás do CodAI. Sua paixão pela codificação e inovação o torna um ativo valioso para nossa equipe.",
    image: "/img-dennys.png",
    linkedin:
      "https://www.linkedin.com/in/dennys-alvarenga-do-nascimento-2604031a2/",
  },
  {
    name: "Henrique Cesar",
    title: "Desenvolvedor",
    description:
      "Henrique Cesar é um membro dedicado da equipe de desenvolvimento do CodAI. Sua experiência em construir soluções inovadoras é insubstituível.",
    image: "/img-henrique.png",
    linkedin: "https://www.linkedin.com/in/henriquecesar1011/",
  },
  {
    name: "Gustavo Fonseca",
    title: "Desenvolvedor",
    description:
      "Gustavo Fonseca é um desenvolvedor apaixonado pelo trabalho que fazemos aqui no CodAI. Seu compromisso com a excelência é evidente em cada projeto que ele toca.",
    image: "/img-gustavo.png",
    linkedin: "https://www.linkedin.com/in/gustavo-fonseca-/",
  },
  {
    name: "Luan Reis",
    title: "Desenvolvedor",
    description:
      "Luan Reis é um membro valioso da equipe de desenvolvimento do CodAI. Sua criatividade e habilidades técnicas o tornam um ativo inestimável para nossa equipe.",
    image: "/img-luan.png",
    linkedin: "https://www.linkedin.com/in/luan-reis-590620203/",
  },
];

export default function CodAICreators() {
  const handleLinkedInClick = (linkedinURL) => {
    window.open(linkedinURL, "_blank");
  };

  return (
    <Container>
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {creatorsData.map((creator, index) => (
          <div key={index} className="lg:col-span-2 xl:col-auto">
            <div className="flex flex-col justify-between w-full h-full px-8 rounded-2xl py-8 bg-stone-800">
              <p className="text-lg leading-normal">{creator.description}</p>
              <div className="flex items-center mt-4">
                <Avatar
                  image={creator.image}
                  name={creator.name}
                  title={creator.title}
                  linkedinURL={creator.linkedin}
                  onClickLinkedIn={handleLinkedInClick}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

function Avatar(props) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14">
        <img
          src={props.image}
          width="60"
          height="60"
          alt="Avatar"
          layout="responsive"
          placeholder="blur"
        />
      </div>
      <div>
        <div className="flex items-center gap-1">
          <span className="text-lg font-medium">{props.name}</span>
          <Button
            variant="light"
            isIconOnly
            onClick={() => props.onClickLinkedIn(props.linkedinURL)}
            className="text-science-blue-600 hover:text-science-blue-500 rounded-full"
          >
            <FaLinkedin size={24} className="" />
          </Button>
        </div>
        <div className="text-gray-600 dark:text-gray-400">{props.title}</div>
      </div>
    </div>
  );
}
