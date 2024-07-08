import { useSelector } from "react-redux";

function ChannelDescription(){

    const current = useSelector((state) => state.currentChannel.channel);
    return(
        <>
        { current ? 
            <div className="flex flex-col h-full min-w-52 divide-y border-l">
                <div className="flex flex-row-reverse justify-between items-center w-full px-4 h-16">
                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-bold">Details</p>
                        <p className="text-gray-500 text-xs">#{current.name}</p>   
                    </div>

                </div>
                <div className="w-full p-4 flex justify-between">
                    <div className=" bg-gray-100 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 rounded-full">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>   
                    </div>
                    <div className=" bg-gray-100 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <div className=" bg-gray-100 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>   
                    </div>

                </div>
                <div className="w-full p-4">
                    <p className="font-bold text-lg">About</p>
                    <p>{current.description}</p>
                </div>
            </div> : 
            <div className="flex flex-col h-full min-w-52 divide-y border-l">
                <div className="flex flex-row-reverse justify-between items-center w-full px-4 h-16">
                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-bold">Details</p>
                        <p className="text-gray-500 text-xs">#Channel name</p>   
                    </div>
                </div>
                <div className="p-4">
                    <p>Pick a Channel To get Started!</p>
                </div>
            </div>
        }
        </>
    )
}

export default ChannelDescription