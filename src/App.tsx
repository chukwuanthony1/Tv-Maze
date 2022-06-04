import React from "react";
import { Helmet } from "react-helmet";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexRoutes from "./routes/index.routes";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <Helmet>
        <title>Maze API</title>
      </Helmet>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<IndexRoutes />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
