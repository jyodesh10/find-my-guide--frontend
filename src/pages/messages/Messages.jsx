import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dateFormatter } from '../../components/DateFormatter';
import LoadingSpinner from '../../components/LoadingSpinner';
import baseUrl from '../../constants/constants';

const Messages = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMessages();
  }, [])

  const getMessages = async () => {

    try {
      setLoading(true);
      const header =
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
      const res = await axios.get(baseUrl + `api/chat/guide/?guide=${localStorage.getItem('id')}`,
        {
          headers: header
        }
      )
      if(res.status === 200) {
        setMessages(res.data);
      }
      console.log(res);
    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  }

  if(loading) {
    return (
      <LoadingSpinner/>
    )
  }



  return (
    <div>
      {messages.map((message)=> {
        dateFormatter(message.messages[message.messages.length-1].createdAt);
        return (
          <div 
            key={message._id} 
            className='flex px-4 h-[90px] w-[100%] mb-4 bg-gray-50 rounded-xl items-center justify-between hover:bg-gray-100'
            onClick={() => navigate("/dashboard/messages/"+message._id)}
          >
            <div className="flex items-center">
              {/* Profile pic */}
              <img className="h-[60px] w-[60px] rounded-full bg-amber-200" src={message.user.image}/>
              {/* Name */}
              <div className="ml-4">
                <h1 className="font-medium text-[17px]">{message.user.username}</h1>
                <p className="text-[14px]">{message.messages[message.messages.length-1].content}</p>
              </div>
            </div>
            {/* time */}
            {/* const formattedStartTime = index.startTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }); */}
            <p className="text-[14px] text-gray-600 mr-4">{dateFormatter(message.messages[message.messages.length-1].createdAt)}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Messages