import React from "react";

interface SectionHeaderProps {
  title: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  buttonText,
  onButtonClick,
  className = "",
}) => (
  <div className={`flex items-center justify-between mb-1 ${className}`}>
    <div className="font-lg font-bold text-primary truncate">{title}</div>
    {buttonText && onButtonClick && (
      <button
        className="text-xs px-3 py-1 font-semibold text-primary whitespace-nowrap"
        onClick={onButtonClick}
      >
        {buttonText}
      </button>
    )}
  </div>
);

export default SectionHeader;
