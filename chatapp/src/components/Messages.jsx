import { useSelector,useDispatch } from "react-redux";
import { setMessages } from '../features/user/messagesSlice';
import { useEffect,useState } from "react";
import axios from 'axios';

function Messages(){
    const messages = useSelector((state) => state.messages.messages)
    const channel = useSelector((state) => state.currentChannel.channel)
    const [loading,setLoading] = useState(true);
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async() => {
            if(channel){
                const response = await axios.get(`/api/channels/${channel.id}`)
                if(!response.status){
                    console.log('error occured while fetching');
                }
                dispatch(setMessages(response.data));
                setLoading(false);
                console.log(messages);
            }
        }
        fetchData();
    },[channel]);

    return(
        <div>
            {loading ? 
                <div>Loading...</div>
             :
                <div>{messages.map((msg,index) => (
                    <div>
                        <p>{msg.username}: {msg.content}</p>
                    </div>
                ))}</div>
             }
        </div>
    )
}

export default Messages;