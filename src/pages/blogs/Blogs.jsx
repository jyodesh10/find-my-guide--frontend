import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import baseUrl from '../../constants/constants';
import { showSuccessToast } from '../../utils/CustomToasts';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [limit, setLimit] = useState(10); 
    const [totalRows, setTotalRows] = useState(0);
    const navigate = useNavigate();
    const getBlogs = async page => {

        try {
            setLoading(true);
            const header =
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + token
            }
            const res = await axios.get(baseUrl + `api/blog/?limit=${limit}&page=${page}`,
                {
                    headers: header
                }
            )
            if (res.status === 200) {
                setBlogs(res.data.data);
                setTotalRows(res.data.total_count);
            }
            console.log(res);
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }

    const handlePageChange = page => {
        getBlogs(page);
    };

    const handlePerRowsChange  = async (newlimit,page) => {

        try {
            setLoading(true);
            const header =
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + token
            }
            const res = await axios.get(baseUrl + `api/blog/?limit=${newlimit}&page=${page}`,
                {
                    headers: header
                }
            )
            if (res.status === 200) {
                setBlogs(res.data.data);
                setLimit(newlimit);
            }
            console.log(res);
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }

    const deleteBlog = async (id) => {
        try {
            setLoading(true);
            const response = await axios.delete(baseUrl + `api/blog/${id}`,);
            if (response.status === 200) {
                showSuccessToast("Blog deleted successfully!");
                await getBlogs();
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    const rowSelectCritera = useMemo(() => {
        return (row) => row.device_id === "itnx";
    }, []);

    useEffect(() => {
        // id = localStorage.getItem('id');
        // token = localStorage.getItem('accessToken');
        getBlogs(1);
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
                <button 
                    className='ml-4 py-2 w-[80px] bg-red-600 rounded-md text-white shadow-lg shadow-red-500/50 hover:bg-red-500 hover:shadow-red-400/50'
                    onClick={() => deleteBlog(row._id)}
                >
                    Delete
                </button>
            </div>
        },
    ];

    return (
        <div>
            <div className='flex items-end justify-end'>
            <button 
                className='pr-6 pl-6 pt-1 pb-1 min-w-[90px] mr-[10px] rounded-md bg-blue-600 text-white hover:bg-blue-500'
                onClick={() => navigate("addblog")}
            >
                Create a Blog
            </button>
            </div>
            <DataTable 
                columns={columns} 
                data={blogs} 
                striped={true} 
                // pagination 
                // paginationServer 
                // paginationPerPage={10}
                // progressPending={loading} 
                // paginationTotalRows={totalRows}
                // selectableRowSelected={rowSelectCritera}
                // onChangeRowsPerPage={(newlimit, page) => {handlePerRowsChange(newlimit,page)}} 
                // onChangePage={(page, rows) => {getBlogs(page)}}
            />
            <div className='flex items-center justify-center mt-10 mb-10'>
                <button type="button" className='mr-3 p-2 bg-blue-500 rounded-md text-white hover:bg-blue-700'>
                    Previous
                </button>
                {[...Array(Math.ceil(totalRows / limit))].map((_, i) => (
                    <button key={i} type="button" className='mr-3 p-2'>{i + 1}</button>
                ))}
                <button 
                    type="button" 
                    className='ml-3 p-2 bg-blue-500 rounded-md text-white hover:bg-blue-700'
                    onClick={() => handlePageChange(2)}
                >
                    Next
                </button>
            </div>
        </div>
    )
}




export default Blogs