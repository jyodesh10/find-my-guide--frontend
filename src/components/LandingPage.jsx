import { Outlet } from 'react-router-dom';
import Drawer from "./Drawer";
import Topbar from "./Topbar";

const LandingPage = (path) => {

  return (
    <div className="flex-col">
      <Topbar />
      <div className='flex w-screen'>
        <Drawer/>
        <div className='ml-[21%] w-[75%] pt-[50px] box-border overflow-y-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default LandingPage