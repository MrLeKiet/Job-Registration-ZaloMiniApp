import React from "react";

interface NewsCardProps {
    id: string;
    title: string;
    thumbnail?: string;
    publishdate?: string;
    onClick: (id: string) => void;
}

function formatDate(dateStr: string) {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
        return `${parts[0]}/${parts[1]}/${parts[2]}`;
    }
    return dateStr;
}

const NewsCard: React.FC<NewsCardProps> = ({ id, title, thumbnail, publishdate, onClick }) => (
    <button
        className="rounded border-2 shadow p-2 flex flex-col cursor-pointer hover:bg-white/10 text-left focus:outline-none"
        onClick={() => onClick(id)}
        tabIndex={0}
        aria-label={title}
    >
        <div className="relative">
            {thumbnail && (
                <img src={thumbnail} alt={title} className="w-full h-32 object-cover rounded" />
            )}
            <span className="absolute top-2 left-2 bg-[#E53935] text-white text-xs px-2 py-1 rounded">Tin tức</span>
        </div>
        <div className="text-xs text-gray-500 mt-2">{publishdate ? formatDate(publishdate) : ""}</div>
        <div className="font-semibold mt-1" style={{ wordBreak: 'break-word' }}>{title}</div>
    </button>
);

export default NewsCard;
