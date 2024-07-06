import Sidebar from "./Sidebar";
import ChannelDescription from "../components/ChannelDescription";
import Input from "../components/Input";
import Messages from "../components/Messages";
import MessageHeader from "../components/MessageHeader";

function Dashboard(){

    return(
        <div className="flex justify-between h-screen">
        <Sidebar/>
        <div className="w-full flex flex-col h-full justify-between divide-y">
            <MessageHeader/>
            <div className="w-full flex flex-col flex-grow justify-between overflow-hidden">
                <Messages/>
                <Input/>    
            </div>
        </div>
        <ChannelDescription/>
        </div>
    );
}

export default Dashboard