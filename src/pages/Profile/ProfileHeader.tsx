
import React, { useRef, useState } from "react";

interface ProfileHeaderProps {
    name?: string;
    avatar?: string;
    signInStatus?: "idle" | "success" | "fail";
    onAvatarChange?: (file: File) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, avatar, signInStatus, onAvatarChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    // If not signed in, always show blank image and 'Guest'
    const isSignedIn = signInStatus === "success";
    const [preview, setPreview] = useState<string | undefined>(isSignedIn ? avatar : undefined);

    React.useEffect(() => {
        if (!isSignedIn) {
            setPreview(undefined);
        } else {
            setPreview(avatar);
        }
    }, [isSignedIn, avatar]);

    const handleAvatarClick = () => {
        if (isSignedIn && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
            if (onAvatarChange) onAvatarChange(file);
        }
    };

    return (
        <div className="pb-3" style={{ background: "#1565C0" }}>
            <div className="px-4 pt-4 pb-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-center">
                        <div
                            className={`w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center overflow-hidden cursor-pointer ${isSignedIn ? "hover:ring-2 hover:ring-blue-300" : ""}`}
                            onClick={handleAvatarClick}
                            title={isSignedIn ? "Đổi ảnh đại diện" : undefined}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (isSignedIn && (e.key === "Enter" || e.key === " ")) {
                                    e.preventDefault();
                                    handleAvatarClick();
                                }
                            }}
                        >
                            {isSignedIn && preview ? (
                                <img src={preview} alt="avatar" className="w-full h-full object-cover rounded-full" />
                            ) : (
                                <span className="text-lg font-semibold text-white">G</span>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="ml-3 text-white">
                            <div className="text-sm">Xin chào,</div>
                            <div className="text-lg font-semibold">{isSignedIn && name ? name : "Guest"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;