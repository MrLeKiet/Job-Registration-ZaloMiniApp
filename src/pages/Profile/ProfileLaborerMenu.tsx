import { ClipboardList, Building2, Camera, MapPin, Phone, Mail, Globe, Users, Edit3 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "zmp-ui";
import { getProfileWithToken } from "./api";

const ProfileLaborerMenu: React.FC<{ accessToken: string }> = ({ accessToken }) => {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await getProfileWithToken(accessToken);
                const data = res?.Data || {};
                setProfile(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [accessToken]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-blue-50 to-white">
            <div className="relative pt-8 pb-12 px-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-b-3xl shadow-lg">
                <div className="flex flex-col items-center text-white">
                    <div className="relative mb-4">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                            <img
                                src={"https://ttld.sweetsoft.vn/ImageHandler.aspx?id=fc6d0935-3e70-4d39-b295-3c23f552e86d&t=StaffImage&def=/Images/img/no_avatar.jpg&cache=1&quality=100"}
                                alt="Ảnh đại diện"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button className="absolute bottom-1 right-1 bg-white text-blue-600 rounded-full p-2 shadow-lg hover:scale-110 transition-transform">
                            <Camera size={18} />
                        </button>
                    </div>

                    <h1 className="text-2xl font-bold mt-3">{profile?.fullname}</h1>
                    {(() => {
                        if (profile?.isactive === false) {
                            return <div className="mt-2 py-2 px-3 bg-amber-200 rounded-full font-semibold">
                                <div className="text-yellow-700">Chờ xét duyệt</div></div>;
                        } else if (profile?.isactive === true) {
                            return <div className="mt-2 py-2 px-3 bg-green-200 rounded-full font-semibold">
                                <div className="text-green-700">Xác thực</div></div>;
                        } else {
                            return null;
                        }
                    })()}
                </div>
            </div>

            <div className="px-6 -mt-8 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
                    <div className="space-y-4">
                        {profile?.address && (
                            <div className="flex items-start gap-3">
                                <MapPin size={20} className="text-gray-500 mt-0.5" />
                                <div className="flex gap-1">
                                    <p className="text-sm text-gray-600">Địa chỉ: </p>
                                    <p className="font-medium">{profile.address}</p>
                                </div>
                            </div>
                        )}
                        {profile?.email && (
                            <div className="flex items-center gap-3">
                                <Mail size={20} className="text-gray-500" />
                                <span className="font-medium text-blue-600">{profile.email}</span>
                            </div>
                        )}
                        {profile?.phone && (
                            <div className="flex items-center gap-3">
                                <Phone size={20} className="text-gray-500" />
                                <span className="font-medium">{profile.phone}</span>
                            </div>
                        )}
                        {profile?.website && (
                            <div className="flex items-center gap-3">
                                <Globe size={20} className="text-gray-500" />
                                <a href={profile.website} className="text-blue-600 underline font-medium">
                                    {profile.website.replace(/^https?:\/\//, '')}
                                </a>
                            </div>
                        )}
                        {profile?.isactive === false && (
                            <div className="text-xs text-yellow-600 mt-1">Liên hệ với ***@gmail.com để xác thực tài khoản</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="px-6 mt-8 pb-10">
                <div className="grid grid-cols-1 gap-4">
                    <button
                        onClick={() => navigate("/laborer-updateprofile")}
                        className="bg-white rounded-2xl shadow-lg p-4 flex items-center justify-between hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Edit3 size={28} className="text-blue-600" />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-lg text-gray-800">Cập nhật hồ sơ</p>
                                <p className="text-sm text-gray-500">Chỉnh sửa thông tin, logo, giới thiệu bản thân</p>
                            </div>
                        </div>
                        <div className="text-blue-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate("/laborer-joblist")}
                        className="bg-white rounded-2xl shadow-lg p-4 flex items-center justify-between hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                                <ClipboardList size={28} className="text-green-600" />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-lg text-gray-800">Danh sách việc tuyển dụng</p>
                                <p className="text-sm text-gray-500">Quản lý việc đang xin tuyển</p>
                            </div>
                        </div>
                        <div className="text-green-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </button>

                    {/* <button
                        onClick={() => navigate("/RecruitmentPost")}
                        className="rounded-2xl shadow-lg p-4 flex items-center justify-between hover:shadow-2xl transition-all hover:scale-105"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-orange-400 bg-opacity-20 rounded-xl flex items-center justify-center">
                                <Building2 size={28} className="text-orange-600" />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-lg">Đăng tin tuyển dụng mới</p>
                            </div>
                        </div>
                        <div className="bg-opacity-20 rounded-full p-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default ProfileLaborerMenu;