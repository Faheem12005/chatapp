import { useState, useEffect } from "react";
import axios from "axios";

function NewChannelButton() {
    const [showPopup, setShowPopup] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // Function to handle "Escape" key press
    const handleEscapeKey = (event) => {
        if (event.keyCode === 27) { // Check if key pressed is "Escape"
            setShowPopup(false); // Close the popup if it's open
        }
    };

    useEffect(() => {
        // Add event listener when component mounts
        document.addEventListener("keydown", handleEscapeKey);

        // Clean up event listener when component unmounts
        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, []); // Empty dependency array ensures effect runs only on mount and unmount

    const handleNewChannel = () => {
        setShowPopup(true);
    }

    const handleClosePopup = () => {
        setShowPopup(false);
        // Optionally, reset form fields when closing the popup
        setName('');
        setDescription('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post('/api/channels',{
            name: name,
            description: description,
            });
            if (!response.status){
                console.log('Error with sending post request');
            }
            console.log('submitted');
            handleClosePopup();
        } catch(error){
            console.log('error occured',error);
        }

    }

    return (
        <>
            <button 
                onClick={handleNewChannel} 
                className="border inline-block w-32 mt-5 px-2 py-2 rounded-sm hover:bg-gray-500 transition-colors duration-75"
            >
                + New channel
            </button>
            
            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
                    <div className="relative bg-white px-4 py-3 rounded-lg shadow-lg w-2/4">
                        <form className="flex flex-col" id="create" onSubmit={handleSubmit}>
                            <label htmlFor="name">Channel Name:</label>
                            <input 
                                className="border mb-4 p-2 h-7"
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label htmlFor="description">Channel Description:</label>
                            <input 
                                className="border mb-4 p-2 h-7"
                                type="text"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <div className="flex justify-end">
                            </div>
                        </form>
                        <div className="flex justify-between items-center">
                            <button form="create" type="submit" className="bg-zinc-200 rounded-sm px-5 py-1 hover:bg-gray-400 transition duration-75">Create</button>
                            <p className="text-gray-400">Press Esc to Close</p>
                        </div>
                       
                    </div>
                </div>
            )}
        </>
    );
}

export default NewChannelButton;
