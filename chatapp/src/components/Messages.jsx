import { useSelector, useDispatch } from "react-redux";
import { setMessages } from '../features/user/messagesSlice';
import { useEffect, useRef, useState } from "react";
import axios from 'axios';

function Messages() {
    const messages = useSelector((state) => state.messages.messages);
    const channel = useSelector((state) => state.currentChannel.channel);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const containerRef = useRef(null);

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (channel) {
                const response = await axios.get(`/api/channels/${channel.id}`);
                if (!response.status) {
                    console.log('Error occurred while fetching');
                } else {
                    dispatch(setMessages(response.data));
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [channel, dispatch]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <>
            {loading ? 
                <div>Loading...</div>
             : 
                <div ref={containerRef} className="overflow-y-auto w-full p-2">
                    {messages.map((msg, index) => (
                        <p key={index}><span className="font-bold">{msg.username}</span>: {msg.content}</p>
                    ))}
                </div>
             }
        </>
    );
}

export default Messages;
