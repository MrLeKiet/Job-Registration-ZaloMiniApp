import noImage from "@/images/no_image.png";
import React from "react";

interface CardLayoutProps {
  thumbnail?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const Card: React.FC<CardLayoutProps> = ({ thumbnail, onClick, children }) => (
  <button
    type="button"
    className="flex w-full gap-3 p-4 items-center rounded-lg shadow border border-gray-200 bg-white text-left hover:bg-white/10 focus:outline-none"
    onClick={onClick}
    onKeyDown={e => {
      if (e.key === "Enter" || e.key === " ") onClick?.();
    }}
    style={{ touchAction: "manipulation" }}
  >
    <div className="overflow-hidden flex items-center justify-center min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px]">
      {thumbnail ? (
        <img
          src={thumbnail}
          alt="Thumbnail"
          className="rounded-md object-cover w-[80px] h-[80px]"
          style={{ aspectRatio: "1/1" }}
          onError={e => {
            (e.target as HTMLImageElement).src = noImage;
          }}
        />
      ) : (
        <img
          src={import.meta.env.VITE_PLACEHOLDER_IMG || noImage}
          alt="Missing"
          className="rounded-md object-cover w-[80px] h-[80px] opacity-60"
          style={{ aspectRatio: "1/1" }}
        />
      )}
    </div>
    <div className="flex flex-col gap-1">
      {children}
    </div>
  </button>
);

export default Card;
