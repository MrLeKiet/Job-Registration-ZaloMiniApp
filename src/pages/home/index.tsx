import HomeFilters from "./HomeFilters";
import HomeRecruitmentForeignersSection from "./HomeRecruitmentForeignersSection";
import HomeSlider from "./HomeSlider";
import HotNewsSection from "./HotNewsSection";
import JobListSection from "./JobListSection";
import LaborerSection from "./LaboreSection";


const HomePage = () => {
  return (
    <div className="flex flex-col pb-4">
      <HomeSlider />
      <HomeFilters />
      <HotNewsSection />
      <HomeRecruitmentForeignersSection />
      <JobListSection />
      <LaborerSection />
      <iframe
        height="315"
        src="https://truyenqqgo.com/the-loai/manhwa-49.html"
        title="a"
      ></iframe>
    </div>
  );
};

export default HomePage;