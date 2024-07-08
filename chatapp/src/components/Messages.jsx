import { useSelector, useDispatch } from "react-redux";
import { setMessages } from '../features/user/messagesSlice';
import { useEffect, useRef, useState } from "react";
import axios from 'axios';

function Messages() {
    const messages = useSelector((state) => state.messages.messages);
    const channel = useSelector((state) => state.currentChannel.channel);
    const [loading, setLoading] = useState(false);
    const [selected,setSelected] = useState(false);
    const dispatch = useDispatch();
    const containerRef = useRef(null);

    function convertToIST(isoString) {
        const date = new Date(isoString);
        // Options for toLocaleString to format in IST
        const options = { timeZone: 'Asia/Kolkata', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return date.toLocaleString('en-GB', options).split(', ')[1].slice(0,5);
    }
    

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
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
        if(!loading){
            if(!channel){
                setSelected(false);
            } else{
                setSelected(true);
            }
        }
    },[loading])

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <>
        {!selected && 
        <div className="p-6">
            <p className="font-bold text-lg">Select A channel To start Messaging!</p>
        </div>}
            {loading && channel ? 
                <div className="p-2 flex flex-col gap-2">
                    <div className="h-7 w-14 bg-gray-500 rounded-xl"></div>
                    <div className="h-7 w-52 bg-gray-500 rounded-xl"></div>
                    <div className="h-7 w-14 bg-gray-500 rounded-xl"></div>
                    <div className="h-7 w-52 bg-gray-500 rounded-xl"></div>
                    <div className="h-7 w-14 bg-gray-500 rounded-xl"></div>
                    <div className="h-7 w-52 bg-gray-500 rounded-xl"></div>
                    <div className="h-7 w-14 bg-gray-500 rounded-xl"></div>
                    <div className="h-7 w-52 bg-gray-500 rounded-xl"></div>
                    <div className="h-7 w-14 bg-gray-500 rounded-xl"></div>
                    <div className="h-7 w-52 bg-gray-500 rounded-xl"></div>
                    <div className="h-7 w-14 bg-gray-500 rounded-xl"></div>
                    <div className="h-7 w-52 bg-gray-500 rounded-xl"></div>
                    <div className="h-7 w-14 bg-gray-500 rounded-xl"></div>
                    <div className="h-7 w-52 bg-gray-500 rounded-xl"></div>
                </div>
             : selected &&
                <div ref={containerRef} className="overflow-y-scroll p-2">
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <div className="space-x-1" key={index}>
                                <span className="font-semibold">{msg.username}</span>
                                <span className=" text-gray-500 text-xs">{convertToIST(msg.time)}</span>
                            </div>
                            <p className="text-sm">{msg.content}</p>
                        </div>
                    ))}
                </div>
             }
        </>
    );
}

export default Messages;
