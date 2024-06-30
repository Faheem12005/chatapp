import { useSelector } from "react-redux";
import UserDropdown from "../components/UserDropdown";
import NewChannelButton from "../components/NewChannelButton";
import Channels from "../components/Channels";

function Sidebar(){
    const user = useSelector((state) => state.user.username);


    return(
        <>
        <div className="flex flex-col pl-4 max-w-sm min-w-48 bg-gray-400 h-full absolute">
            <p className="text-xl font-bold">YapFest</p>
            <p>Welcome {user}</p>
            <UserDropdown/>
            <NewChannelButton/>
            <Channels/>
        </div>
        </>
    )
}

export default Sidebar