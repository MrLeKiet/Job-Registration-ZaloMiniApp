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
import EnterprisePage from "@/pages/RecruitmentForeigners";
import JobDetailPage from "@/pages/RecruitmentForeignersJobDetail";
import RegisterPage from "@/pages/Register";

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
              <Route path="/enterprise" element={<EnterprisePage />} />
              <Route path="/detail/:id" element={<JobDetailPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </AnimationRoutes>
          </MainLayout>
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};
export default Layout;
