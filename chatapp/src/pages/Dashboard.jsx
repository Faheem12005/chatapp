import Sidebar from "./Sidebar";
import ChannelDescription from "../components/ChannelDescription";
import Input from "../components/Input";
import Messages from "../components/Messages";

function Dashboard(){

    return(
        <div className="flex justify-between h-screen">
        <Sidebar/>
        <div className="w-full flex items-end">
            <Messages/>
            <Input/>
        </div>
        <ChannelDescription/>
        </div>
    );
}

export default Dashboard