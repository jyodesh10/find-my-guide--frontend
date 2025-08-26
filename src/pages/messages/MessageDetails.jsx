import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import baseUrl from '../../constants/constants';
function MessageDetails(props) {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const { id } = useParams();
  const [content, setContent] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getMessagesByid();
    console.log(location.state);
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
      scrollToBottom();

    }
  }

  const sendMessage = async () => {
      const res = await axios.post(baseUrl + `api/chat`,
        {
            "user": location.state.userId,
            "guide": localStorage.getItem('id'),
            "messages": [
                {
                    "content": content,
                    "senderID": localStorage.getItem('id')
                }
            ]
        },
        {
          headers: header
        },
      )

      console.log(res.data)

      if(res.status === 200) {
        getMessagesByid();
      }
  }

  if(loading) {
    return (
      <LoadingSpinner/>
    )
  }

  return (
    <div className='overflow-hidden'>
        {/* message UI */}
        <div className=' h-[55%] justify-between overflow-y-auto mb-25'>
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
            <div ref={messagesEndRef}></div>
        </div>
        {/* send message */}
        <footer className="fixed bg-white border-t border-gray-300 p-4 bottom-0 w-[76%]">
            <div className="flex items-center">
                <input type="text" placeholder="Type a message..."  onChange={(e) => setContent(e.target.value)} className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"/>
                <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2" onClick={() => sendMessage(content)}>Send</button>
            </div>
        </footer>
    </div>
  )
}

export default MessageDetails