import { createBrowserRouter, Outlet } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import AddBlog from "../pages/blogs/AddBlog";
import Blogs from "../pages/blogs/Blogs";
import Home from "../pages/home/Home";
import LoginPage from "../pages/login/LoginPage";
import Messages from "../pages/messages/Messages";
import NotFound from "../pages/notfound/NotFound";
import Profile from "../pages/profile/Profile";
import { AddTour } from "../pages/tours/AddTour";
import { EditTour } from "../pages/tours/EditTour";
import Tours from "../pages/tours/Tours";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage /> ,
        // element: <Home/>,
        children: [
            {
                path:"*",
                element: <NotFound/>,
            },
        ]
    },
    {
        path: "dashboard",
        element: <LandingPage /> ,
        children: [
            {
                path:"home",
                element: <Home/>,
            },
            {
                path:"tours",
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <Tours/>,
                    },
                    {
                        path:"addtour",
                        element: <AddTour/>,
                    },
                    {
                        path:":id",
                        element: <EditTour/>,
                    },
                    
                ]
            },
            {
                path:"blogs",
                element: <Outlet/>,
                children: [
                    {
                        index: true,
                        element: <Blogs/>,
                    },
                    {
                        path: "addblog",
                        element: <AddBlog/>,
                    },
                ]
            },
            {
                path:"messages",
                element: <Messages/>,
            },
            {
                path:"profile",
                element: <Profile/>,
            },
            {
                path:"/dashboard/:id",
                element: <EditTour/>,
            },
        ]
    },
    
    // {
    //     path: "/dashboard",
    //     element: <LandingPage/>,
    //     children: [
    //     ]
    // },
    
    // {
    //     path: "/postshome",
    //     element: <PostsHome/>,
    // },

])

export default router;