import type { FC } from "react";
import Link from "next/link";

import Image from "next/image";

const Logo: FC = () => {
  return (
    <Link className="flex items-center gap-2" href="/" aria-label="Home page">
      <div className="relative size-12 overflow-hidden rounded-lg border border-zinc-700 bg-black p-1 shadow-lg shadow-blue-500/20">
        <Image
          src="/images/logo.png"
          alt="Bomber Imports Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <span className="hidden text-xl font-bold text-white sm:block">
        Bomber Imports
      </span>
    </Link>
  );
};

export default Logo;

