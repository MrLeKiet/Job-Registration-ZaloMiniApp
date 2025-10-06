import { Briefcase, Edit, Newspaper, User } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "zmp-ui";

const NAV_ITEMS = [
    { label: "Tìm việc", icon: <Briefcase size={24} />, path: "/home" },
    { label: "Đăng tuyển", icon: <Edit size={24} />, path: "/jobs" },
    { label: "Tin tức", icon: <Newspaper size={24} />, path: "/news" },
    { label: "Tài khoản", icon: <User size={24} />, path: "/profile" },
];

const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname || "/home";

    const navRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        if (navRef.current) {
            const height = navRef.current.offsetHeight;
            document.documentElement.style.setProperty('--navbar-height', height + 'px');
        }
    });
    return (
        <div
            className="fixed bottom-0 left-0 right-0 bg-white shadow border-t"
            style={{ paddingBottom: 'var(--safe-bottom)', paddingTop: '10px' }}
        >
            <div ref={navRef} className="max-w-screen-xl mx-auto flex justify-around items-center h-12 xs:h-14 sm:h-16 px-1 xs:px-2 sm:px-4">
                {NAV_ITEMS.map((item) => {
                    const isActive =
                        (!currentPath || currentPath === "/") && item.path === "/home"
                            ? true
                            : currentPath === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
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