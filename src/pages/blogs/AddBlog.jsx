import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImgInput from '../../components/ImgInput';
import LoadingSpinner from '../../components/LoadingSpinner';
import TileInputCom from '../../components/TitleInputCom';
import baseUrl from '../../constants/constants';
import { showErrorToast, showSuccessToast } from '../../utils/CustomToasts';
function AddBlog() {

    const [title, settitle] = useState("");
    const [content, setcontent] = useState("");
    const [img, setimg] = useState("");
    const [author, setauthor] = useState("");
    const [loading, setloading] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const id = localStorage.getItem("id");
        const token = localStorage.getItem("accessToken");
        setAccessToken(token);
        setauthor(id);
    }, [])
    
    const postBlog = async () => {
        try {
            setloading(true);
            const formData = new FormData();
            formData.append('title', title);
            formData.append('author', author);
            formData.append('content', content);
            if (img) {
                formData.append('image', img);
            }

            const config = {
                headeres: {
                    'Accept': 'application/json',
                }
            }

            const response  = await axios.post(baseUrl + "api/blog/",
                formData,
                config
            );
            
            if(response.status === 201 || response.status === 200) {
                setloading(false);
                showSuccessToast("Blog posted successfully!");
                settitle("");
                setcontent("");
                setimg("");
                navigate(-1);
            }
            console.log(response.data);

        } catch (error) {
            console.error("Error posting blog:", error);
            const errorMessage = error.response?.data?.message || "Failed to post blog. Please try again.";
            showErrorToast(errorMessage);
            if (error.response) {
                console.error("Data:", error.response.data);
                console.error("Status:", error.response.status);
            }

        } finally {
            setloading(false);
        }


    }

    if (loading) {
        return (
            <>
                <LoadingSpinner /> 
            </>
        )
    }

    return (
        <>
            <div className='flex items-center justify-center'>
                <div className='container m-8'>
                    <div className='container p-8 bg-gray-200  rounded-t-lg'>
                        <h5 className='font-medium text-3xl text-gray-600'>Add new blog</h5>
                    </div>
                    <div className='container p-8 pr-[10%] pl-[10%] bg-gray-100 rounded-b-lg'>
                        <TileInputCom
                            label={"Title"}
                            value={title}
                            onChange={(e) => settitle(e.target.value)}
                        />
                        <TileInputCom
                            label={"Author"}
                            value={author}
                            disabled={true}
                            onChange={(e) => setauthor(e.target.value)}
                        />
                        <TileInputCom
                            label={"Content"}
                            value={content}
                            onChange={(e) => setcontent(e.target.value)}
                        />
                        {img !== "" 
                            ? <div className="h-[120px] w-[120px] p-1 flex items-center border-dotted border-2 border-gray-400 rounded-lg overflow-hidden">
                                <img 
                                    src={URL.createObjectURL(img)} 
                                    alt={img.name} 
                                    onClick={() => {fileInputRef.current.click()}}
                                    className="object-contain"
                                />
                            </div>
                            : <ImgInput onClick={() => {fileInputRef.current.click()}}/>
                        }
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={(e) => {
                                setimg(e.target.files[0])
                            }}
                            className="hidden"
                        />
                        <div className='flex justify-end items-end'>
                            <button className='w-[25%] min-w-[80px] h-10 bg-blue-600 rounded-md text-white shadow-lg shadow-blue-500/50 hover:bg-blue-500 hover:shadow-blue-400/50'
                                onClick={postBlog}
                            >
                                Post
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AddBlog;