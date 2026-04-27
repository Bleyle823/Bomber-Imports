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

export const phones: Phone[] = [
    {
        id: "iphone-17-pro-max",
        brand: "Apple",
        model: "iPhone 17 Pro Max",
        price: 210000,
        description: "The future of iPhone. Experience the upcoming flagship with advanced 3D modeling.",
        images: ["/images/phones/iphone16promax-1.jpg"], // Placeholder image
        model3d: "/models/iphone_17_pro_max.glb",
        specs: {
            display: '6.9" ProMotion OLED',
            processor: "A19 Pro (Expected)",
            camera: "Ultra-advanced Triple Camera"
        },
        detailSpecs: {
            storage: "256GB base storage",
            battery: "All-day battery life",
            condition: "Brand new import",
            warranty: "12-month shop warranty",
            network: "Unlocked for Kenyan networks",
            highlights: ["ProMotion display", "Flagship Apple silicon", "Premium titanium-style finish"]
        }
    },
    {
        id: "samsung-s22-ultra",
        brand: "Samsung",
        model: "Galaxy S22 Ultra",
        price: 85000,
        description: "A classic powerhouse with integrated S Pen and legendary zoom capabilities.",
        images: ["/images/phones/s24ultra-1.jpg"], // Placeholder
        model3d: "/models/samsung_s22_ultra.glb",
        specs: {
            display: '6.8" Dynamic AMOLED 2X',
            processor: "Snapdragon 8 Gen 1",
            camera: "108MP Quad Camera"
        },
        detailSpecs: {
            storage: "256GB storage",
            battery: "5,000mAh battery",
            condition: "Clean import",
            warranty: "6-month shop warranty",
            network: "Unlocked for Kenyan networks",
            highlights: ["Built-in S Pen", "100x Space Zoom", "Large AMOLED display"]
        }
    },
    {
        id: "google-pixel-6-pro",
        brand: "Google",
        model: "Pixel 6 Pro",
        price: 55000,
        description: "The phone that redefined Pixel with the first Google Tensor chip.",
        images: ["/images/phones/pixel9pro-1.jpg"], // Placeholder
        model3d: "/models/google_pixel_6_pro.glb",
        specs: {
            display: '6.7" LTPO OLED',
            processor: "Google Tensor",
            camera: "50MP Wide"
        },
        detailSpecs: {
            storage: "128GB storage",
            battery: "5,003mAh battery",
            condition: "Clean import",
            warranty: "6-month shop warranty",
            network: "Unlocked for Kenyan networks",
            highlights: ["Google Tensor chip", "Clean Android experience", "Excellent computational photography"]
        }
    },
    {
        id: "samsung-s21-ultra",
        brand: "Samsung",
        model: "Galaxy S21 Ultra",
        price: 65000,
        description: "Bold design with a contour-cut camera and dual telephoto lenses.",
        images: ["/images/phones/s24ultra-2.jpg"], // Placeholder
        model3d: "/models/samsung_galaxy_s21_ultra.glb",
        specs: {
            display: '6.8" Dynamic AMOLED 2X',
            processor: "Snapdragon 888",
            camera: "108MP Wide"
        },
        detailSpecs: {
            storage: "256GB storage",
            battery: "5,000mAh battery",
            condition: "Clean import",
            warranty: "6-month shop warranty",
            network: "Unlocked for Kenyan networks",
            highlights: ["Dual telephoto camera", "120Hz AMOLED display", "Premium Samsung flagship build"]
        }
    },
    {
        id: "iphone-16-pro",
        brand: "Apple",
        model: "iPhone 16 Pro",
        price: 160000,
        description: "The latest Pro from Apple with Titanium design and A18 Pro chip.",
        images: ["/images/phones/iphone16pro-1.jpg", "/images/phones/iphone16pro-2.jpg"],
        model3d: "/models/scene.glb",
        specs: {
            display: '6.3" Super Retina XDR',
            processor: "A18 Pro",
            camera: "48MP Fusion Camera"
        },
        detailSpecs: {
            storage: "256GB storage",
            battery: "Up to 27 hours video playback",
            condition: "Brand new import",
            warranty: "12-month shop warranty",
            network: "Unlocked for Kenyan networks",
            highlights: ["A18 Pro performance", "Titanium design", "Pro camera controls"]
        }
    },
    {
        id: "samsung-s24-ultra",
        brand: "Samsung",
        model: "Galaxy S24 Ultra",
        price: 145000,
        description: "Galaxy AI is here. Titanium frame and a massive 200MP camera.",
        images: ["/images/phones/s24ultra-provided.jpg"],
        specs: {
            display: '6.8" QHD+ AMOLED 2X',
            processor: "Snapdragon 8 Gen 3",
            camera: "200MP Wide-angle"
        },
        detailSpecs: {
            storage: "256GB storage",
            battery: "5,000mAh battery",
            condition: "Brand new import",
            warranty: "12-month shop warranty",
            network: "Unlocked for Kenyan networks",
            highlights: ["Galaxy AI features", "S Pen included", "200MP camera system"]
        }
    },
    {
        id: "google-pixel-9-pro",
        brand: "Google",
        model: "Pixel 9 Pro",
        price: 130000,
        description: "The most powerful Pixel yet with Google's best camera system.",
        images: ["/images/phones/pixel9pro.png"],
        specs: {
            display: '6.3" LTPO OLED',
            processor: "Google Tensor G4",
            camera: "50MP Main with OIS"
        },
        detailSpecs: {
            storage: "128GB storage",
            battery: "All-day Pixel battery",
            condition: "Brand new import",
            warranty: "12-month shop warranty",
            network: "Unlocked for Kenyan networks",
            highlights: ["Google AI tools", "Pro-level Pixel camera", "Bright LTPO OLED display"]
        }
    },
    {
        id: "iphone-15",
        brand: "Apple",
        model: "iPhone 15",
        price: 105000,
        description: "Dynamic Island comes to iPhone 15 with a 48MP main camera.",
        images: ["/images/phones/iphone15pro-provided.jpg"],
        specs: {
            display: '6.1" Super Retina XDR',
            processor: "A16 Bionic",
            camera: "48MP Main"
        },
        detailSpecs: {
            storage: "128GB storage",
            battery: "Up to 20 hours video playback",
            condition: "Brand new import",
            warranty: "12-month shop warranty",
            network: "Unlocked for Kenyan networks",
            highlights: ["Dynamic Island", "USB-C charging", "48MP main camera"]
        }
    },
    {
        id: "iphone-16-pro-max",
        brand: "Apple",
        model: "iPhone 16 Pro Max",
        price: 185000,
        description: "The largest and most powerful iPhone ever with the best battery life.",
        images: ["/images/phones/iphone16promax.png"],
        specs: {
            display: '6.9" Super Retina XDR',
            processor: "A18 Pro",
            camera: "48MP Fusion Camera"
        },
        detailSpecs: {
            storage: "256GB storage",
            battery: "Up to 33 hours video playback",
            condition: "Brand new import",
            warranty: "12-month shop warranty",
            network: "Unlocked for Kenyan networks",
            highlights: ["Largest iPhone display", "A18 Pro performance", "Best iPhone battery life"]
        }
    },
    {
        id: "samsung-z-fold-6",
        brand: "Samsung",
        model: "Galaxy Z Fold 6",
        price: 210000,
        description: "The ultimate foldable for productivity and immersive entertainment.",
        images: ["/images/phones/zfold6.png"],
        specs: {
            display: '7.6" Dynamic AMOLED 2X',
            processor: "Snapdragon 8 Gen 3",
            camera: "50MP Wide-angle"
        },
        detailSpecs: {
            storage: "256GB storage",
            battery: "4,400mAh dual battery",
            condition: "Brand new import",
            warranty: "12-month shop warranty",
            network: "Unlocked for Kenyan networks",
            highlights: ["Foldable main display", "Productivity multitasking", "Galaxy AI ready"]
        }
    },
    {
        id: "iphone-14",
        brand: "Apple",
        model: "iPhone 14",
        price: 85000,
        description: "Reliable performance and a dual-camera system that takes stunning photos.",
        images: ["/images/phones/iphone14-1.jpg", "/images/phones/iphone14-2.jpg"],
        specs: {
            display: '6.1" Super Retina XDR',
            processor: "A15 Bionic",
            camera: "12MP Main"
        },
        detailSpecs: {
            storage: "128GB storage",
            battery: "Up to 20 hours video playback",
            condition: "Clean import",
            warranty: "6-month shop warranty",
            network: "Unlocked for Kenyan networks",
            highlights: ["Reliable A15 performance", "Dual-camera system", "Crash Detection support"]
        }
    },
    {
        id: "google-pixel-8a",
        brand: "Google",
        model: "Pixel 8a",
        price: 65000,
        description: "The best of Google AI at a more accessible price point.",
        images: ["/images/phones/pixel8a-1.jpg", "/images/phones/pixel8a-2.jpg"],
        specs: {
            display: '6.1" Actua Display',
            processor: "Google Tensor G3",
            camera: "64MP Wide"
        },
        detailSpecs: {
            storage: "128GB storage",
            battery: "All-day adaptive battery",
            condition: "Brand new import",
            warranty: "12-month shop warranty",
            network: "Unlocked for Kenyan networks",
            highlights: ["Google AI at a better price", "64MP camera", "Compact Pixel design"]
        }
    }
];

