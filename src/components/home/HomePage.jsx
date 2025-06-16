import { useState } from 'react';
import AddEditBlog from "./components/Blogs";
import Home from "./components/Home";
import Messages from "./components/Messages";
import Profile from "./components/Profile";
import Tours from "./components/Tours";
import Drawer from "./Drawer";
import Topbar from "./Topbar";

const HomePage = () => {
    
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
    <div>
    <Topbar/>
    <div className='flex w-screen'>
        <Drawer
            onMenuItemClick={handleMenuItemClick}
            activeMenuItem={activeMenuItem}
        />
        <div className='ml-[21%] w-[75%]'>
            {renderComponent()}
        </div>
    </div>
    </div>
  )
}

export default HomePage