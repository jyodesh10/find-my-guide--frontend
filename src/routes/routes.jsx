import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import PostsHome from "../components/PostsHome";
import LoginPage from "../pages/login/LoginPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage /> ,
        // element: <Home/>,
    },
    
    {
        path: "/postshome",
        element: <PostsHome/>,
    },
    {
        path: "/home",
        element: <LandingPage/>,
    }
])

export default router;