import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function MainPage(){
    const navigate = useNavigate();
    const [password,setPassword] = useState('');
    const [cPassword,setcPassword] = useState('');
    const [username,setUsername] = useState('');
    const [error,setError] = useState(false);
    const [userError,setUserError] = useState(false);

    useEffect(() => {
        if(password===cPassword){
            setError(false);
        } else{
            setError(true);
        }
    },[cPassword,password,username])

    useEffect(() => {
        if (username.length > 5) {
            setUserError(false);
        } else {
            setUserError(true);
        }
    }, [username]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            if(!error && !userError){
                const response = axios.post("/api/users", {
                username: username,
                password: password,
            });
                if(!response.status == 201)
                {
                    console.log('Something went wrong with response');
                } else{
                    console.log('Account created succesfully');
                    navigate('/login');
                }
            }  
        } catch(error){
            console.log('Error occured',error);
        }
    }

    return(
        <>
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <p className="fixed top-10 left-10">
                Sign up
            </p>
            <form className="flex flex-col gap-6 items-center" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="username">Username</label>
                <input onChange={(e) => setUsername(e.target.value)} value={username} className="border border-gray-300 rounded-lg h-16 w-80 p-4 focus:outline-none focus:ring-1 ring-zinc-900" type="text" id="username"/>
                { userError && <p className="fixed mt-24">Enter a Username longer than 5 characters!</p>}
            </div>

            <div className="flex gap-10">
                <div className="flex flex-col gap-2">
                    <label className="font-bold" htmlFor="password">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="6+ characters" className="border border-gray-300 rounded-lg h-16 w-80 p-4 focus:outline-none focus:ring-1 ring-zinc-900" type="password" id="password"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-bold" htmlFor="confirmPassword">Confirm Password</label>
                    <input onChange={(e) => setcPassword(e.target.value)} value={cPassword} placeholder="Retype Password" className="border border-gray-300 rounded-lg h-16 w-80 p-4 focus:outline-none focus:ring-1 ring-zinc-900" type="password" id="confirmPassword"/>
                    { error && <p className="fixed mt-24">Passwords dont match!</p>}
                </div>
            </div>
            <button type="submit" className="w-4/6 mt-10 hover:bg-gray-700 bg-black text-white h-16 rounded-full border">Create Account</button>
            </form>
        </div>
        </>       
    );
}

export default MainPage;