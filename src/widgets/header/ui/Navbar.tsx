"use client";
import { type FC, useEffect } from "react";
import Link from "next/link";
import { stagger, useAnimate } from "framer-motion";

import Logo from "@/shared/ui/Logo";

import { useDevice } from "@/shared/hooks/useDevice";
import { createWhatsAppLink } from "@/shared/constants/contact";

import { headerLinks } from "../constants/headerLinks";

const Navbar: FC = () => {
  const [scope, animate] = useAnimate();
  const { isDesktop } = useDevice();

  useEffect(() => {
    if (scope.current) {
      animate("li", { opacity: [0, 1] }, { delay: stagger(0.1) });
    }
  }, [animate, scope]);


  return (
    <nav ref={scope}>
      <ul className="flex items-center justify-between gap-8 text-sm text-zinc-500">
        <li>
          <Logo />
        </li>
        {isDesktop && (
          <li className="w-full">
            <ul className="flex w-full items-center justify-between">
              {headerLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.url}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        )}
        <li>
          <Link
            href={createWhatsAppLink("Hi Bomber Imports, I want to negotiate a phone price.")}
            target="_blank"
            className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold hover:bg-zinc-200 transition-colors"
          >
            Negotiate
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
