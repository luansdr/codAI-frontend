import Link from "next/link";
import { CodaiIcon } from "./codaiIcon";
import Container from "./container";

export default function Navbar() {
  const navigation = [];

  return (
    <Container className="pt-4">
      <nav className="container flex items-center justify-between">
        <Link href="/">
          <span className="flex items-center space-x-2 text-2xl font-medium">
            <span>
              <CodaiIcon />
            </span>
          </span>
        </Link>

        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link href="/">
                  <span className="inline-block px-4 py-2 text-lg font-normal no-underline rounded-md text-gray-200 hover:text-sulu-500 focus:text-sulu-500 focus:bg-indigo-100 focus:outline-none">
                    {menu}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mr-3 space-x-3 lg:flex nav__item">
          <Link href="/login">
            <span className="px-6 py-2 text-black bg-sulu-300 hover:bg-sulu-100 rounded-md md:ml-5">
              Entrar
            </span>
          </Link>
        </div>
      </nav>
    </Container>
  );
}
