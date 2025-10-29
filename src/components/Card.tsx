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
    className="flex gap-3 items-center bg-white/5 rounded p-2 pl-3 w-full text-left cursor-pointer hover:bg-white/10"
    onClick={onClick}
    onKeyDown={e => {
      if (e.key === "Enter" || e.key === " ") onClick?.();
    }}
    style={{ touchAction: "manipulation" }}
  >
    <div className="w-16 h-16 rounded overflow-hidden flex items-center justify-center">
      {thumbnail ? (
        <img
          src={thumbnail}
          alt="Thumbnail"
          className="w-full h-full object-cover"
          onError={e => {
            (e.target as HTMLImageElement).src = noImage;
          }}
        />
      ) : (
        <img
          src={import.meta.env.VITE_PLACEHOLDER_IMG || noImage}
          alt="Missing"
          className="w-full h-full object-cover opacity-60"
        />
      )}
    </div>
    <div className="flex-1 min-w-0 gap-2">
      {children}
    </div>
  </button>
);

export default Card;
