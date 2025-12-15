import { Briefcase, Edit, House, User, Users } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "zmp-ui";

const NAV_ITEMS = [
    { label: "Trang chủ", icon: <House size={24} />, path: "/home" },
    { label: "Ứng viên", icon: <Users size={24} />, path: "/laborer" },
    { label: "Việc làm", icon: <Briefcase size={24} />, path: "/jobs" },
    // { label: "Đăng tuyển", icon: <Edit size={24} />, path: "/RecruitmentPost" },
    { label: "Tài khoản", icon: <User size={24} />, path: "/profile" },
];

const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname || "/home";
    // Consider job detail pages as part of 'Việc làm'
    const isJobsPage = currentPath === "/jobs";
    const isJobDetailPage = currentPath.startsWith("/jobs/");
    const isLaborerPage = currentPath === "/laborer";
    const isLaborerDetailPage = currentPath.startsWith("/laborer/");
    const isHomePage = currentPath === "/home";
    const isNewsPage = currentPath === "/news" || currentPath.startsWith("/news/") || currentPath === "/unemployment-insurance" || currentPath === "/export-labor" || currentPath === "/about";
    const isProfilePage = currentPath === "/profile" || currentPath === "/profile-register" || currentPath === "/enterprise-signup" || currentPath === "/enterprise-updateprofile" || currentPath === "/enterprise-joblist" || currentPath === "/laborer-updateprofile" || currentPath === "/laborer-joblist";
    const isProfileSubPage = currentPath.startsWith("/profile/");
    const isRecruitmentPostPage = currentPath === "/RecruitmentPost";
    const isRecruitmentPostDetailPage = currentPath.startsWith("/recruitmentForeigners/");

    return (
        <div
            className=" bg-white shadow border-t"
            style={{ paddingBottom: 'var(--safe-bottom)', paddingTop: '10px' }}
        >
            <div className="max-w-screen-xl mx-auto flex justify-around items-center h-12 xs:h-14 sm:h-16 px-1 xs:px-2 sm:px-4">
                {NAV_ITEMS.map((item) => {
                    let isActive = false;
                    if (
                        (item.path === "/home" && (isHomePage || isNewsPage || !currentPath || currentPath === "/")) ||
                        (item.path === "/jobs" && (isJobsPage || isJobDetailPage)) ||
                        (item.path === "/laborer" && (isLaborerPage || isLaborerDetailPage)) ||
                        (item.path === "/profile" && (isProfilePage || isProfileSubPage)) ||
                        (item.path === "/RecruitmentPost" && (isRecruitmentPostPage || isRecruitmentPostDetailPage))
                    ) {
                        isActive = true;
                    }
                    return (
                        <button
                            key={item.path}
                            onClick={() => {
                                if (item.path === "/home") {
                                    if (!isHomePage) navigate("/home");
                                } else if (item.path === "/jobs") {
                                    if (!isJobsPage) navigate("/jobs");
                                } else if (item.path === "/laborer") {
                                    if (!isLaborerPage) navigate("/laborer");
                                }
                                if (
                                    item.path !== "/home" &&
                                    item.path !== "/jobs" &&
                                    item.path !== "/laborer" &&
                                    currentPath !== item.path
                                ) {
                                    navigate(item.path);
                                }
                            }}
                            className="flex flex-col items-center justify-center flex-1 sm:flex-none sm:px-2 h-full focus:outline-none relative"
                        >
                            <span
                                className={`${isActive ? "text-blue-600" : "text-gray-400"} text-lg xs:text-xl sm:text-2xl`}
                            >
                                {item.icon}
                            </span>
                            <span
                                className={`mt-0.5 xs:mt-1 text-[9px] xs:text-[10px] sm:text-xs ${isActive ? "text-blue-600 font-semibold" : "text-gray-500"
                                    }`}
                            >
                                {item.label}
                            </span>
                            {isActive && <span className="w-5 xs:w-6 sm:w-8 h-0.5 xs:h-1 mt-0.5 xs:mt-1 bg-blue-600 rounded-t"></span>}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Navbar;