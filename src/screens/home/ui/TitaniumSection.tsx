"use client";
import { type FC, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { useIntersection } from "@/shared/hooks/useIntersection";

const MotionImage = motion(Image);

const TitaniumSection: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isIntersecting } = useIntersection(sectionRef);

  useEffect(() => {
    if (videoRef.current && isIntersecting) {
      videoRef.current.currentTime = 0;
    }
  }, [isIntersecting]);

  return (
    <section ref={sectionRef} className="bg-zinc-900 py-20">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, translateX: -100 }}
          whileInView={{ opacity: 1, translateX: 0 }}
          transition={{
            duration: 1,
          }}
          className="text-2xl font-semibold text-zinc-400 lg:text-6xl"
        >
          Case study iPhone 15
        </motion.h2>
        <div className="mt-10 grid grid-cols-2 gap-4 md:gap-10 lg:mt-20">
          <motion.h3
            initial={{ opacity: 0, translateY: 100 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{
              duration: 1,
            }}
            className="col-span-2 text-xl lg:p-20 lg:text-6xl"
          >
            iPhone 15 Pro. <br /> Our Imports Standard.
          </motion.h3>
          <video
            ref={videoRef}
            className="z-10 col-span-2"
            autoPlay
            muted
            playsInline
          >
            <source src="/videos/explore.mp4" type="video/mp4" />
          </video>
          <motion.div className="h-40 overflow-hidden bg-black md:h-96">
            <MotionImage
              initial={{ scale: 1.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1,
              }}
              src="/images/explore-1.webp"
              alt="Camera Photo"
              className="size-full object-cover"
              width={964}
              height={1028}
            />
          </motion.div>
          <div className="h-40 overflow-hidden bg-black md:h-96">
            <MotionImage
              initial={{ scale: 1.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1,
              }}
              src="/images/explore-2.webp"
              alt="Material Photo"
              className="size-full object-cover"
              width={1028}
              height={684}
            />
          </div>
          <motion.p
            initial={{ opacity: 0, translateY: 100 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{
              duration: 1,
            }}
            className="col-span-2 text-base font-semibold text-zinc-400 md:text-xl lg:px-20 xl:col-span-1"
          >
            At <span className="text-white">Bomber Imports</span>, we specialize in bringing premium devices like the iPhone 15 Pro to the Kenyan market.
            Our mission is to provide the highest quality tech with full transparency and verified authenticity.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, translateY: 100 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{
              duration: 1,
            }}
            className="col-span-2 text-base font-semibold text-zinc-400 md:text-xl lg:px-20 xl:col-span-1"
          >
            By optimizing our supply chain, we offer the <span className="text-white">best value in Kenya</span>.
            Every iPhone 15 Pro undergoes a rigorous inspection to ensure it meets our standard before it reaches your hands.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default TitaniumSection;
