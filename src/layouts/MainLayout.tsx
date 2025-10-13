import React from "react";
import { useLocation } from "zmp-ui";
import Header from "../components/Header";
import Navbar from "../components/NavBar";
import ReturnHeader from "../components/ReturnHeader";

// Define your main and return routes here
const MAIN_ROUTES = [
    "/",
    "/home",
    "/profile",
    "/enterprise",
    "/jobs",
    "/laborer"
];
const RETURN_ROUTES = [
    "/news/",
    "/jobs/",
    "/laborer/",
    "/register",
    "/news",
    "/auth",
    "/profile/edit"
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

    return (
        <NavbarVisibilityContext.Provider value={navbarContextValue}>
            <div className="h-[100vh] flex flex-col" >
                <div style={{ position: "sticky", top: 0, zIndex: 50 }}>
                    {isReturn ? <ReturnHeader /> : <Header />}
                </div>
                <div
                    className="bg-white flex-1 flex flex-col overflow-y-auto"
                    style={{
                        maxHeight: isReturn
                            ? "calc(100vh - var(--return-header-height) - var(--header-height) + 10px )"
                            : "calc(100vh - var(--safe-top) - var(--navbar-height) - var(--header-height) + 10px)",
                    }}
                >
                    {children}
                </div>
                {(isMain || isReturn) && showNavbar && (
                    <div>
                        <Navbar />
                    </div>
                )}
            </div>
        </NavbarVisibilityContext.Provider>
    );
};

export default MainLayout;