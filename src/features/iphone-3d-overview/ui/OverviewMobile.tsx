import { type FC, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";

import { iphoneColors } from "../constants/params";
import { IphoneColorType } from "../types/params.types";

const OverviewMobile: FC = () => {
  const [index, setIndex] = useState(0);
  const currentColor = iphoneColors[index];

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % iphoneColors.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + iphoneColors.length) % iphoneColors.length);
  };

  return (
    <div className="my-10 flex flex-col items-center">
      <div className="relative w-full h-80 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              src={currentColor.imageSrc}
              alt={currentColor.title}
              width={1094}
              height={936}
              className="h-full w-full object-contain"
            />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevSlide}
          className="absolute left-2 z-10 p-2 bg-black/20 rounded-full text-white"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 z-10 p-2 bg-black/20 rounded-full text-white"
        >
          →
        </button>
      </div>

      <h4 className="mt-4 h-12 text-center font-semibold text-zinc-400 px-4">
        {currentColor.title}
      </h4>

      <ul className="mt-4 flex items-center gap-4 rounded-full bg-zinc-900 p-4 overflow-x-auto max-w-full no-scrollbar">
        {iphoneColors.map((item, i) => (
          <li className="flex size-6 items-center justify-center flex-shrink-0" key={item.id}>
            <button
              className={classNames(
                {
                  "border-blue-600 border-4": i === index,
                },
                "mx-2 w-full h-full cursor-pointer rounded-full transition-all",
              )}
              style={{
                background: Array.isArray(item.color)
                  ? `linear-gradient(90deg, ${item.color[0]} 0%, ${item.color[1]} 30%, ${item.color[2]} 65%, ${item.color[3]} 100%)`
                  : item.color,
              }}
              onClick={() => setIndex(i)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OverviewMobile;
