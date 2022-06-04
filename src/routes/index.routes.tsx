import { AnimatePresence } from "framer-motion";
import React from "react";
import { Routes, Route , useLocation} from "react-router-dom";
const LandingPage = React.lazy(() => import("../pages/landing/LandingPage"));
const SingleMovie = React.lazy(() => import("../pages/single-movie/SingleMovie"));

const IndexRoutes = () => {
  const location = useLocation()
  return (
    <>
      <React.Suspense fallback={<div>loading...</div>}>
        <AnimatePresence>
          <Routes location={location} key ={location.key}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/movie/:showId" element={<SingleMovie />} />
          </Routes>
        </AnimatePresence>
      </React.Suspense>
    </>
  );
};

export default IndexRoutes;
