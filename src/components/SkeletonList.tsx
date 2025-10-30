import React from "react";
import Skeleton from "./Skeleton";

interface SkeletonListProps {
    count?: number;
    renderSkeleton?: () => React.ReactNode;
    className?: string;
}

const SkeletonList: React.FC<SkeletonListProps> = ({ count = 1, renderSkeleton, className = "" }) => {
    if (count <= 1) {
        return (
            <div className={className}>
                {renderSkeleton ? renderSkeleton() : <Skeleton />}
            </div>
        );
    }
    return (
        <div className={className}>
            {Array.from({ length: count }).map((_, i) => (
                <React.Fragment key={i}>
                    {renderSkeleton ? renderSkeleton() : <Skeleton />}
                </React.Fragment>
            ))}
        </div>
    );
};

export default SkeletonList;
