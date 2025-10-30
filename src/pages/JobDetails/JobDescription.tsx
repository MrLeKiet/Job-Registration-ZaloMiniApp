import Skeleton from "@/components/Skeleton";
import { FileText, Heart } from "lucide-react";
import React from "react";
import { useJobDetail } from "./useJobDetails";

function decodeHtml(html: string) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function decodeAndFixImages(html: string) {
    const decoded = decodeHtml(html);
    const imageBaseUrl = import.meta.env.VITE_API_IMAGE_URL;
    return decoded.replaceAll(
        'src="/FileStorage',
        `src="${imageBaseUrl}`
    );
}

const JobDescription: React.FC = () => {
    const { job, loading, error } = useJobDetail();

    if (loading) return (
        <div className="border rounded-xl p-4 shadow-sm bg-white">
            <Skeleton className="h-6 w-1/2 mb-3" />
            <Skeleton className="h-4 w-3/4 mb-2" />
        </div>
    );
    if (error || !job) return <div>Error loading job details.</div>;
    return (
        <aside id="job-description" className="rounded-md p-4 shadow-sm bg-white mb-4">
            <h2 className="font-bold text-gray-800 text-lg mb-3">MÔ TẢ CÔNG VIỆC</h2>
            <ul className="text-base text-gray-700 space-y-2 mb-6">
                <InfoItem icon={<FileText />} label="Mô tả" dangerouslySetInnerHTML={{ __html: decodeAndFixImages(job.summary || "Chưa có mô tả.") }} />
            </ul>
            <h2 className="font-bold text-gray-800 text-lg mb-3">YÊU CẦU CÔNG VIỆC</h2>
            <ul className="text-base text-gray-700 space-y-2 mb-6">
                <InfoItem icon={<FileText />} label="Yêu cầu" value={job.jobrequirements || "Chưa có yêu cầu."} />
            </ul>
            <h2 className="font-bold text-gray-800 text-lg mb-3">CHẾ ĐỘ PHÚC LỢI</h2>
            <ul className="text-base text-gray-700 space-y-2">
                <InfoItem icon={<Heart />} label="Phúc lợi" value={job.benefits || "Chưa có thông tin."} />
            </ul>
        </aside>
    );
};

interface InfoItemProps {
    icon: React.ReactNode;
    label: string;
    value?: string;
    dangerouslySetInnerHTML?: { __html: string };
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, dangerouslySetInnerHTML }) => (
    <li className="flex items-start gap-2">
        <div className="text-blue-500 mt-0.5">{icon}</div>
        <div>
            <span className="font-bold text-gray-800">{label}: </span>
            {dangerouslySetInnerHTML ? (
                <span dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
            ) : (
                <span>{value}</span>
            )}
        </div>
    </li>
);

export default JobDescription;
