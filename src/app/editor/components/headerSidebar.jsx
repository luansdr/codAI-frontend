"use client";

import React, { useState } from "react";
import { VscChevronDown } from "react-icons/vsc";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { useAuthContext } from "@//authservice/AuthContext";

export default function HeaderSidebar({ active }) {
  const { user, handleLogout } = useAuthContext();

  return (
    <header
      className={`px-2 flex flex-row items-center ${
        active ? "flex-row gap-7" : "flex-col items-center justify-center"
      }`}
    >
      <div className={`${active ? "" : ""}`}>
        {!active ? (
          <DropdownContent
            color="default"
            variant="light"
            handleLogout={handleLogout}
            active={active}
          >
            <Avatar showFallback isBordered src={user?.photoURL} />
          </DropdownContent>
        ) : (
          <Avatar showFallback isBordered src={user?.photoURL} />
        )}
      </div>
      <div className="flex flex-row gap-3 items-center justify-center">
        <span
          className={`text-white overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[80px] ${
            active ? "" : "hidden"
          }`}
        >
          {user?.displayName}
        </span>
        <div className="flex flex-wrap gap-4">
          <DropdownContent
            handleLogout={handleLogout}
            color="default"
            variant="light"
            active={active}
          >
            <Button
              className={active ? "" : "hidden"}
              isIconOnly
              variant="outline"
            >
              <VscChevronDown size={20} />
            </Button>
          </DropdownContent>
        </div>
      </div>
    </header>
  );
}

const DropdownContent = ({ variant, color, children, handleLogout }) => (
  <Dropdown>
    <DropdownTrigger className="cursor-pointer">{children}</DropdownTrigger>
    <DropdownMenu
      aria-label="Dropdown Variants"
      color={color}
      variant={variant}
    >
      <DropdownItem key="edit">Ver informações</DropdownItem>
      <DropdownItem
        onClick={handleLogout}
        key="delete"
        className="text-danger"
        color="danger"
      >
        Sair
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);
