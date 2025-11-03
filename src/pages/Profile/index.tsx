
import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileSection from "./ProfileSection";

const ProfilePage: React.FC = () => {
    const [profileData, setProfileData] = React.useState<any>(null);
    const [signInStatus, setSignInStatus] = React.useState<'idle' | 'success' | 'fail'>('idle');

    // Handler to receive profile data and sign-in status from ProfileSection
    const handleProfileFetched = (profile: any, status: 'idle' | 'success' | 'fail') => {
        setProfileData(profile);
        setSignInStatus(status);
    };

    return (
        <div className="">
            <ProfileHeader
                name={profileData?.fullname}
                avatar={profileData?.avatar}
                signInStatus={signInStatus}
            />
            <ProfileSection onProfileFetched={handleProfileFetched} />
        </div>
    );
};

export default ProfilePage;