import React from "react";
import EnterpriseSignUpSection from "./EnterpriseSignUpSection";
import ProfileEnterpriseMenu from "./ProfileEnterpriseMenu";
import ProfileHeader from "./ProfileHeader";
import ProfileLaborerMenu from "./ProfileLaborerMenu";
import ProfileRegisterLayout from "./ProfileRegisterLayout";
import ProfileSection from "./ProfileSection";


const ProfilePage: React.FC = () => {
    const [profileData, setProfileData] = React.useState<any>(null);
    const [signInStatus, setSignInStatus] = React.useState<'idle' | 'success' | 'fail'>('idle');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(true);
        // Restore accessToken from localStorage if available, but only if required scopes are present
        const savedToken = localStorage.getItem("accessToken");
        if (signInStatus !== 'success' && savedToken) {
            (async () => {
                try {
                    const { getSetting } = await import('zmp-sdk/apis');
                    const { authSetting } = await getSetting();
                    const hasUserInfo = !!authSetting["scope.userInfo"];
                    const hasPhoneNumber = !!authSetting["scope.userPhonenumber"];
                    if (!hasUserInfo || !hasPhoneNumber) {
                        localStorage.removeItem("accessToken");
                        setProfileData(null);
                        setSignInStatus('fail');
                        setLoading(false);
                        return;
                    }
                    const { getProfileWithToken } = await import('./api');
                    const profileRes = await getProfileWithToken(savedToken);
                    const profile = profileRes?.Data || null;
                    const profileWithToken = { ...profile, accessToken: savedToken, usertype: profile?.usertype };
                    setProfileData(profileWithToken);
                    setSignInStatus('success');
                } catch {
                    localStorage.removeItem("accessToken");
                } finally {
                    setLoading(false);
                }
            })();
            return;
        }
        // Only run sign-in API if not already signed in
        if (signInStatus !== 'success') {
            (async () => {
                try {
                    const { getSetting, authorize, getAccessToken, getPhoneNumber, getUserID, getUserInfo } = await import('zmp-sdk/apis');
                    const { authSetting } = await getSetting();
                    let needAuthorize = false;
                    if (!authSetting["scope.userInfo"] || !authSetting["scope.userPhonenumber"]) {
                        needAuthorize = true;
                    }
                    if (needAuthorize) {
                        await authorize({ scopes: ["scope.userInfo", "scope.userPhonenumber"] });
                    }
                    // After permissions are granted, get credentials
                    const phoneRes = await getPhoneNumber();
                    const userInfoRes = await getUserInfo();
                    if (phoneRes?.token && userInfoRes) {
                        try {
                            const Accesstoken = await getAccessToken();
                            const Code = phoneRes?.token || "";
                            const ZaloId = await getUserID();
                            const { signIn } = await import('@/api/registerApi');
                            const signInRes = await signIn({ Accesstoken, Code, ZaloId });
                            const accessToken = signInRes?.Data?.AccessToken;
                            if (accessToken) {
                                localStorage.setItem("accessToken", accessToken);
                                const { getProfileWithToken } = await import('./api');
                                const profileRes = await getProfileWithToken(accessToken);
                                const profile = profileRes?.Data || null;
                                const profileWithToken = { ...profile, accessToken, usertype: profile?.usertype };
                                setProfileData(profileWithToken);
                                setSignInStatus('success');
                            } else {
                                setProfileData(null);
                                setSignInStatus('fail');
                            }
                        } catch (err) {
                            setProfileData(null);
                            setSignInStatus('fail');
                        }
                    }
                } catch (error) {
                    const code = (error as any)?.code;
                    if (code === -201) {
                        console.log("Người dùng đã từ chối cấp quyền");
                    } else {
                        console.log("Lỗi khác");
                    }
                } finally {
                    setLoading(false);
                }
            })();
        } else {
            setLoading(false);
        }
    }, [signInStatus]);

    // Handler to receive profile data and sign-in status from ProfileSection
    const handleProfileFetched = (profile: any, status: 'idle' | 'success' | 'fail') => {
        setProfileData(profile);
        setSignInStatus(status);
        if (status === 'success' && profile?.accessToken) {
            localStorage.setItem("accessToken", profile.accessToken);
        }
        if (status !== 'success') {
            localStorage.removeItem("accessToken");
        }
    };

    const isEnterpriseSignup = location.pathname === "/enterprise-signup";
    const isProfileRegister = location.pathname === "/profile-register";

    let sectionContent;
    if (isEnterpriseSignup) {
        sectionContent = <EnterpriseSignUpSection />;
    } else if (isProfileRegister) {
        sectionContent = <ProfileRegisterLayout profileData={profileData} signInStatus={signInStatus} />;
    } else if (signInStatus === 'success' && profileData?.accessToken) {
        if (profileData?.usertype === 'Enterprise') {
            sectionContent = <ProfileEnterpriseMenu accessToken={profileData.accessToken} />;
        } else {
            sectionContent = <ProfileLaborerMenu accessToken={profileData.accessToken} />;
        }
    } else {
        sectionContent = <ProfileSection onProfileFetched={handleProfileFetched} />;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
            </div>
        );
    }

    return (
        <div className="">
            {signInStatus !== 'success' && (
                <ProfileHeader
                    name={profileData?.fullname}
                    avatar={profileData?.avatar}
                    signInStatus={signInStatus}
                />
            )}
            {sectionContent}
        </div>
    );
};

export default ProfilePage;