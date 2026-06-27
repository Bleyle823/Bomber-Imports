import type { FC } from "react";

import type { HighlightSlide, HomepageCategory, HomepageHero, Phone } from "@/lib/data/types";

import HeroSection from "./HeroSection";
import PhoneSelectionSection from "./PhoneSelectionSection";
import FeaturedPhonesSection from "./FeaturedPhonesSection";
import HighlightsSection from "./HighlightsSection";
import OverviewSection from "./OverviewSection";
import TitaniumSection from "./TitaniumSection";
import ChipSection from "./ChipSection";

interface HomeScreenProps {
    hero: HomepageHero;
    categories: HomepageCategory[];
    featuredPhones: Phone[];
    highlightSlides: HighlightSlide[];
}

const Home: FC<HomeScreenProps> = ({ hero, categories, featuredPhones, highlightSlides }) => {
    return (
        <main>
            <HeroSection hero={hero} />
            <PhoneSelectionSection categories={categories} />
            <FeaturedPhonesSection phones={featuredPhones} />
            <HighlightsSection highlightSlides={highlightSlides} />
            <OverviewSection />
            <TitaniumSection />
            <ChipSection />
        </main>
    );
};

export default Home;
