import HomeFilters from "./HomeFilters";
import HomeSlider from "./HomeSlider";
import HotNewsSection from "./HotNewsSection";
import JobListSection from "./JobListSection";
import Navigate from "./Navigate";


const HomePage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col pb-4">
        <HomeFilters />
        <HomeSlider />
        <Navigate />
        <JobListSection />
        <HotNewsSection />
      </div>
    </div>
  );
};

export default HomePage;