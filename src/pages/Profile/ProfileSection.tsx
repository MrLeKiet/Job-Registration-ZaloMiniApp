import { ChevronRight, User } from "lucide-react";
import React from "react";
import { getUserInfo } from "zmp-sdk/apis";
import { useNavigate } from "zmp-ui";
import ProfileCompletionCard from "./ProfileCompletionCard";
import QuickActions from "./QuickActions";
import { useProfile } from "./useProfile";

interface ProfileSectionProps {
	onZaloUserInfoChange?: (info: any) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ onZaloUserInfoChange }) => {
	const [zaloUserInfo, setZaloUserInfo] = React.useState<Record<string, any> | null>(() => {
		try {
			const raw = localStorage.getItem('zaloUserInfo');
			return raw ? JSON.parse(raw) : null;
		} catch (e) {
			// eslint-disable-next-line no-console
			console.warn('localStorage.get error', e);
			return null;
		}
	});
	// Auto-fill Họ và tên in registration form if Zalo name is available
	React.useEffect(() => {
		if (zaloUserInfo?.name) {
			try {
				const raw = localStorage.getItem('profileRegisterForm');
				const form = raw ? JSON.parse(raw) : {};
				if (!form.fullName || form.fullName === "Nguyen Van A") {
					form.fullName = zaloUserInfo.name;
					localStorage.setItem('profileRegisterForm', JSON.stringify(form));
				}
			} catch {}
		}
	}, [zaloUserInfo]);
	const { profile } = useProfile();
	const navigate = useNavigate();
	const [registerLoading, setRegisterLoading] = React.useState(false);

	const handleRegisterClick = async () => {
		setRegisterLoading(true);
		try {
			// artificial delay to show processing (2 seconds)
			await new Promise((r) => setTimeout(r, 2000));
			const res = await getUserInfo({ autoRequestPermission: true });
			const userInfo = (res as any)?.userInfo ?? res;
			// store locally and render on profile header
			setZaloUserInfo(userInfo);
			if (onZaloUserInfoChange) onZaloUserInfoChange(userInfo);
			try {
				localStorage.setItem('zaloUserInfo', JSON.stringify(userInfo));
			} catch (e) {
				// eslint-disable-next-line no-console
				console.warn('localStorage.set error', e);
			}
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
		if (onZaloUserInfoChange) onZaloUserInfoChange(null);
		try {
			localStorage.removeItem('zaloUserInfo');
		} catch (e) {
			// ignore when localStorage unavailable, but log for debugging
			// eslint-disable-next-line no-console
			console.warn('localStorage.clear error', e);
		}
		// Optionally navigate away or show a toast. We'll stay on the profile page.
		console.log('User logged out (local state cleared)');
	};

	// compute completion percent from registration form data in localStorage
	const computePercent = () => {
		let formData = {};
		try {
			const raw = localStorage.getItem('profileRegisterForm');
			if (raw) {
				formData = JSON.parse(raw);
			}
		} catch { }
		const p: any = formData;
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
	const percent = computePercent();

	return (
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
						<div className={`mt-0 transform transition-all duration-500 translate-y-0`} style={{ transitionDelay: '0ms' }}>
							<ProfileCompletionCard percent={percent} />
						</div>
						<div className={`mt-3 transform transition-all duration-500 translate-y-0`} style={{ transitionDelay: '80ms' }}>
							<QuickActions onNavigate={(p) => navigate(p)} />
						</div>
						<div className={`mt-3 transform transition-all duration-500 translate-y-0`} style={{ transitionDelay: '160ms' }}>
							<button onClick={handleLogout} className="w-full bg-white mt-2 my-4 rounded-lg p-3 shadow text-center text-sm text-red-600 border border-red-100">
								Đăng xuất
							</button>
						</div>
					</>
				) : null}
			</div>
		</div>
	);
};

export default ProfileSection;
