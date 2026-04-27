import type { FC } from "react";
import Link from "next/link";
import { createWhatsAppLink, supportContact } from "@/shared/constants/contact";
import { footerLinks } from "../constants/footerLinks";

const Footer: FC = () => {
  return (
    <footer className="container py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between border-b border-zinc-700 pb-8">
        <p className="text-xs font-semibold leading-5 text-zinc-400">
          Contact us for the best deals on smartphones in Kenya. <br />
          <span>Call or WhatsApp: {supportContact.phoneDisplay}</span> <br />
          <span>Email: {supportContact.email}</span>
        </p>
        <a
          href={createWhatsAppLink("Hi Bomber Imports, I want to negotiate a phone price.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors w-fit"
        >
          <span className="text-sm font-bold">Negotiate price</span>
        </a>
      </div>
      <div className="my-4 flex flex-col items-start justify-between gap-4 py-4 md:flex-row md:items-center">
        <p className="text-xs font-semibold text-zinc-400">
          Copyright @ 2024 Bomber Imports. All rights reserved.
        </p>
        <ul className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 sm:gap-0">
          {footerLinks.map((link, index) => (
            <li key={link.name}>
              <Link href={link.url}>{link.name}</Link>
              {index !== footerLinks.length - 1 && (
                <span className="mx-4 hidden text-zinc-600 sm:inline">|</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

