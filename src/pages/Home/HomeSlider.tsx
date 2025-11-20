import Skeleton from "@/components/Skeleton";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "zmp-ui";
import { useHotNews } from "./useHome";

interface SliderImage {
    thumbnail: string;
    id: string;
}


const HomeSlider: React.FC = () => {
    // Touch/swipe gesture handlers
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        touchEndX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = () => {
        if (touchStartX.current !== null && touchEndX.current !== null) {
            const distance = touchStartX.current - touchEndX.current;
            if (Math.abs(distance) > 40) {
                if (distance > 0) {
                    // Swipe left, next
                    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
                } else {
                    // Swipe right, previous
                    setCurrentIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
                }
                resetSliderInterval(10000);
            }
        }
        touchStartX.current = null;
        touchEndX.current = null;
    };
    // Helper to reset auto-slide interval with custom delay
    const resetSliderInterval = (delay: number = 3000) => {
        if (sliderInterval.current) {
            globalThis.clearInterval(sliderInterval.current);
            sliderInterval.current = null;
        }
        if (sliderImages.length > 1) {
            sliderInterval.current = globalThis.setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
            }, delay);
        }
    };
    const navigate = useNavigate();
    const [sliderImages, setSliderImages] = useState<SliderImage[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const sliderInterval = useRef<number | null>(null);

    const { news, loading, error } = useHotNews();

    // Memoize the images array to prevent unnecessary reference changes
    const images = useMemo(() => {
        if (news.length === 0) return [];
        return news.map((item) => ({ thumbnail: item.thumbnail, id: item.id }));
    }, [news]);

    // Update slider images only if images content changes
    useEffect(() => {
        setSliderImages((prev) => {
            const prevIds = prev.map((img) => img.id).join(",");
            const newIds = images.map((img) => img.id).join(",");
            if (prevIds === newIds) return prev; // Avoid re-render if IDs are the same
            return images;
        });
    }, [images]);

    // Auto-slide effect
    useEffect(() => {
        if (sliderImages.length <= 1) return;
        resetSliderInterval(3000);
        return () => {
            if (sliderInterval.current) {
                globalThis.clearInterval(sliderInterval.current);
                sliderInterval.current = null;
            }
        };
    }, [sliderImages.length]);

    // Loading / error states (must be after all hooks)
    if (loading) {
        return (
            <div className="w-full h-40 flex items-center justify-center">
                <Skeleton className="w-full h-40" />
            </div>
        );
    }

    // Swipe handlers

    // Loading / error states
    if (loading) {
        return <div className="w-full h-48 flex items-center justify-center">Đang tải slider...</div>;
    }

    if (error) {
        let message = "";
        if (typeof error === "string") message = error;
        else if (error instanceof Error) message = error.message;
        else message = "Lỗi không xác định.";
        return <div className="w-full h-48 flex items-center justify-center text-red-500">Lỗi khi tải slider: {message}</div>;
    }

    if (sliderImages.length === 0) return null;

    return (
        <div className="w-full flex justify-center items-center px-4 border-gray-100 mb-2">
            <div
                className="relative w-full h-48 overflow-hidden "
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Swipeable slider images */}
                {sliderImages.map((img, idx) => (
                    <button
                        key={img.id}
                        type="button"
                        tabIndex={0}
                        aria-label={`Xem chi tiết tin hot ${idx + 1}`}
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "100%",
                            height: "100%",
                            background: "none",
                            border: "none",
                            padding: 0,
                            cursor: idx === currentIndex ? "pointer" : "default",
                            opacity: idx === currentIndex ? 1 : 0,
                            zIndex: idx === currentIndex ? 10 : 0,
                            transition: "opacity 0.7s",
                        }}
                        onClick={() => navigate(`/news/${img.id}`)}
                        onKeyDown={e => {
                            if (e.key === "Enter" || e.key === " ") {
                                navigate(`/news/${img.id}`);
                            }
                        }}
                        disabled={idx !== currentIndex}
                    >
                        <img
                            src={img.thumbnail}
                            alt={`Hot News ${idx}`}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "8px",
                                pointerEvents: idx === currentIndex ? "auto" : "none",
                            }}
                        />
                    </button>
                ))}

                {/* Slider indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {sliderImages.map((img, idx) => (
                        <span
                            key={img.id}
                            className={`transition-all duration-300 w-2.5 h-2.5 border border-white ${idx === currentIndex ? "bg-blue-500 rounded-full opacity-100 scale-105" : "bg-gray-300 rounded-full opacity-60 scale-90"}`}
                            style={{ opacity: idx === currentIndex ? 1 : 0.6, borderRadius: '0.15rem' }}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeSlider;