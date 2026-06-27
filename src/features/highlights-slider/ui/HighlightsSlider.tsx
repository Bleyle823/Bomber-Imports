import { type FC, useContext } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Slide from "./Slide";
import ControlPanel from "./ControlPanel";
import { HighlightsSliderContext } from "../context";
import type { HighlightSlide } from "@/lib/data/types";

const HighlightsSlider: FC<{ slides: HighlightSlide[] }> = ({ slides }) => {
    const { setActiveSlide, activeSlide, videoState } = useContext(HighlightsSliderContext);

    return (
        <motion.div
            initial={{ opacity: 0, translateY: 100 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 1 }}
        >
            <Swiper
                slidesPerView={1}
                spaceBetween={120}
                className="my-10 h-[40dvh] md:h-[60dvh] xl:h-[80dvh]"
                style={{ overflow: "visible" }}
                onSlideChange={({ activeIndex }) => setActiveSlide(activeIndex)}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={`${slide.videoSrc}-${index}`} className="relative p-4 md:p-10">
                        <Slide
                            videoPaused={activeSlide !== index || videoState === "paused"}
                            videoPlaying={activeSlide === index && videoState === "playing"}
                            videoSrc={slide.videoSrc}
                        >
                            {slide.title}
                        </Slide>
                    </SwiperSlide>
                ))}
                <ControlPanel slideCount={slides.length} />
            </Swiper>
        </motion.div>
    );
};

export default HighlightsSlider;
