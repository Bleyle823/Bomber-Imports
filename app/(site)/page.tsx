import type { FC } from "react";

import { getHomepageConfig } from "@/lib/data/homepage";
import { getPhones } from "@/lib/data/phones";

import { HomeScreen } from "@/screens/home";

export const dynamic = "force-dynamic";

const HomePage: FC = async () => {
    const [phones, homepage] = await Promise.all([getPhones(), getHomepageConfig()]);

    const featuredPhones = homepage.featuredPhoneIds
        .map((id) => phones.find((phone) => phone.id === id))
        .filter((phone): phone is NonNullable<typeof phone> => Boolean(phone));

    return (
        <HomeScreen
            hero={homepage.hero}
            categories={homepage.categories}
            featuredPhones={featuredPhones}
            highlightSlides={homepage.highlightSlides}
        />
    );
};

export default HomePage;
