import type { FC } from "react";

import HeroSection from "./HeroSection";
import PhoneSelectionSection from "./PhoneSelectionSection";
import FeaturedPhonesSection from "./FeaturedPhonesSection";
import HighlightsSection from "./HighlightsSection";
import OverviewSection from "./OverviewSection";

import TitaniumSection from "./TitaniumSection";
import ChipSection from "./ChipSection";

const Home: FC = () => {
  return (
    <main>
      <HeroSection />
      <PhoneSelectionSection />
      <FeaturedPhonesSection />
      <HighlightsSection />
      <OverviewSection />

      <TitaniumSection />
      <ChipSection />
    </main>
  );
};

export default Home;

