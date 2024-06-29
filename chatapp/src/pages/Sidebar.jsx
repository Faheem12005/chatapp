import { useSelector } from "react-redux";
import UserDropdown from "../components/UserDropdown";

function Sidebar(){
    const user = useSelector((state) => state.user.username);

    return(
        <>
        <div className="flex flex-col max-w-sm">
            <p className="text-xl font-bold">YapFest</p>
            <p>Welcome {user}</p>
            <UserDropdown/>
        </div>
        </>
    )
}

export default Sidebar