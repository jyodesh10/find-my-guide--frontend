import axios from 'axios';
import { useEffect, useState } from 'react';
import { HiOutlineLogout } from "react-icons/hi";
import baseUrl from '../constants/constants';


function Topbar() {
    const [loading, setLoading] = useState(true);
    const [guide, setGuide] = useState(null);
    let id = "";
    let token = "";

    useEffect(() => {
        id = localStorage.getItem('id');
        token = localStorage.getItem('accessToken');
        if (id && token) {
            getUser();
        }
    }, []); // Empty dependency array ensures this runs only once

    const getUser = async () => {
        try {
            const header = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            };
            const res = await axios.get(baseUrl + `api/guides/${id}`, {
                headers: header,
            });
            setGuide(res.data);  
        } catch (error) {
            console.error("Error fetching user:", error); 
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return (
            <div className='flex h-[50px] justify-between items-center w-screen bg-gray-200'>
                Loading....
            </div>
        )
    } else {

        return (
            <nav className='flex h-[50px] justify-between items-center w-screen bg-linear-to-r from-cyan-500 to-blue-500'>
                <h1 className='pl-4 text-xl font-bold text-gray-800 bg-gray-200'>
                    Hello, {guide.firstname} {guide.lastname}
                </h1>
                <div className='flex items-center'>
                    <button className='flex items-center hover:text-gray-600'>
                        <HiOutlineLogout className='mr-2' />
                        <h1 className='mr-6'>
                            Logout
                        </h1>
                    </button>
                    {/* <img src={user.image} alt="" className='container mr-5 h-[35px] w-[35px] rounded-full'/> */}
                </div>
            </nav>
        )
    }

}

export default Topbar