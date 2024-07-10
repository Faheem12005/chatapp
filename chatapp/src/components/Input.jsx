import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessages } from "../features/user/messagesSlice";
import socket from "../socket"

function Input() {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const user = useSelector((state) => state.user.user);
    const channel = useSelector((state) => state.currentChannel.channel);

    useEffect(() => {
        if (channel) {
            socket.emit('joinRoom', channel.id);
            console.log(`Joined room ${channel.id}`); 

            socket.on('message', handleIncomingMessage);
        }

        return () => {
            if (channel) {
                socket.emit('leaveRoom', channel.id);
                console.log(`Leaving room ${channel.id}`);
            }
            socket.off('message', handleIncomingMessage);
        };
    }, [channel]);

    const handleIncomingMessage = (msg) => {
        dispatch(addMessages(msg));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (message.trim() !== '') {
            // Emit message to the current channel room
            socket.emit('chatMessage', { room: channel.id, message, username: user.username });
            setMessage('');
        }
    };

    return (
        <div className="flex justify-center w-full p-3">
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
    );
}

export default Input;
