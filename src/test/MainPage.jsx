import { Link, Outlet } from "react-router-dom"

function MainPage() {
  return (
    <>
        <nav className="flex items-center justify-center w-screen h-16 bg-amber-300">
            <Link to={"/home"}>
                <button className="mr-4 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    <h1>Home</h1>
                </button>
            </Link>
            <Link to={"/products"}>
                <button className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    <h1>Products</h1>
                </button>
            </Link>
        </nav>
        <Outlet/>
    </>
  )
}

export default MainPage