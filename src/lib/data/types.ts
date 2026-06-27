export interface Phone {
    id: string;
    brand: string;
    model: string;
    price: number;
    description: string;
    images: string[];
    model3d?: string;
    specs: {
        display: string;
        processor: string;
        camera: string;
    };
    detailSpecs: {
        storage: string;
        battery: string;
        condition: string;
        warranty: string;
        network: string;
        highlights: string[];
    };
}

export interface Accessory {
    id: string;
    name: string;
    category: string;
    price: string;
    description: string;
    compatibility: string;
    images: string[];
}

export interface HomepageCategory {
    title: string;
    description: string;
    image: string;
    link: string;
    color: string;
    startingPrice: string;
}

export interface HomepageHero {
    headline: string;
    subheadline: string;
    ctaLabel: string;
    ctaLink: string;
    secondaryCtaLabel: string;
    secondaryCtaLink: string;
}

export interface HighlightSlide {
    title: string;
    videoSrc: string;
}

export interface HomepageConfig {
    hero: HomepageHero;
    featuredPhoneIds: string[];
    categories: HomepageCategory[];
    highlightSlides: HighlightSlide[];
}

export type UploadCategory = "phones" | "accessories" | "categories";
