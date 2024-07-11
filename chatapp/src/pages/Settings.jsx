import socket from '../socket';
import { useEffect } from 'react';
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


function Settings(){
    const navigate = useNavigate();
    const channels = useSelector((state) => state.channels.channels);
    const { id } = useParams();
    const channel = channels.find((channel) => channel.id === id);
    console.log(channel);

    const handleClick = (channelId) => {
        try{
        socket.emit('deleteChannel',channelId);
        navigate('/dashboard');
        } catch(error){
            console.error('Error deleting channel:', error);
        }
    }
    return(
        <>
        <div>Settings</div>
        <p>{channel.name}</p>
        <p>{channel.description}</p>
        <button onClick={() => handleClick(id)} className="bg-red-600 rounded-xl px-6 py-2 text-white">Delete Channel</button>
        </>
        
    );
}

export default Settings