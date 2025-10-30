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
      <div className={`text-center text-muted py-8 select-none font-lg ${className}`}>
        {emptyMessage}
      </div>
    );
  }
  return (
    <div className={`flex flex-col gap-2 mb-2 ${className}`}>
      {items.map((item, idx) => renderItem(item, idx))}
    </div>
  );
}

export default CardList;
