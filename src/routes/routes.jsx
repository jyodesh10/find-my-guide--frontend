import { createBrowserRouter } from "react-router-dom";
import HomePage from "../components/home/HomePage";
import PostsHome from "../components/home/PostsHome";
import LoginPage from "../components/login/LoginPage";


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
        element: <HomePage/>,
    }
])

export default router;