import React from "react";
import { useAboutUs } from "./useAboutUs";


function decodeHtml(html: string) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function decodeHtmlTwice(html: string) {
    return decodeHtml(decodeHtml(html));
}

const AboutUsPage: React.FC = () => {
    const { info, loading, error } = useAboutUs();

    if (loading) {
        return <div className="p-4">Đang tải...</div>;
    }
    if (error) {
        // react-query error can be unknown, so cast to any for message
        const errorMessage = typeof error === "string" ? error : (error as any)?.message || "Có lỗi xảy ra.";
        return <div className="p-4 text-red-500">{errorMessage}</div>;
    }
    if (!info) {
        return <div className="p-4">Không có nội dung giới thiệu.</div>;
    }
    return (
        <div className="p-4">
            <div className="aboutus-content text-base" dangerouslySetInnerHTML={{ __html: decodeHtmlTwice(info.description) }} />
            <style>{`
                .aboutus-content {
                    font-family: 'Times New Roman', Times, serif;
                }
                .aboutus-content img {
                    max-width: 100%;
                    height: auto;
                    display: block;
                    margin: 0 auto;
                }
            `}</style>
        </div>
    );
};

export default AboutUsPage;
