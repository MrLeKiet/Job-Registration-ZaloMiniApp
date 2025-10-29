import LoadingOverlay from "./LoadingOverlay";
import { useAuth } from "./useAuth";

const AuthPage = () => {
    useAuth();
    return (
        <div className="flex items-center justify-center min-h-screen bg-teal-700 relative">
            <LoadingOverlay message="Loading..." />
        </div>
    );
};

export default AuthPage;
