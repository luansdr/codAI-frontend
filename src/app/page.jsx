"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import Head from "next/head";
import Hero from "./components/Hero";
import Navbar from "./components/navbar";
import SectionTitle from "./components/sectionTitle";
import { benefitOne } from "./components/data";
import Video from "./components/video";
import Benefits from "./components/benefits";
import Footer from "./components/footer";
import CodAICreators from "./components/codAICreators";
import Faq from "./components/faq";
import { motion } from "framer-motion";

const elements = [
  <Navbar />,
  <Hero />,
  <SectionTitle pretitle="CodAI Beneficios" title="Por que escolher o CodAI?" />,
  <Benefits data={benefitOne} />,
  <SectionTitle pretitle="Assista a uma demonstração" title="Veja como o CodAI funciona na prática" />,
  <Video />,
  <SectionTitle pretitle="Conheça a Equipe CodAI" title="Criadores da CodAI">
    Somos uma equipe unida e nos esforçamos muito para esse projeto
  </SectionTitle>,
  <CodAICreators />,
  <SectionTitle pretitle="Ainda tem dúvidas?" title="Tire Suas Dúvidas">
    Aqui estão algumas das perguntas mais comuns que nossos usuários fazem
    sobre a CodAI. Se você tiver alguma dúvida que não esteja listada aqui,
    sinta-se à vontade para nos contatar.
  </SectionTitle>,
  <Faq />,
];

export default function Home() {
  const elementsRefs = elements.map(() => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.2,
    });
    return { ref, inView };
  });

  return (
    <>
      <Head>
        <title>CodAI</title>
        <meta name="description" content="CodAI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {elements.map((element, index) => (
        <motion.div
          key={index}
          ref={elementsRefs[index].ref}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: elementsRefs[index].inView ? 1 : 0, y: elementsRefs[index].inView ? 0 : 100 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {element}
        </motion.div>
      ))}

      <Footer />
    </>
  );
}