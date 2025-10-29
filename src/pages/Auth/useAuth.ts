import { signIn } from "./api";
import { useEffect } from "react";
import { getAccessToken, getPhoneNumber, getUserID, getUserInfo } from "zmp-sdk/apis";
import { useNavigate } from "zmp-ui";

export function useAuth() {
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuthorize = async () => {
            try {
                const phoneToken = await getPhoneNumber();
                const accessToken = await getAccessToken();
                const userID = await getUserID();
                const userInfo = await getUserInfo({ autoRequestPermission: true });
                // Debug log
                console.log("Accesstoken:", accessToken);
                console.log("Code:", phoneToken);
                console.log("ZaloId:", userID);
                // Try to login via API
                const data = await signIn({
                    accessToken: accessToken || "",
                    code: phoneToken.token || "",
                    zaloId: userID || ""
                });
                if (data.StatusResult?.Code === 0) {
                    // Login success
                    navigate("/home");
                } else {
                    // Not registered, go to register
                    navigate("/register", { state: { userInfo } });
                }
            } catch (err) {
                console.error("Authorization error:", err);
                location.reload();
            }
        };
        checkAuthorize();
    }, [navigate]);
}
