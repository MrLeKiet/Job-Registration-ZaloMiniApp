
import ErrorBoundary from "@/components/ErrorBoundary";
import JobGeneralInfo from "./JobGeneralInfo";
import TabBar from "./TabBar";


const JobsDetailPage = () => {
	return (
		<ErrorBoundary>
			<div className="">
				<JobGeneralInfo />
				<TabBar />
			</div>
		</ErrorBoundary>
	);
};

export default JobsDetailPage;
