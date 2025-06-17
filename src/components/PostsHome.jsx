import axios from 'axios';
import React, { useEffect, useState } from 'react';

function PostsHome() {

  const [posts, setposts] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getPosts()
  }, []);

  const getPosts = async () => {
    setloading(true);
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      const data = res.data;
      setposts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }

  if(loading) {
    return <>
      <div>Loading.....</div>
    </>
  }

  return (
    <>
      <div className='flex justify-center h-screen pl-40 pr-40'>
        <div className='col-auto'>
          <h5 className='font-bold text-2xl mt-5 mb-3'>POSTS</h5>
          <ul>
            {
              posts.map((e)=> { return <li key={e.id}>
                <div className='flex items-center min-h-30 space-x-4 bg-sky-100 mb-3 p-3 rounded-lg hover:bg-sky-200'>
                  <div class="flex-shrink-0 border-3 border-blue-200 rounded-full p-2 pr-4 pl-4">
                    <h3 className='flex justify-center'>{e.id}</h3>
                  </div>
                  <div>
                    <h2 className='font-bold'>{e.title}</h2>
                    <p>{e.body}</p>
                  </div>
                </div>
              </li> })
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default PostsHome