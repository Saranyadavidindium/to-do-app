import logo from "./logo.svg";
// import "./App.css";
import CustomTable from "./components/CustomTable";
import Chart from "./components/Chart";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootPage";
import NotFound from "./pages/NotFound";
import LoginRoot from "./pages/LoginRoot";
import LoginPage from "./components/authenticate/login";
import Register from "./components/authenticate/Register";
import Home from "./components/home/home";
import TaskContextProdiver from "./store/taskcontext";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout></RootLayout>,
      errorElement: <NotFound></NotFound>,
      children: [
        { index: true, element: <Home></Home> },
        { path: "/task", element: <CustomTable></CustomTable> },
        { path: "register", element: <Register /> },
        { path: "/charts", element: <Chart></Chart> },
      ],
    },
    {
      path: "/auth",
      element: <LoginRoot></LoginRoot>,
      children: [
        { index: true, element: <LoginPage></LoginPage> },
        { path: "register", element: <Register /> },
      ],
    },
  ]);
  return (
    // <>

    //   <CustomTable></CustomTable>
    //   <Chart></Chart>
    // </>
    <TaskContextProdiver>
      <RouterProvider router={route}></RouterProvider>
    </TaskContextProdiver>
  );
}

export default App;
