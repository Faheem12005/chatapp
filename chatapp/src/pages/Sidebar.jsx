import { useSelector } from "react-redux";
import UserDropdown from "../components/UserDropdown";
import NewChannelButton from "../components/NewChannelButton";
import Channels from "../components/Channels";

function Sidebar(){
    const user = useSelector((state) => state.user.username);


    return(
        <>
        <div className="flex flex-col p-4 min-w-56 bg-fuchsia-950 h-full text-white">
            <p className="text-xl font-bold">YapFest</p>
            <div className="flex items-center gap-2 ">
                <p className="text-gray-300">{user}</p>
                <UserDropdown/>
            </div>
            <NewChannelButton/>
            <Channels/>
        </div>
        </>
    )
}

export default Sidebar