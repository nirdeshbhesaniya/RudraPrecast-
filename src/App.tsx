/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Products } from "./pages/Products";
import { ProductDetails } from "./pages/ProductDetails";
import { Projects } from "./pages/Projects";
import { WhyUs } from "./pages/WhyUs";
import { FAQ } from "./pages/FAQ";
import { Contact } from "./pages/Contact";
import { DataProvider } from "./context/DataContext";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { Dashboard } from "./pages/admin/Dashboard";
import { ProductsAdmin } from "./pages/admin/ProductsAdmin";
import { ProjectsAdmin } from "./pages/admin/ProjectsAdmin";
import { TestimonialsAdmin } from "./pages/admin/TestimonialsAdmin";
import { CalculatorAdmin } from "./pages/admin/CalculatorAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "products", element: <Products /> },
      { path: "products/:slug", element: <ProductDetails /> },
      { path: "projects", element: <Projects /> },
      { path: "why-us", element: <WhyUs /> },
      { path: "faq", element: <FAQ /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "products", element: <ProductsAdmin /> },
      { path: "projects", element: <ProjectsAdmin /> },
      { path: "testimonials", element: <TestimonialsAdmin /> },
      { path: "calculator", element: <CalculatorAdmin /> }
    ]
  }
]);

export default function App() {
  return (
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  );
}

