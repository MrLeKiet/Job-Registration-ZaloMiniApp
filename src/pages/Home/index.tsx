import HomeFilters from "./HomeFilters";
import HomeRecruitmentForeignersSection from "./HomeRecruitmentForeignersSection";
import HomeSlider from "./HomeSlider";
import HotNewsSection from "./HotNewsSection";
import JobListSection from "./JobListSection";
import LaborerSection from "./LaboreSection";


const HomePage = () => {
  return (
    <div className="flex flex-col pb-4 gap-2">
      <HomeSlider />
      <HomeFilters />
      <div className="px-4 flex flex-col gap-2 mb-2">
        <HotNewsSection />
        <HomeRecruitmentForeignersSection />
        <JobListSection />
        <LaborerSection />
      </div>
    </div>
  );
};

export default HomePage;