import { Building2, ChevronRight, Link, User } from "lucide-react";
import React, { createContext } from "react";
import { useQueryClient } from 'react-query';
import { useNavigate } from "zmp-ui";
// Zalo Auth Context
export const ZaloAuthContext = createContext<any>(null);

import { zmpLinkedAccount } from "@/api/linkedAccountApi";
import { Input, Text } from "zmp-ui";
import QuickActions from "./QuickActions";


interface ProfileSectionProps {
	onProfileFetched?: (profileData: any, signInStatus: 'idle' | 'success' | 'fail') => void;
	permissionData?: any;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ onProfileFetched, permissionData }) => {
	const [zaloAuth, setZaloAuth] = React.useState<any>(null);
	const queryClient = useQueryClient();
	const [zaloUserInfo, setZaloUserInfo] = React.useState<Record<string, any> | null>(null);
	const [signInStatus, setSignInStatus] = React.useState<'idle' | 'success' | 'fail'>('idle');
	const [profileData, setProfileData] = React.useState<any>(null);
	const navigate = useNavigate();

    // Example usage: log permissionData if available
    React.useEffect(() => {
        if (permissionData) {
            console.log('[ProfileSection] Permission data received:', permissionData);
        }
    }, [permissionData]);


	const handleRegisterClick = () => {
		navigate('/profile-register');
	};

	const handleLogout = () => {
		// clear local Zalo user info
		setZaloUserInfo(null);
		setProfileData(null);
		setSignInStatus('idle');
		// Notify parent to reset header to Guest
		if (onProfileFetched) onProfileFetched(null, 'idle');
		// Optionally navigate away or show a toast. We'll stay on the profile page.
		console.log('User logged out (local state cleared)');
	};

	// compute completion percent from registration form data in localStorage
	const computePercent = () => {
		// Removed localStorage usage for profileRegisterForm
		const p: any = {};
		const fields = [
			p.fullName,
			p.birthDate,
			p.gender,
			p.idCard,
			p.issueDate,
			p.issuePlace,
			p.phone,
			p.email,
			p.ethnicity,
			p.address,
			p.educationLevel,
			p.cmktLevel,
			p.major,
			p.school
		];
		const desiredJobFilled = p.desiredJob && Array.isArray(p.desiredJob) && p.desiredJob.length > 0 ? 1 : 0;
		const checks = fields.map((f) => (f ? 1 : 0));
		const total = checks.reduce((s, v) => s + v, 0) + desiredJobFilled;
		const max = fields.length + 1;
		return Math.round((total / max) * 100);
	};

	const [showLinkedDialog, setShowLinkedDialog] = React.useState(false);
	const [linkedEmail, setLinkedEmail] = React.useState("");
	const [linkedLoading, setLinkedLoading] = React.useState(false);
	const [linkedError, setLinkedError] = React.useState("");
	const [linkedSuccess, setLinkedSuccess] = React.useState(false);

	const handleLinkedSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLinkedLoading(true);
		setLinkedError("");
		setLinkedSuccess(false);
		try {
			const { getAccessToken, getPhoneNumber, getUserID } = await import('zmp-sdk/apis');
			const Accesstoken = await getAccessToken();
			const phoneRes = await getPhoneNumber();
			const Code = phoneRes?.token || "";
			const ZaloId = await getUserID();
			const res = await zmpLinkedAccount({ Accesstoken, Code, ZaloId, Email: linkedEmail });
			if (res?.StatusResult?.Code === 0) {
				setLinkedSuccess(true);
				setLinkedError("");
				setTimeout(() => setShowLinkedDialog(false), 2000);
			} else {
				setLinkedError(res?.StatusResult?.Message || "Liên kết thất bại.");
			}
		} catch (err) {
			setLinkedError("Liên kết thất bại.");
		} finally {
			setLinkedLoading(false);
		}
	};


	return (
		<ZaloAuthContext.Provider value={{ ...zaloAuth, logout: handleLogout }}>
			<div className="px-4 -mt-6 pb-4">
				<div>
					<div className="flex flex-col items-center gap-3">
						<button
							onClick={handleRegisterClick}
							className={`
								w-full rounded-lg shadow-lg text-left flex bg-[#b5e0ff] items-center p-4 transition-all duration-200 active:scale-95
								${zaloUserInfo ? 'opacity-0 pointer-events-none translate-y-3' : 'opacity-100 translate-y-0'}
							`}
						>
							<div className="w-12 h-12 bg-[#1565C0] text-white rounded-full flex items-center justify-center mr-4">
								<User size={18} />
							</div>
							<div className="flex-1">
								<div className="font-semibold">Đăng ký thành viên</div>
							</div>
							<ChevronRight />
						</button>

						<button
							onClick={() => navigate('/enterprise-signup')}
							className={`
								w-full rounded-lg shadow-lg text-left flex items-center p-4 bg-[#8cc98f] mt-2 transition-all duration-200 active:scale-95
								${zaloUserInfo ? 'opacity-0 pointer-events-none translate-y-3' : 'opacity-100 translate-y-0'}
							`}
						>
							<div className="w-12 h-12 bg-[#508653] text-white rounded-full flex items-center justify-center mr-4">
								<Building2 size={18} />
							</div>
							<div className="flex-1">
								<div className="font-semibold">Đăng ký doanh nghiệp</div>
							</div>
							<ChevronRight />
						</button>
						<button
							onClick={() => setShowLinkedDialog(true)}
							className="w-full rounded-lg shadow-lg text-left flex items-center p-4 bg-[#d1a666] mt-2 transition-all duration-200 active:scale-95 opacity-100 translate-y-0"
						>
							<div className="w-12 h-12 bg-[#FF9800] text-white rounded-full flex items-center justify-center mr-4">
								<Link size={18} />
							</div>
							<div className="flex-1">
								<div className="font-semibold">Liên kết tài khoản</div>
							</div>
							<ChevronRight />
						</button>
						{showLinkedDialog && (
							<div
								className="fixed inset-0 z-50 flex px-4 items-center justify-center bg-black bg-opacity-40"
								onClick={e => {
									if (e.target === e.currentTarget) setShowLinkedDialog(false);
								}}
							>
								<div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
									<form onSubmit={handleLinkedSubmit} className="p-4">
										<div className="flex items-center justify-between mb-2">
											<Text className="text-lg font-semibold">Nhập email để liên kết với tài khoản</Text>
											<button
												className="text-gray-500 text-xl ml-2"
												type="button"
												onClick={() => setShowLinkedDialog(false)}
												aria-label="Close"
											>
												&times;
											</button>
										</div>
										<Input
											label="Email"
											value={linkedEmail}
											onChange={e => setLinkedEmail(e.target.value)}
											placeholder="Email"
											required
										/>
										{linkedError && <div className="text-red-600 text-sm mt-2">{linkedError}</div>}
										{linkedSuccess && <div className="text-green-600 text-sm mt-2">Liên kết thành công!</div>}
										<button
											className="w-full mt-4 bg-blue-500  rounded-md text-white p-2 zmp-button"
											disabled={linkedLoading}
											type="submit"
										>
											{linkedLoading ? "Đang liên kết..." : "Liên kết"}
										</button>
									</form>
								</div>
							</div>
						)}
					</div>


				</div>

				<div className="mt-2">
					{zaloUserInfo ? (
						<>
							<div className={`mt-3 transform transition-all duration-500 translate-y-0`} style={{ transitionDelay: '80ms' }}>
								<QuickActions onNavigate={(p) => navigate(p)} profileData={profileData} signInStatus={signInStatus} />
							</div>
							<div className={`mt-3 transform transition-all duration-500 translate-y-0`} style={{ transitionDelay: '160ms' }}>
								<button onClick={handleLogout} className="w-full bg-white mt-2 my-4 rounded-lg p-3 shadow text-center text-red-600 border border-red-100">
									{signInStatus === 'success' ? 'Đăng xuất' : 'Thoát'}
								</button>
							</div>
						</>
					) : null}
				</div>
			</div>
		</ZaloAuthContext.Provider>
	);
};

export default ProfileSection;