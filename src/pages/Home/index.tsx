import HomeFilters from "./HomeFilters";
import HomeRecruitmentForeignersSection from "./ForeignJobsSection";
import HomeSlider from "./HomeSlider";
import HotNewsSection from "./HotNewsSection";
import JobListSection from "./JobListSection";
import LaborerSection from "./LaboreSection";


const HomePage = () => {
  return (
    <div className="flex flex-col">
      <HomeSlider />
      <HomeFilters />
      <div className="flex flex-col p-4 gap-4">
        <HotNewsSection />
        <HomeRecruitmentForeignersSection />
        <JobListSection />
        <LaborerSection />
      </div>
    </div>
  );
};

export default HomePage;