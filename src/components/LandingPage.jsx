import { useState } from 'react';
import AddEditBlog from "../pages/blogs/Blogs";
import Home from "../pages/home/Home";
import Messages from "../pages/messages/Messages";
import Profile from "../pages/profile/Profile";
import Tours from "../pages/tours/Tours";
import Drawer from "./Drawer";
import Topbar from "./Topbar";

const LandingPage = (path) => {

  const [activeComponent, setActiveComponent] = useState('home');
  const [activeMenuItem, setActiveMenuItem] = useState('home');


  const handleMenuItemClick = (menuItem) => {
    setActiveComponent(menuItem);
    setActiveMenuItem(menuItem);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'home':
        return <Home />;
      case 'tours':
        return <Tours />;
      case 'blogs':
        return <AddEditBlog />;
      case 'messages':
        return <Messages />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />; // Default component if no match
    }
  };

  return (
    <div className="flex-col">
      <Topbar />
      <div className='flex w-screen'>
        <Drawer
          onMenuItemClick={handleMenuItemClick}
          activeMenuItem={activeMenuItem}
        />
        <div className='ml-[21%] w-[75%] pt-[50px] box-border overflow-y-auto'>
          {renderComponent()}
        </div>
      </div>
    </div>
  )
}

export default LandingPage