import { getSystemInfo } from "zmp-sdk";
import {
  AnimationRoutes,
  App,
  Route,
  SnackbarProvider,
  ZMPRouter,
} from "zmp-ui";
import { AppProps } from "zmp-ui/app";

import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/Home";
import NewsPage from "@/pages/HotNewsHomePage";
import JobsDetailPage from "@/pages/JobDetails";
import LaborerDetailPage from "@/pages/LaborerDetails";
import JobsPage from "@/pages/Jobs";
import LaborerPage from "@/pages/Laborer";
import NewsDetailPage from "@/pages/NewDetail";
import ProfilePage from "@/pages/Profile";
import RegisterPage from "@/pages/Register";
import RecruitmentPostPage from "@/pages/RecruitmentPost";
import RecruitmentForeignersJobDetailPage from "@/pages/RecruitmentForeignersJobDetail";
import UnemploymentInsurancePage from "@/pages/UnemploymentInsurance";
import OverseasJobsPage from "@/pages/OverseasJobs";
import AboutUsPage from "@/pages/AboutUs";
import ProfileRegisterLayout from "@/pages/Profile/ProfileRegisterLayout";
import EnterpriseSignUpSection from "@/pages/Profile/EnterpriseSignUpSection";
import EnterpriseUpdateProfile from "@/pages/Profile/EnterpriseUpdateProfile";
import EnterpriseJobList from "@/pages/Profile/EnterpriseJobList";
import EnterpriseUpdateJob from "@/pages/Profile/EnterpriseUpdateJob";
import LaborerUpdateProfile from "@/pages/Profile/LaborerUpdateProfile";
import LaborerJobList from "@/pages/Profile/LaborerJobList";
const Layout = () => {
  return (
    <App theme={getSystemInfo().zaloTheme as AppProps["theme"]}>
      <SnackbarProvider>
        <ZMPRouter>
          <MainLayout>
            <AnimationRoutes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:id" element={<NewsDetailPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:id" element={<JobsDetailPage />} />
              <Route path="/laborer" element={<LaborerPage />} />
              <Route path="/laborer/:id" element={<LaborerDetailPage />} />
              <Route path="/detail/:id" element={<JobsDetailPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/RecruitmentPost" element={<RecruitmentPostPage />} />
              <Route path="/recruitmentForeigners/:id" element={<RecruitmentForeignersJobDetailPage />} />
              <Route path="/unemployment-insurance" element={<UnemploymentInsurancePage />} />
              <Route path="/export-labor" element={<OverseasJobsPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/profile-register" element={<ProfileRegisterLayout />} />
              <Route path="/enterprise-signup" element={<EnterpriseSignUpSection />} />
              <Route path="/enterprise-updateprofile" element={<EnterpriseUpdateProfile />} />
              <Route path="/enterprise-joblist" element={<EnterpriseJobList />} />
              <Route path="/update-job/:id" element={<EnterpriseUpdateJob />} />
              <Route path="/laborer-updateprofile" element={<LaborerUpdateProfile />} />
              <Route path="/laborer-joblist" element={<LaborerJobList />} />
            </AnimationRoutes>
          </MainLayout>
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};
export default Layout;
