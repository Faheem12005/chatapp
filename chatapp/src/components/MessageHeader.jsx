import { useSelector } from "react-redux";

function MessageHeader(){
    const current = useSelector((state) => state.currentChannel.channel);
    return(
        <>
        { current &&
            <div className="w-full px-2 min-h-16 flex flex-col justify-center">
            <p className="font-bold">#{current.name}</p>
            <p className="text-gray-400 text-sm">{current.description}</p>
        </div>}
        </>

    )
}

export default MessageHeader;