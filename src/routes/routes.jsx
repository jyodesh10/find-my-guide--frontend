import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import PostsHome from "../components/PostsHome";
import LoginPage from "../pages/login/LoginPage";
import { EditTour } from "../pages/tours/EditTour";


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
        path: "/dashboard",
        element: <LandingPage/>,
        children: [
            {
                path:"home",
                element: <LandingPage path={"home"}/>,
            },
            {
                path:"tours",
                element: <LandingPage path={"tours"}/>,
            },
            {
                path:"blogs",
                element: <LandingPage path={"blogs"}/>,
            },
        ]
    },
    {
        path:"/dashboard/edit-tour",
        element: <EditTour/>,
    },
])

export default router;