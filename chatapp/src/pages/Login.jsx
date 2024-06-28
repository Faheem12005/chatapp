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
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">username</label>
            <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="type in username"/>
            <label htmlFor="password">password</label>
            <input id="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="type in username"/>
            <button type="submit">Login</button>
        </form>
    );
}

export default Login