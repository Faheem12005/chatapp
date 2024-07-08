import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('/api/login',{
                username: username,
                password: password
            });
            if (!response.status){
                console.log('something went wrong');
            }
            
            console.log('user logged in succesfully');
            navigate('/dashboard');
        } catch(error){
            console.log('Error during fetch',error);
        }
    }

    return(
        <>
        <div className="fixed top-10 left-10">
            <p className="text-3xl font-bold">Login To YapFest!</p>
            <p></p>
        </div>
        <form className="h-screen w-screen flex flex-col gap-4 justify-center items-center" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="username">Username</label>
                <input className="h-16 w-80 border rounded-xl p-4 focus:outline-none focus:ring-1 ring-black" id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="type in username"/>
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="password">password</label>
                <input className="h-16 w-80 border rounded-xl p-4 focus:outline-none focus:ring-1 ring-black" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="type in username"/>
            </div>
            <button className="w-64 h-16 bg-black text-white rounded-3xl mt-8 hover:bg-gray-600 transition duration-150" type="submit">Login</button>
        </form>
        </>
    );
}

export default Login