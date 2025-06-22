import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import LoadingSpinner from '../../components/LoadingSpinner';
import baseUrl from '../../constants/constants';
import { showSuccessToast } from '../../utils/CustomToasts';
import { AddTour } from './AddTour';

export const Tours = () => {

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddTour, setAddTour]  = useState(false);
  let id = "";
  let token = "";

  useEffect(() => {
    getTours();
  }, [])

  const getTours = async () => {

    try {
      setLoading(true);
      id = localStorage.getItem('id');
      token = localStorage.getItem('accessToken');
      const header =
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
      const res = await axios.get(baseUrl + `api/guides/${id}/tours`,
        {
          headers: header
        }
      )
      if(res.status === 200) {
        setTours(res.data);
      }
      console.log(res);
    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  }

  const deleteTour = async (tourid) => {
    try {
        setLoading(true);
        const accesstoken = localStorage.getItem('accessToken');
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accesstoken
        }
        const response = await axios.delete(baseUrl + `api/tours/${tourid}`, {headers: headers} );
        if (response.status === 200) {
          showSuccessToast("Tour deleted successfully!");
          await getTours();
        }
    } catch (error) {
    } finally {
        setLoading(false);
    }
}

  if(loading) {
    return (
      <LoadingSpinner/>
    )
  }

  const columns = [
      {
          name: 'Image',
          // selector: row => row.image,
          cell: row => (
              row.image[0] 
              ? <img src={row.image[0]} alt={row.title || "Blog image"} className='h-25 w-35 m-2 bg-gray-200 rounded-2xl' />
              : <div className='flex h-25 w-35 m-2 bg-gray-200 rounded-2xl items-center justify-center text-center'>No Image</div>
          ) 
      },
      {
          name: 'Title',
          selector: row => row.title,
      },
      {
          name: 'Actions',
          cell: row => <div className='flex items-center justify-center'>
              <button className='py-2 w-[80px] bg-blue-600 rounded-md text-white shadow-lg shadow-blue-500/50 hover:bg-blue-500 hover:shadow-blue-400/50'>
                  Edit
              </button>
              <button 
                  className='ml-4 py-2 w-[80px] bg-red-600 rounded-md text-white shadow-lg shadow-red-500/50 hover:bg-red-500 hover:shadow-red-400/50'
                  onClick={() => deleteTour(row._id)}
              >
                  Delete
              </button>
          </div>
      },
  ];

  if(isAddTour) {
    return (<AddTour/>)
  }

  return (
    <div>
      <div className='flex items-end justify-end'>
        <button 
          className='pr-6 pl-6 pt-1 pb-1 min-w-[90px] mr-[10px] rounded-md bg-blue-600 text-white hover:bg-blue-500'
          onClick={() => setAddTour(true)}
        >
          Add a Tour
        </button>
      </div>
      <DataTable columns={columns} data={tours} striped={true}  />
    </div>
  )
}


export default Tours;