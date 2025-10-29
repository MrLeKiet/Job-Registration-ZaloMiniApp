
import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileSection from "./ProfileSection";

const ProfilePage: React.FC = () => {
    const [zaloUserInfo, setZaloUserInfo] = React.useState<any>(() => {
        try {
            const raw = localStorage.getItem('zaloUserInfo');
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    });

    // Listen for changes to localStorage (from ProfileSection)
    React.useEffect(() => {
        const handler = () => {
            try {
                const raw = localStorage.getItem('zaloUserInfo');
                setZaloUserInfo(raw ? JSON.parse(raw) : null);
            } catch {}
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    }, []);

    return (
        <div className="">
            <ProfileHeader name={zaloUserInfo?.name} avatar={zaloUserInfo?.avatar} />
            <ProfileSection onZaloUserInfoChange={setZaloUserInfo} />
        </div>
    );
};

export default ProfilePage;
