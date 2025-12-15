import React from "react";
import { useLocation } from "zmp-ui";
import Header from "../components/Header";
import Navbar from "../components/NavBar";
import ReturnHeader from "../components/ReturnHeader";

// Define your main and return routes here
const MAIN_ROUTES = [
    "/",
    "/home",
];
const RETURN_ROUTES = [
    "/profile",
    "/enterprise",
    "/jobs",
    "/laborer",
    "/news/",
    "/jobs/",
    "/laborer/",
    "/register",
    "/news",
    "/auth",
    "/profile/edit",
    "/enterprise",
    "/recruitmentForeigners/",
    "/unemployment-insurance",
    "/export-labor",
    "/about",
    "/profile-register",
    "/enterprise-signup",
    "/enterprise-updateprofile",
    "/enterprise-joblist",
    "/update-job/",
    "/RecruitmentPost",
    "/laborer-updateprofile",
    "/laborer-joblist",
];


type NavbarVisibilityContextType = {
    showNavbar: boolean;
    setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavbarVisibilityContext = React.createContext<NavbarVisibilityContextType | undefined>(undefined);

type MainLayoutProps = {
    children: React.ReactNode;
};


const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const location = useLocation();
    const path = location.pathname;
    const [showNavbar, setShowNavbar] = React.useState(true);

    const navbarContextValue = React.useMemo(
        () => ({ showNavbar, setShowNavbar }),
        [showNavbar, setShowNavbar]
    );

    const isReturn = RETURN_ROUTES.some(route => route.endsWith("/") ? path.startsWith(route) : path === route);
    const isMain = !isReturn && MAIN_ROUTES.some(route => path.startsWith(route));
    if (!isMain && !isReturn) {
        return <>{children}</>;
    }

    // Map route to custom header title
    let returnHeaderTitle: string | undefined = undefined;
    if (path === "/jobs") {
        returnHeaderTitle = "Việc làm";
    }
    if (path.startsWith("/jobs/")) {
        returnHeaderTitle = "Chi tiết việc làm";
    }
    // Add more routes as needed
    if (path === "/profile") {
        returnHeaderTitle = "Hồ sơ cá nhân";
    }
    if (path.startsWith("/news/")) {
        returnHeaderTitle = "Tin tức";
    }
    if (path === "/enterprise") {
        returnHeaderTitle = "Doanh nghiệp";
    }
    if (path === "/recruitmentForeigners/") {
        returnHeaderTitle = "Tuyển dụng người nước ngoài";
    }
    if (path === "/unemployment-insurance") {
        returnHeaderTitle = "Bảo hiểm thất nghiệp";
    }
    if (path === "/export-labor") {
        returnHeaderTitle = "Xuất khẩu lao động";
    }
    if (path === "/about") {
        returnHeaderTitle = "Giới thiệu";
    }
    if (path === "/register") {
        returnHeaderTitle = "Đăng ký thành viên";
    }
    if (path === "/laborer") {
        returnHeaderTitle = "Lao động";
    }
    if (path.startsWith("/laborer/")) {
        returnHeaderTitle = "Chi tiết lao động";
    }
    if (path === "/news") {
        returnHeaderTitle = "Tin tức nổi bật";
    }
    if (path === "/profile-register") {
        returnHeaderTitle = "Đăng ký hồ sơ cá nhân";
    }
    if (path === "/enterprise-signup") {
        returnHeaderTitle = "Đăng ký doanh nghiệp";
    }
    return (
        <NavbarVisibilityContext.Provider value={navbarContextValue}>
            <div className="h-[100vh] flex flex-col" >
                <div style={{ position: "sticky", top: 0, zIndex: 50 }}>
                    {isReturn ? <ReturnHeader title={returnHeaderTitle} /> : <Header />}
                </div>
                <div
                    className="bg-[#fafafa] flex-1 flex flex-col overflow-y-auto"
                >
                    {children}
                </div>
                <div>
                    <Navbar />
                </div>
            </div>
        </NavbarVisibilityContext.Provider>
    );
};

export default MainLayout;