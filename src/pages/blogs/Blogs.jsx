import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import LoadingSpinner from '../../components/LoadingSpinner';
import TileInputCom from '../../components/TitleInputCom';
import baseUrl from '../../constants/constants';


const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCreateBlog, setCreateBlog] = useState(false);

    const getBlogs = async () => {

        try {
            setLoading(true);
            const header =
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + token
            }
            const res = await axios.get(baseUrl + `api/blog/?limit=8&page=1`,
                {
                    headers: header
                }
            )
            if (res.status === 200) {
                setBlogs(res.data.data);
            }
            console.log(res);
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // id = localStorage.getItem('id');
        // token = localStorage.getItem('accessToken');
        getBlogs();
    }, [])

    if (loading) {
        return (
            <LoadingSpinner />
        )
    }

    const columns = [
        {
            name: 'Image',
            // selector: row => row.image,
            cell: row => (
                row.image 
                ? <img src={row.image} alt={row.title || "Blog image"} className='h-25 w-35 m-2 bg-gray-200 rounded-2xl' />
                : <div className='flex h-25 w-35 m-2 bg-gray-200 rounded-2xl items-center justify-center text-center'>No Image</div>
            ) 
        },
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Date',
            selector: row => row.createdAt,
        },
        {
            name: 'Author',
            selector: row => row.author,
        },
        {
            name: 'Actions',
            cell: row => <div className='flex items-center justify-center'>
                <button className='py-2 w-[80px] bg-blue-600 rounded-md text-white shadow-lg shadow-blue-500/50 hover:bg-blue-500 hover:shadow-blue-400/50'>
                    Edit
                </button>
                <button className='ml-4 py-2 w-[80px] bg-red-600 rounded-md text-white shadow-lg shadow-red-500/50 hover:bg-red-500 hover:shadow-red-400/50'>
                    Delete
                </button>
            </div>
        },
    ];


    if(isCreateBlog) {
        return (
            <AddEditBlog />
        )
    }

    return (
        <div>
            <div className='flex items-end justify-end'>
            <button 
                className='pr-6 pl-6 pt-1 pb-1 min-w-[90px] mr-[10px] rounded-md bg-blue-600 text-white hover:bg-blue-500'
                onClick={() => setCreateBlog(true)}
            >
                Create a Blog
            </button>
            </div>
            <DataTable columns={columns} data={blogs} striped={true}  />
        </div>
    )
}


function AddEditBlog() {

    const [title, settitle] = useState("");
    const [content, setcontent] = useState("");
    const [img, setimg] = useState("");
    const [author, setauthor] = useState("");
    const [loading, setloading] = useState(false);
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const id = localStorage.getItem("id");
        const token = localStorage.getItem("accessToken");
        setAccessToken(token);
        setauthor(id);
    })

    const postBlog = async () => {
        try {
            setloading(true);
            const body =
            {
                title: title,
                author: author,
                content: content,
                image: "https://images.squarespace-cdn.com/content/v1/5a3bb03b4c326d76de73ddaa/1622206290259-PGHH6HWXESXLIHYC7P69/The_Common_Wanderer_-2.jpg?format=2500w"
            }

            const header =
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }

            const data = await axios.post(baseUrl + "api/blog/",
                body,
                header

            );


        } catch (error) {
            console.log(error);

        } finally {
            setloading(false);
        }


    }

    if (loading) {
        return (
            <>
                <div>Loading.....</div>
            </>
        )
    }

    return (
        <>
            {/* <div>{localStorage.getItem("accessToken")}</div>
        <div>{localStorage.getItem("id")}</div> */}
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
                        <ImgInput />
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

function ImgInput() {
    return (
        <div className="relative h-11 w-full min-w-[200px] mb-35">
            <h1>Image</h1>
            <div className='container flex items-center justify-center h-30 w-30 rounded-md bg-gray-200 border-dotted border-3 border-gray-500'>
                <h5 className='font-medium text-4xl text-gray-500'>+</h5>
            </div>

        </div>
    )
}


export default Blogs