import { BiSolidBookContent } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiHome } from "react-icons/fi";
import { MdOutlineMessage, MdOutlineTour } from "react-icons/md";

function Drawer({onMenuItemClick, activeMenuItem}) {
    const menuItemStyle = (item) => {
        return `flex items-center m-1 mb-5 text-gray-600 font-medium text-xl hover:text-gray-500 ${activeMenuItem === item ? 'text-blue-500' : ''}`; // Conditional styling
      };
      
  return (
    <div className='flex-col fixed w-[18%] h-screen bg-gray-200'>
        <div className='pl-8 pr-2 pt-10'>
            <div className={menuItemStyle('home')}>
                <FiHome className='mr-2'/>  
                <button onClick={() => onMenuItemClick('home')}>
                    Home
                </button>
            </div>
            <div className={menuItemStyle('tours')}>
                <MdOutlineTour className='mr-2'/>  
                <button onClick={() => onMenuItemClick('tours')}>
                Tours
                </button>
            </div>
            <div className={menuItemStyle('blogs')}>
                <BiSolidBookContent className='mr-2'/>  
                <button onClick={() => onMenuItemClick('blogs')}>
                Blogs
                </button>
            </div>
            <div className={menuItemStyle('messages')}>
                <MdOutlineMessage className='mr-2'/>  
                <button onClick={() => onMenuItemClick('messages')}>
                Messages
                </button>
            </div>
            <div className={menuItemStyle('profile')}>
                <CgProfile className='mr-2'/>  
                <button onClick={() => onMenuItemClick('profile')}>
                Profile
                </button>
            </div>
        </div>
    </div>
  )
}

export default Drawer