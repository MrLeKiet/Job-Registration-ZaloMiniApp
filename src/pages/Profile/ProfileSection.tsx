import { ChevronRight, User } from "lucide-react";
import React, { createContext } from "react";
import { useQueryClient } from 'react-query';
import { getUserInfo } from "zmp-sdk/apis";
import { useNavigate } from "zmp-ui";
// Zalo Auth Context
export const ZaloAuthContext = createContext<any>(null);

import QuickActions from "./QuickActions";


interface ProfileSectionProps {
	onProfileFetched?: (profileData: any, signInStatus: 'idle' | 'success' | 'fail') => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ onProfileFetched }) => {
	const [zaloAuth, setZaloAuth] = React.useState<any>(null);
	const queryClient = useQueryClient();
	const [zaloUserInfo, setZaloUserInfo] = React.useState<Record<string, any> | null>(null);
	const [signInStatus, setSignInStatus] = React.useState<'idle' | 'success' | 'fail'>('idle');
	const [profileData, setProfileData] = React.useState<any>(null);
	const navigate = useNavigate();
	const [registerLoading, setRegisterLoading] = React.useState(false);

	const handleRegisterClick = async () => {
		setRegisterLoading(true);
		try {
			// artificial delay to show processing (2 seconds)
			await new Promise((r) => setTimeout(r, 2000));
			// Always fetch fresh Zalo info before signIn
			const { getAccessToken, getPhoneNumber, getUserID } = await import('zmp-sdk/apis');
			const Accesstoken = await getAccessToken();
			const phoneRes = await getPhoneNumber();
			const Code = phoneRes?.token || "";
			const ZaloId = await getUserID();
			// Save Zalo auth for later use (for LaboreSignUp)
			setZaloAuth({ Accesstoken, Code, ZaloId });
			// Debug log before signIn API call
			console.log('[DEBUG] SignIn payload:', { Accesstoken, Code, ZaloId });
			// Try sign in
			const { signIn } = await import('@/api/registerApi');
			let signInRes;
			let accessToken = null;
			try {
				signInRes = await signIn({ Accesstoken, Code, ZaloId });
				console.log('[DEBUG] signIn response:', signInRes);
				accessToken = signInRes?.Data?.AccessToken;
				console.log('[DEBUG] signInRes.Data.AccessToken:', accessToken);
				if (accessToken) {
					// Use returned AccessToken for all profile actions
					console.log('[DEBUG] Fetching profile with token:', accessToken);
					const { getProfileWithToken } = await import('./api');
					const profileRes = await getProfileWithToken(accessToken);
					console.log('[DEBUG] /api/v1/Profile (with token) response:', profileRes);
					const profile = profileRes?.Data || null;
					// Pass both profile and correct accessToken
					const profileWithToken = { ...profile, accessToken };
					setProfileData(profileWithToken);
					setSignInStatus('success');
					if (onProfileFetched) onProfileFetched(profileWithToken, 'success');
				} else {
					console.log('[DEBUG] signIn failed: no AccessToken in response');
					// Fetch a new set of Zalo credentials for LaboreSignUp
					const { getAccessToken, getPhoneNumber, getUserID } = await import('zmp-sdk/apis');
					const newAccesstoken = await getAccessToken();
					const newPhoneRes = await getPhoneNumber();
					const newCode = newPhoneRes?.token || "";
					const newZaloId = await getUserID();
					setZaloAuth({ Accesstoken: newAccesstoken, Code: newCode, ZaloId: newZaloId });
					setSignInStatus('fail');
					if (onProfileFetched) onProfileFetched(null, 'fail');
				}
			} catch {
				// Also fetch new Zalo credentials if signIn throws
				const { getAccessToken, getPhoneNumber, getUserID } = await import('zmp-sdk/apis');
				const newAccesstoken = await getAccessToken();
				const newPhoneRes = await getPhoneNumber();
				const newCode = newPhoneRes?.token || "";
				const newZaloId = await getUserID();
				setZaloAuth({ Accesstoken: newAccesstoken, Code: newCode, ZaloId: newZaloId });
				setSignInStatus('fail');
			}
			// Only update state, do not save to localStorage
			const res = await getUserInfo({ autoRequestPermission: true });
			const userInfo = (res as any)?.userInfo ?? res;
			setZaloUserInfo(userInfo);
		} catch (e) {
			const err: any = e;
			console.error('getUserInfo error', err);
			if (err?.code === -1401) {
				alert('Bạn đã từ chối cấp quyền lấy tên và ảnh đại diện. Vui lòng cho phép để tiếp tục đăng ký.');
			} else {
				alert('Đã có lỗi xảy ra khi lấy thông tin người dùng. Vui lòng thử lại.');
			}
		} finally {
			setRegisterLoading(false);
		}
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


	return (
		<ZaloAuthContext.Provider value={{ ...zaloAuth, logout: handleLogout }}>
			<div className="px-4 -mt-6 pb-4">
				<div className={`rounded-lg overflow-hidden ${zaloUserInfo ? 'shadow-none' : 'shadow bg-transparent'}`}> 
					{/* Accordion Wrapper */}
					<div
						className={`
	  overflow-hidden transition-all duration-500
	  ${zaloUserInfo
								? 'max-h-0 p-0 opacity-0 pointer-events-none'
								: 'max-h-40 opacity-100'
							}
	`}
						aria-hidden={!!zaloUserInfo}
					>
						<button
							onClick={handleRegisterClick}
							disabled={registerLoading}
							className={`
		w-full text-left flex items-center p-4 transition-all duration-200 active:scale-95
		${zaloUserInfo ? 'opacity-0 pointer-events-none translate-y-3' : 'opacity-100 translate-y-0'}
		${registerLoading ? 'opacity-60 cursor-not-allowed' : ''}
	  `}
							style={{ background: '#E3F2FD' }}
						>
							<div className="w-12 h-12 bg-[#1565C0] text-white rounded-full flex items-center justify-center mr-4">
								<User size={18} />
							</div>
							<div className="flex-1">
								<div className="font-semibold">Đăng ký thành viên</div>
							</div>
							<ChevronRight />
						</button>
					</div>

					{registerLoading && (
						<div className="p-3 text-center text-sm text-gray-600">Đang yêu cầu quyền truy cập...</div>
					)}
				</div>

				<div className="mt-2">
					{/* show completion, quick actions and logout only after successful login */}
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