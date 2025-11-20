import { Briefcase } from "lucide-react";
import React from "react";

interface CardListProps<T> {
  readonly items: T[];
  readonly renderItem: (item: T, index: number) => React.ReactNode;
  readonly emptyMessage?: string;
  readonly className?: string;
}

function CardList<T>({ items, renderItem, emptyMessage = "Không có dữ liệu.", className = "" }: CardListProps<T>) {
  if (!items || items.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-6 px-4 text-center select-none ${className}`}>
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Briefcase className="w-10 h-10 text-gray-400" />
        </div>

        <p className="text-lg font-medium text-gray-700 mb-1">
          {emptyMessage}
        </p>
        <p className="text-sm text-gray-500">
          Hãy thử tìm kiếm hoặc quay lại sau
        </p>
      </div>
    );
  }
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {items.map((item, idx) => renderItem(item, idx))}
    </div>
  );
}

export default CardList;
