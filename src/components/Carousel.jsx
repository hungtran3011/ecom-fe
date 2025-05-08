import React, { useState } from "react";
import { cn } from "../libs/utils";
import useWindowWidth from "../hooks/useWindowWidth";

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const windowWidth = useWindowWidth();

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="overflow-hidden relative bg-white">
                <div
                    className={cn("flex items-center transition-transform duration-500")}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="w-full flex-shrink-0"
                        >
                            <img
                                src={image}
                                alt={`Slide ${index}`}
                                className="w-full h-auto object-cover "
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button
                className={cn("absolute top-1/2 transform -translate-y-1/2 text-[var(--md-sys-color-surface)] flex px-2 py-2 rounded-full hover:bg-[var(--md-sys-color-surface-bright)] hover:text-[var(--md-sys-color-on-surface)]", 
                    windowWidth < 936 ? "left-2 bg-[var(--md-sys-layers-surface-opacity-016)]" : "-left-5 bg-[var(--md-sys-color-surface-bright)] text-[var(--md-sys-color-on-surface)]"
                )}
                onClick={goToPrevious}
            >
                <span className="mdi">chevron_left</span>
            </button>
            <button
                className={cn("absolute top-1/2 transform -translate-y-1/2 text-[var(--md-sys-color-background)] flex px-2 py-2 rounded-full hover:bg-[var(--md-sys-color-surface-bright)] hover:text-[var(--md-sys-color-on-surface)]", 
                    windowWidth < 936 ? "right-2 bg-[var(--md-sys-layers-surface-opacity-016)]" : "-right-5 bg-[var(--md-sys-color-surface-bright)] text-[var(--md-sys-color-on-surface)]"
                )}
                onClick={goToNext}
            >
                <span className="mdi">chevron_right</span>
            </button>
            <div className="flex justify-center mt-4 space-x-2">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`w-3 h-3 rounded-full cursor-pointer ${
                            index === currentIndex
                                ? "bg-[var(--md-sys-color-primary)]"
                                : "bg-[var(--md-sys-color-surface-bright)]"
                        }`}
                        onClick={() => goToSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Carousel;