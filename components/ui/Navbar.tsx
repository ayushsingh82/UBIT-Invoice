/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import { ArrowUpRight } from "@/icons";
import { Button, Dropdown } from "../common";
import { truncateAddress } from "@/utils/walletUtils";

const Navbar = () => {
  const router = useRouter();
  const [{ wallet }, connect] = useConnectWallet();
  const [isDocsHovered, setIsDocsHovered] = useState(false);

  const links = [
    {
      name: "My dashboard",
      href: "/",
    },
    {
      name: "Create an Invoice",
      href: "/create-invoice",
    },
    {
      name:"Swap",
      href:"/Swap"
    }
  ];

  const supportLinks = [
    {
      name: "Github Discussions",
      href: "",
    },
    {
      name: "Discord",
      href: "",
    },
  ];

  return (
    <nav className="h-full flex items-center p-[20px] gap-[60px] bg-black shadow-small mb-[80px]">
      <a
        target="_blank"
        rel="noreferrer noopener"
        href=""
        className="text-white font-medium text-2xl"
      >
        {/* <img
          src="assets/logo.svg"
          alt="Request Network Logo"
          className="w-[120px]"
        /> */}
        Ubit-Invoice
      </a>
      <ul className="h-full flex gap-[60px]">
        {links.map((link, index) => (
          <li className={`h-full relative text-white font-medium`} key={index}>
            <Link href={link.href}>{link.name}</Link>
            <div
              className={`${
                router.pathname === link.href &&
                "h-[4px] bg-green w-full absolute bottom-[-28px]"
              }`}
            ></div>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-[35px] ml-auto">
        <div
          onMouseEnter={() => setIsDocsHovered(true)}
          onMouseLeave={() => setIsDocsHovered(false)}
        >
          <a
            target="_blank"
            rel="noreferrer noopener"
            href=""
            className="flex items-center gap-[5px] bg-transparent text-green font-medium text-[16px]"
          >
            Integrate in your app
            <ArrowUpRight />
          </a>
          <div
            className={`${
              isDocsHovered ? "h-[1.5px]" : "h-[0px]"
            } w-100 bg-green`}
          ></div>
        </div>
        <Dropdown title="Need help?" items={supportLinks} />
        <Button
          text={
            wallet
              ? truncateAddress(wallet.accounts[0].address)
              : "Connect Wallet"
          }
          onClick={() => {
            connect();
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
