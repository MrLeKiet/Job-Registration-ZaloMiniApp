import React from "react";

const ProfileDetails: React.FC<any> = ({ profile }) => {
    if (!profile) return null;
    return (
        <div className="mt-4 bg-white rounded-lg p-4 shadow space-y-2">
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">Số điện thoại</div>
                <div className="text-sm font-medium">{profile.phone || "-"}</div>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">Email</div>
                <div className="text-sm font-medium">{profile.email || "-"}</div>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">Địa chỉ</div>
                <div className="text-sm font-medium">{profile.address || "-"}</div>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">Nghề nghiệp</div>
                <div className="text-sm font-medium">{profile.job || "-"}</div>
            </div>
        </div>
    );
};

export default ProfileDetails;
