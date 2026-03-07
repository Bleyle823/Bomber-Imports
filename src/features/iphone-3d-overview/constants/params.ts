import {
  IphoneColorType,
  IphoneModelType,
  IphoneSizeType,
} from "../types/params.types";

export const iphoneSizes: IphoneSizeType[] = [
  { label: '6.1"', value: "small" },
  { label: '6.7"', value: "large" },
];

export const iphoneModels: IphoneModelType[] = [
  {
    id: 1,
    title: "iPhone 16 Pro in Natural Titanium",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    material: "/models/materials/yellow.jpg",
    modelPath: "/models/scene.glb",
  },
  {
    id: 2,
    title: "Elite Android Flagship",
    color: ["#2B2B2B", "#3b3b3b", "#181819"],
    material: "/models/materials/black.jpg",
    modelPath: "/models/samsung_s22_ultra.glb",
  },
  {
    id: 3,
    title: "Pro Photography Edition",
    color: ["#E3E1DE", "#ffffff", "#C9C8C2"],
    material: "/models/materials/white.jpg",
    modelPath: "/models/google_pixel_6_pro.glb",
  },
  {
    id: 4,
    title: "Performance Plus Model",
    color: ["#53596E", "#6395ff", "#21242e"],
    material: "/models/materials/blue.jpg",
    modelPath: "/models/samsung_galaxy_s21_ultra.glb",
  },
  {
    id: 5,
    title: "iPhone 17 Pro Max (Concept)",
    color: ["#454749", "#3b3b3b", "#181819"],
    material: "/models/materials/black.jpg",
    modelPath: "/models/iphone_17_pro_max.glb",
  },
];

export const iphoneColors: IphoneColorType[] = [
  {
    id: 1,
    title: "iPhone 16 Pro Models",
    imageSrc: "/images/iphone-all-colors.webp",
    color: ["#8F8A81", "#53596E", "#C9C8C2", "#454749"],
  },
  {
    id: 2,
    title: "Samsung Galaxy S22 Ultra",
    imageSrc: "/images/explore-1.webp",
    color: "#2B2B2B",
  },
  {
    id: 3,
    title: "Google Pixel 6 Pro",
    imageSrc: "/images/explore-2.webp",
    color: "#E3E1DE",
  },
  {
    id: 4,
    title: "Samsung Galaxy S21 Ultra",
    imageSrc: "/images/explore-1.webp",
    color: "#53596E",
  },
  {
    id: 5,
    title: "iPhone Natural Titanium",
    imageSrc: "/images/iphone-natural-titanium.webp",
    color: "#8F8A81",
  },
];
