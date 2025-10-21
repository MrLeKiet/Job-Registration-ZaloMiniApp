import React from "react";

const ProfileHeader: React.FC<{ name?: string; avatar?: string }> = ({ name, avatar }) => {
    return (
        <div className="pb-3" style={{ background: "#1565C0"}}>
            <div className="px-4 pt-4 pb-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center overflow-hidden">
                            {avatar ? (
                                <img src={avatar} alt="avatar" className="w-full h-full object-cover rounded-full" />
                            ) : (
                                <span className="text-lg font-semibold text-white">{(name || "").charAt(0).toUpperCase()}</span>
                            )}
                        </div>
                        <div className="ml-3 text-white">
                            <div className="text-sm">Xin chào,</div>
                            <div className="text-lg font-semibold">{name || "Guest"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
