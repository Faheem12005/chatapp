import Sidebar from "./Sidebar";
import ChannelDescription from "../components/ChannelDescription";
import Input from "../components/Input";

function Dashboard(){

    return(
        <div className="flex justify-between h-screen">
        <Sidebar/>
        <div className="w-full flex items-end">
        <Input/>
        </div>
        <ChannelDescription/>
        </div>
    );
}

export default Dashboard