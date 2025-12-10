
import Card from "@/components/Card";
import Skeleton from "@/components/Skeleton";
import SkeletonList from "@/components/SkeletonList";
import { Briefcase } from "lucide-react";
import React from "react";
import { useNavigate } from "zmp-ui";
import { useLaborerJobApplyList } from "./useProfile";

const LaborerJobList: React.FC = () => {
	const accessToken = localStorage.getItem("accessToken") || "";
	const { jobs, loading, error } = useLaborerJobApplyList(accessToken);
	const navigate = useNavigate();

	function handleClick(job: any): void {
		navigate(`/jobs/${job.id}`);
	}

	if (error) {
		return <div className="text-center text-muted py-8 select-none font-lg">Lỗi: {error}</div>;
	}

	const isEmpty = !Array.isArray(jobs) || jobs.length === 0;
	let content;
	if (loading) {
		content = (
			<SkeletonList
				count={3}
				renderSkeleton={() => (
					<div className="flex gap-3 items-center bg-white/5 rounded p-2 w-full">
						<Skeleton className="w-16 h-16" />
						<div className="flex-1">
							<Skeleton className="h-4 w-2/3 mb-2" />
							<Skeleton className="h-3 w-1/2 mb-1" />
							<Skeleton className="h-3 w-1/3" />
						</div>
					</div>
				)}
				className="flex flex-col gap-2 mb-2"
			/>
		);
	} else if (isEmpty) {
		content = (
			<div className={`flex flex-col items-center justify-center py-6 px-4 text-center select-none `}>
				<div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
					<Briefcase className="w-10 h-10 text-gray-400" />
				</div>
				<p className="text-lg font-medium text-gray-700 mb-1">
					Không có việc làm nào được tìm thấy.
				</p>
				<p className="text-sm text-gray-500">
					Hãy thử tìm kiếm hoặc quay lại sau
				</p>
			</div>
		);
	} else {
		content = jobs.map((job: any) => (
			<Card
				key={job.id}
				thumbnail={job.thumbnail}
				onClick={() => handleClick(job)}
			>
				<div className="flex flex-col justify-center w-full">
					<div className="font-bold text-lg text-gray-900 mb-1">{job.title}</div>
					<div className="text-gray-600 text-base font-bold mb-1">{job.company}</div>
					<div className="flex gap-2 text-sm text-gray-500">
						<span>Lương: {job.salary}</span>
						<span>Hạn: {job.enddate}</span>
					</div>
					<div className="text-xs text-gray-400 mt-1">{job.location}</div>
				</div>
			</Card>
		));
	}

	return (
		<div className="max-w-2xl mx-auto px-4 py-6">
			<h2 className="text-2xl font-bold mb-4">Danh sách việc đã ứng tuyển</h2>
			<div className="flex flex-col gap-3">
				{content}
			</div>
		</div>
	);
};

export default LaborerJobList;
