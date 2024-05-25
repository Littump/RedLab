import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./ui/Layout.tsx";
import Error from "./ui/Error.tsx";

import LoginPage from "@/pages/LoginPage.tsx";
import InputDataPage from "@/pages/InputFilesPage.tsx";
import DataAnalysisPage from "@/pages/DataAnalysisPage.tsx";
import FullGraphPage from "@/pages/FullGraphPage.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <Error />,
  },
  {
    path: "/",
    element: (
      <Layout>
        <InputDataPage />
      </Layout>
    ),
    errorElement: <Error />,
  },
  {
    path: "/data/:id",
    element: (
      <Layout>
        <DataAnalysisPage />
      </Layout>
    ),
    errorElement: <Error />,
  },
  {
    path: "/data/:id/fullscreen",
    element: <FullGraphPage />,
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
