import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import baseUrl from '../../constants/constants';
function MessageDetails() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

    const { id } = useParams();

  useEffect(() => {
    getMessagesByid();
  }, [])

  const header =
  {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
  }
  const getMessagesByid = async () => {

    try {
      setLoading(true);
      const res = await axios.get(baseUrl + `api/chat/${id}`,
        {
          headers: header
        }
      )
      if(res.status === 200) {
        setMessages(res.data.messages);
      }
      console.log(res);
    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  }

  const sendMessage = async () => {
      const res = await axios.post(baseUrl + `api/chat`,
        {
            "user": "678800991c25da6c9a9dfa7e",
            "guide": "67880642a9120ee340901067",
            "messages": [
                {
                    "content":"Mampakha!!!",
                    "senderID": "67880642a9120ee340901067"
                }
            ]
        },
        {
          headers: header
        },
        
      )
  }

  if(loading) {
    return (
      <LoadingSpinner/>
    )
  }

  return (
    <div className='w-full h-[55%] justify-between overflow-y-auto'>
        {/* message UI */}
        <div>
            {messages.map((message) => {
                return (
                    <div key={message._id}>
                        {
                            message.senderID === localStorage.getItem('id')
                                ? <div className="flex justify-end mb-4 cursor-pointer">
                                    <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                                    <p className='text-[15px]'>{message.content}</p>
                                    </div>
                                </div>
                                : <div className="flex mb-4 cursor-pointer">
                                    <div className="flex max-w-96 bg-gray-100 rounded-lg p-3 gap-3">
                                    <p className="text-gray-700 text-[15px]">{message.content}</p>
                                    </div>
                                </div>
                        }
                    </div>
                )
            })}
        </div>
        {/* send message */}
        <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
            <div className="flex items-center">
                <input type="text" placeholder="Type a message..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"/>
                <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2" onClick={sendMessage}>Send</button>
            </div>
        </footer>
    </div>
  )
}

export default MessageDetails