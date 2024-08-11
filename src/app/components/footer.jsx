import Link from "next/link";
import React from "react";
import Container from "./container";

export default function Footer() {
  const navigation = ["Product", "Features", "Pricing", "Company", "Blog"];
  const legal = ["Terms", "Privacy", "Legal"];
  return (
    <div className="relative">
      <Container>
        <div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-stone-700 lg:grid-cols-5">
          <div className="lg:col-span-2">
            {/* <div className="max-w-md mt-4 text-gray-500 dark:text-gray-400">
              CodAI
            </div> */}
          </div>

          <div>
            <div className="flex flex-wrap w-full -mt-2 -ml-3 lg:ml-0"></div>
          </div>
        </div>

        <div className="my-10 text-sm text-center text-gray-600 dark:text-gray-400">
          Copyright © {new Date().getFullYear()}. Feito por {""}
          <a
            href="https://www.linkedin.com/in/luan-reis-590620203/"
            target="_blank"
            rel="noopener"
          >
            Luan Reis
          </a>{" "}
        </div>
      </Container>
    </div>
  );
}
