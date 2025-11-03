import React from "react";
import ProfileRegisterLayout from "./ProfileRegisterLayout";

const QuickActions: React.FC<{ onNavigate?: (path: string) => void; profileData?: any; signInStatus?: 'idle' | 'success' | 'fail' }> = ({ onNavigate, profileData, signInStatus }) => {

    return (
        <div>
            <div className="mt-3">
                <ProfileRegisterLayout profileData={profileData} signInStatus={signInStatus} />
            </div>
        </div>
    );
};

export default QuickActions;
