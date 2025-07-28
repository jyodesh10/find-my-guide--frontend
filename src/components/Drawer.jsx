import { BiSolidBookContent } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiHome } from "react-icons/fi";
import { MdOutlineMessage, MdOutlineTour } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

function Drawer() {
    const navigate = useNavigate();
    const location = useLocation();
    const menuItemStyle = (item) => {
        return `flex items-center m-1 mb-5 font-medium text-xl hover:text-gray-500 ${location.pathname === "/dashboard/"+item ? 'text-red-900' : 'text-gray-700'}`; // Conditional styling
      };
      
  return (
    <div className='flex-col fixed w-[18%] h-screen bg-gray-200'>
        <div className='pl-8 pr-2 pt-10'>
            <div className={menuItemStyle('home')}>
                <FiHome className='mr-2'/>  
                <button onClick={() => navigate("home")} className="font-poppins font-medium">
                    Home
                </button>
            </div>
            <div className={menuItemStyle('tours')}>
                <MdOutlineTour className='mr-2'/>  
                <button onClick={() => navigate("tours")} className="font-poppins font-medium">
                Tours
                </button>
            </div>
            <div className={menuItemStyle('blogs')}>
                <BiSolidBookContent className='mr-2'/>  
                <button onClick={() => navigate("blogs")} className="font-poppins font-medium">
                Blogs
                </button>
            </div>
            <div className={menuItemStyle('messages')}>
                <MdOutlineMessage className='mr-2'/>  
                <button onClick={() => navigate("messages")} className="font-poppins font-medium">
                Messages
                </button>
            </div>
            <div className={menuItemStyle('profile')}>
                <CgProfile className='mr-2'/>  
                <button onClick={() => navigate("profile")} className="font-poppins font-medium">
                Profile
                </button>
            </div>
        </div>
    </div>
  )
}

export default Drawer