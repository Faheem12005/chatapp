import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function Input(){
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const user = useSelector((state) => state.user.username);
    const channel = useSelector((state) => state.currentChannel.channel);

    useEffect(() => {
        if(channel){
            socket.emit('joinRoom',channel.id);
            console.log(`joined room ${channel.id}`);

            socket.on('message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
          });
        }
        return () => {
            if(channel){
                socket.emit('leaveRoom',channel.id);
                console.log(`leaving room ${channel.id}`);
            }
        }
    },[channel])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(message.trim() !== ''){
            socket.emit('chatMessage', { room: channel.id, message, username: user});
            setMessage('');
        }
    };

    return(
        <div className="fixed bottom-2 flex justify-center w-full">
            {messages.map((msg,index) => (
                <div key={index}>{msg.username}: {msg.content}</div>
            ))}
            <form className="w-full max-w-screen-lg flex justify-center items-center gap-5" onSubmit={handleSubmit}>
                <input
                    className="border border-gray-500 rounded-xl p-3 w-full"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter message..."
                />
                <button className="border border-gray-500 p-3 rounded-xl px-6 hover:bg-gray-300 transition duration-75" type="submit">Send</button>
            </form>
        </div>
    )
}


export default Input;