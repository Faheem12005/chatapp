import { useSelector } from "react-redux";

function ChannelDescription(){

    const current = useSelector((state) => state.currentChannel.channel);
    console.log(current);
    return(
        <>
        { current && 
            <div className="flex flex-col items-end fixed right-0 h-full border p-6">
                <div className="flex flex-col justify-start">
                    <p className="font-bold text-lg">Details</p>
                    <p className="text-gray-500">#{current.name}</p>
                    <p className="text-gray-500">{current.description}</p>
                </div>

            </div>
        }
        </>
    )
}

export default ChannelDescription