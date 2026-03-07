import { type FC, type RefObject, Suspense, useRef, useState } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";
import { Canvas } from "@react-three/fiber";

import ModelView from "./ModelView";
import Fallback from "./Fallback";
import { iphoneModels, iphoneSizes } from "../constants/params";

const OverviewDesktop: FC = () => {
  const [size, setSize] = useState<"small" | "large">("small");

  const cameraControlSmall = useRef<RefObject<any>>(null);
  const cameraControlLarge = useRef<RefObject<any>>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const model = iphoneModels[currentIndex];

  const nextModel = () => {
    setCurrentIndex((prev) => (prev + 1) % iphoneModels.length);
  };

  const prevModel = () => {
    setCurrentIndex((prev) => (prev - 1 + iphoneModels.length) % iphoneModels.length);
  };

  return (
    <div className="relative group">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[75vh] w-full overflow-hidden md:h-[90vh]"
      >
        <button
          onClick={prevModel}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md hover:bg-white/20 p-5 rounded-full text-white transition-all opacity-0 group-hover:opacity-100 border border-white/10"
          aria-label="Previous model"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button
          onClick={nextModel}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md hover:bg-white/20 p-5 rounded-full text-white transition-all opacity-0 group-hover:opacity-100 border border-white/10"
          aria-label="Next model"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
        </button>

        <Suspense fallback={<Fallback />}>
          <div
            className={classNames(
              {
                "right-[100%]": size === "large",
                "right-0": size === "small",
              },
              "absolute size-full top-0 transition-all duration-1000",
            )}
          >
            <Canvas
              key={`small-${currentIndex}`}
              camera={{
                fov: 90,
                position: [0, 0, 3],
              }}
            >
              <ModelView
                index={1}
                controlRef={cameraControlSmall}
                model={model}
              />
            </Canvas>
          </div>
        </Suspense>
        <Suspense fallback={null}>
          <div
            className={classNames(
              {
                "right-[-100%]": size === "small",
                "right-0": size === "large",
              },
              "absolute size-full top-0 transition-all duration-1000",
            )}
          >
            <Canvas
              key={`large-${currentIndex}`}
              camera={{
                fov: 90,
                position: [0, 0, 3],
              }}
            >
              <ModelView
                index={2}
                controlRef={cameraControlLarge}
                model={model}
              />
            </Canvas>
          </div>
        </Suspense>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, translateY: 100 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <p className="text-center text-sm font-light uppercase tracking-[0.2em] text-zinc-400">{model.title}</p>
        <div className="flex items-center justify-center gap-4">
          <ul className="flex items-center rounded-full bg-zinc-900 p-4">
            {iphoneModels.map((item, i) => (
              <li key={item.id}>
                <button
                  className={classNames(
                    {
                      "border-blue-600 border-4 scale-110": i === currentIndex,
                    },
                    "mx-2 size-6 cursor-pointer rounded-full transition-all hover:scale-125",
                  )}
                  style={{ backgroundColor: item.color[0] }}
                  onClick={() => setCurrentIndex(i)}
                />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 rounded-full bg-zinc-900 p-1">
            {iphoneSizes.map(({ label, value }) => (
              <button
                key={label}
                className={classNames(
                  {
                    "bg-blue-600": size === value,
                    "bg-transparent text-white": size !== value,
                  },
                  "flex size-10 items-center justify-center rounded-full text-sm transition-all",
                )}
                onClick={() => setSize(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OverviewDesktop;
