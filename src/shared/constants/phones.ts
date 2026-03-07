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
        }
    }
];

