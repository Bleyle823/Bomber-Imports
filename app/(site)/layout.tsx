import type { FC, PropsWithChildren } from "react";

import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

const SiteLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default SiteLayout;
